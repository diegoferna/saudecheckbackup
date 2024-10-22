import { FastifyInstance } from "fastify";
import { z } from "zod";
import { randomUUID } from "node:crypto";
import { knex } from "../databaseSQLITE";


export async function checklistsRoutes(app: FastifyInstance) {
    app.post("/", async (request, reply) => {
      const createChecklistBodySchema = z.object({
        data: z.string(),
        unidade_id: z.string().uuid(),
        gerente_id: z.string().uuid(),
        justificativa: z.string(),
        itemsDiario: z.array(
          z.object({
            id: z.string().uuid(),
            nome: z.string(),
            disponivel: z.boolean(),
            tipo: z.string(),
            motivo_id: z.string(),
          })
        ),
        itemsOcasional: z.array(
          z.object({
            id: z.string().uuid(),
            nome: z.string(),
            disponivel: z.boolean(),
            tipo: z.string(),
            justificativa: z.string()
          })
        )
      });

      try {
        const {
          data,
          unidade_id,
          gerente_id,
          itemsDiario,
          itemsOcasional,
          justificativa,
        } = createChecklistBodySchema.parse(request.body);
        if (itemsDiario.length == 0 && itemsOcasional.length > 0) {
          const currentDate = new Date().toISOString().split("T")[0];
          
          const existingChecklist = await knex('table_checklist')
          .whereRaw("DATE(created_at) = ?", currentDate)
          .andWhere({
              unidade_id,
          })
          .orderBy("created_at", "desc")
          .first();
          // Verificar se já existe um checklist ocasional
          const existChecklistOcasional = await knex("table_checklist_ocasional") // PARA ISSO EU PRECISO OBRIGAR QUE SEMPRE QUE SEJA CRIADO UM CHECKLIST SEJA CRIADO UM OCASIONAL TAMBÉM
          .whereRaw("DATE(created_at) = ?", currentDate)
          .andWhere({
            checklist_id: existingChecklist.id,
          })
          .first();

          const existChecklistOcasionalItem = await knex("table_checklistOcasional_item") // PARA ISSO EU PRECISO OBRIGAR QUE SEMPRE QUE SEJA CRIADO UM CHECKLIST SEJA CRIADO UM OCASIONAL TAMBÉM
          .whereRaw("DATE(created_at) = ?", currentDate)
          .andWhere({
            checklistOcasional_id: existChecklistOcasional.id,
          })
          .first();
          // Atualizar o checklist ocasional existente
         if(existChecklistOcasionalItem){
          for (const item of itemsOcasional) {
            await knex("table_checklistOcasional_item")
              .where({
                checklistOcasional_id: existChecklistOcasional.id,
                item_checklistOcasional_id: item.id
              })
              .update({
                data,
                justificativa: item.justificativa,
                disponivel: item.disponivel,
              });
            }

            return reply.status(200).send("Checklist Ocasional atualizado com sucesso.");    
          }else {
            for (const item of itemsOcasional) {
              const itemOcasional_id = randomUUID();

              const itemChecklistOcasional = {
                id: itemOcasional_id, 
                disponivel: item.disponivel,
                data: data,
                item_checklistOcasional_id: item.id,
                checklistOcasional_id: existChecklistOcasional.id,
                justificativa: item.justificativa
              }

              await knex("table_checklistOcasional_item").insert(itemChecklistOcasional)
                
            }
          }
          return reply.status(200).send("Checklist Ocasional criado com sucesso.");    
        } else {
          const checklistId = randomUUID();

          const checklist = {
            id: checklistId,
            data,
            unidade_id,
            responsavel_id: gerente_id,
          };

          await knex("table_checklist").insert(checklist);

          const checklistDiario_id = randomUUID();

          const checklistDiario = {
            id: checklistDiario_id,
            nome: "diario",
            checklist_id: checklistId,
            justificativa: justificativa ? justificativa : ""
          };
          // CADASTRO DO CHECKLIST DIARIO
          await knex("table_checklist_diario").insert(checklistDiario);
          // Inserir os itens do checklist diário
          for (const item of itemsDiario) {

            const checklistDiarioItemId = randomUUID();
            

            const itemChecklistDiario = {
              id: checklistDiarioItemId,
              data,
              disponivel: item.disponivel,
              checklistDiario_id: checklistDiario_id,
              item_checklist_id:  item.id,
              motivo_id: item.disponivel ? "" : item.motivo_id,
            };

            await knex("table_checklistDiario_item").insert(itemChecklistDiario);
          }

          const checklistOcasional_id = randomUUID();

          const checklistOcasional = {
            id: checklistOcasional_id,
            nome: "ocasional",
            checklist_id: checklistId,
          };
          // CADASTRO DO CHECKLIST DIARIO
          await knex("table_checklist_ocasional").insert(checklistOcasional);

          if(itemsOcasional.length > 0){
            for (const item of itemsOcasional) {
              const checklistOcasionalItemId = randomUUID();
  
              const itemChecklistOcasional = {
                id: checklistOcasionalItemId,
                data,
                item_checklistOcasional_id: item.id,
                checklistOcasional_id: checklistOcasional_id,
                disponivel: item.disponivel,
                justificativa: item.justificativa || ""
                
              };
  
              await knex("table_checklistOcasional_item").insert(itemChecklistOcasional);
            }
          }
        }
         
        return reply.status(201).send("Checklist criado com sucesso.");
        
      } catch (error) {
        console.error(error);
        return reply.status(500).send("Erro interno no servidor.");
      }
    });

    app.get('/checklist-diario', async (request, reply) => {
      const getChecklists = z.object({
        unidadeId: z.string().uuid(),
      });
    
      const { unidadeId } = getChecklists.parse(request.params);
    
      const currentDate = new Date().toISOString().split("T")[0];
      try {
        const existChecklist = await knex('table_checklist')
          .whereRaw("DATE(created_at) = ?", currentDate)
          .andWhere({
            unidadeId,
          });
    
        if (existChecklist.length > 2) {
          return reply.status(200).send(true);
        } else {
          return reply.status(200).send(false);
        }
      } catch (error) {
        console.error(error);
        return reply.status(500).send("Erro interno no servidor.");
      }
    });

    app.get("/tem-checklist/:id", async (request, reply) => {
      const getChecklists = z.object({
        id: z.string().uuid(),
      });
      
      const { id } = getChecklists.parse(request.params);
    
      const currentDate = new Date().toISOString().split("T")[0];
      try {
        const existChecklist = await knex('table_checklist')
          .whereRaw("DATE(created_at) = ?", currentDate)
          .andWhere({
           unidade_id: id,
          });

        if (existChecklist.length == 0) {
          return reply.status(200).send(false);
        } else {
          return reply.status(200).send(true);
        }
      } catch (error) {
        console.error(error);
        return reply.status(500).send("Erro interno no servidor.");
      }
    });

    app.get("/:id", async (request, reply) => {
      const getChecklists = z.object({
        id: z.string().uuid(),
      });
      
      const { id } = getChecklists.parse(request.params);
    
      const currentDate = new Date().toISOString().split("T")[0];
      try {
        const existChecklist = await knex('table_checklist')
          .whereRaw("DATE(created_at) = ?", currentDate)
          .andWhere({
           unidade_id: id,
          });
        if (existChecklist.length >= 2) {
          return reply.status(200).send(true);
        } else {
          return reply.status(200).send(false);
        }
      } catch (error) {
        console.error(error);
        return reply.status(500).send("Erro interno no servidor.");
      }
    });

    app.get('/checklists-detalhados', async (request, reply) => {
      try {
          const currentDate = new Date().toISOString().split("T")[0];
  
          const checklistsDetalhados = await knex
              .select(
                  'table_checklist.id as checklist_id',
                  'table_checklist.data',
                  'table_unidade.nome as nome_unidade',
                  'table_usuario.nome as nome_gerente'
              )
              .from('table_checklist')
              .join('table_unidade', 'table_checklist.unidade_id', 'table_unidade.id')
              .join('table_usuario', 'table_checklist.responsavel_id', 'table_usuario.id')
              .where(knex.raw("DATE(table_checklist.data) = ?", currentDate));

          const result = [];
          for (const checklist of checklistsDetalhados) {
              const checklistDiario = await knex("table_checklist_diario as tcd")
                  .where("tcd.checklist_id", checklist.checklist_id)
                  .first();
  
              if (checklistDiario) {
                  const itensDiario = await knex("table_checklistDiario_item as tcdi")
                      .select(
                          "tic.nome",
                          "tcdi.disponivel",
                          "tm.nome as motivo_nome"
                      )
                      .leftJoin("table_item_checklist_motivo as tim", "tcdi.motivo_id", "tim.id")
                      .leftJoin("table_motivo as tm", "tim.motivo_id", "tm.id")
                      .leftJoin("table_item_checklist as tic", "tim.item_checklist_id", "=", "tic.id")
                      .where("tcdi.checklistDiario_id", checklistDiario.id);
                  const totalItensDiario = itensDiario.length;
                  const itensMarcadosDiario = itensDiario.filter((item) => item.disponivel);
  
                  const percentual = (itensMarcadosDiario.length / totalItensDiario) * 100 || 0;
  
                  result.push({
                      checklist_id: checklist.checklist_id,
                      data: checklist.data,
                      nome_unidade: checklist.nome_unidade,
                      nome_gerente: checklist.nome_gerente,
                      itens_diario: itensDiario.map(item => ({
                          nome: item.nome,
                          disponivel: item.disponivel,
                          motivo_nome: item.motivo_nome || null,
                      })),
                      percentual_itens_marcados: parseFloat(percentual.toFixed(2)),
                  });
              } else {
                  result.push({
                      checklist_id: checklist.checklist_id,
                      data: checklist.data,
                      nome_unidade: checklist.nome_unidade,
                      nome_gerente: checklist.nome_gerente,
                      itens_diario: [],
                      percentual_itens_marcados: 0,
                  });
              }
          }
  
          result.sort((a, b) => a.percentual_itens_marcados - b.percentual_itens_marcados);
  
          return reply.status(200).send(result);
      } catch (error) {
          console.error(error);
          return reply.status(500).send("Erro ao processar a requisição.");
      }
    });

    async function buscarNomeItemNaTabela(itemId:any) {
      try {
          const item = await knex("table_item_checklist").select("nome").where("id", itemId).first();

          return  item.nome ;
      } catch (error) {
          console.error("Erro ao buscar nome do item na tabela:", error);
          return null;
      }
  }
  


    app.get('/checklists-com-conflitos', async (request, reply) => {
      const currentDate = new Date().toISOString().split("T")[0];

      try {
          const checklistsComConflitos = await knex
              .select(
                  'table_checklist.id as checklist_id',
                  'table_checklist.data',
                  'table_unidade.id as unidade_id',
                  'table_unidade.nome as nome_unidade',
                  'table_usuario.nome as nome_gerente',
                  'table_checklist_diario.justificativa as justificativa'
              )
              .from('table_checklist')
              .join('table_unidade', 'table_checklist.unidade_id', 'table_unidade.id')
              .join('table_usuario', 'table_checklist.responsavel_id', 'table_usuario.id')
              .join('table_checklist_diario', 'table_checklist.id', 'table_checklist_diario.checklist_id')
              .where(knex.raw("DATE(table_checklist.data) = ?", currentDate));

          const result = [];

          for (const checklist of checklistsComConflitos) {
              const checklistDiario = await knex("table_checklist_diario as tcd")
                  .where("tcd.checklist_id", checklist.checklist_id)
                  .first();

              const checklistOcasional = await knex("table_checklist_ocasional as tco")
                  .where("tco.checklist_id", checklist.checklist_id)
                  .first();

              let diarioConflitos:any = [];
              let ocasionalConflitos:any = [];

              if (checklistDiario) {
                  const itensDiario = await knex("table_checklistDiario_item as tcdi")
                      .select(
                          "tic.nome as nome",
                          "tcdi.item_checklist_id as id",
                          "tcdi.disponivel",
                          "tm.nome as motivo_nome"
                      )
                      .leftJoin("table_item_checklist_motivo as tim", "tcdi.motivo_id", "tim.id")
                      .leftJoin("table_motivo as tm", "tim.motivo_id", "tm.id")
                      .leftJoin("table_item_checklist as tic", "tim.item_checklist_id", "=", "tic.id")
                      .where("tcdi.checklistDiario_id", checklistDiario.id);

                  const itensResolvidos = await Promise.all(itensDiario.map(async (item) => ({
                      nome: item.nome || (await buscarNomeItemNaTabela(item.id)),
                      disponivel: item.disponivel,
                      motivo_nome: item.motivo_nome || null,
                  })));

                  // Verifique se há pelo menos um item com disponibilidade falsa ou zero
                  if (itensResolvidos.some((item) => !item.disponivel)) {
                      diarioConflitos = itensResolvidos;
                  }
              }
              if (checklistOcasional) {
                  const itensOcasional = await knex("table_checklistOcasional_item as tcoi")
                      .select(
                          "tico.nome as nome",
                          "tcoi.disponivel",
                          "tcoi.justificativa"
                      )
                      .leftJoin("table_item_checklistOcasional as tico", "tcoi.item_checklistOcasional_id", "=", "tico.id")
                      .leftJoin("table_checklist_ocasional as tco", "tcoi.checklistOcasional_id", "=", "tco.id")
                      .where("tcoi.checklistOcasional_id", checklistOcasional.id);

                  // Verifique se há pelo menos um item com disponibilidade 1 ou positiva
                  if (itensOcasional.some((item) => item.disponivel > 0)) {
                      ocasionalConflitos = itensOcasional.map((item) => ({
                          nome: item.nome,
                          disponivel: item.disponivel,
                          justificativa: item.justificativa || null,
                      }));
                  }
              }

              // Se há pelo menos um conflito em checklist diário ou ocasional, agrupe os resultados
              if (diarioConflitos.length > 0 || ocasionalConflitos.length > 0) {
                  result.push({
                      checklist_id: checklist.checklist_id,
                      data: checklist.data,
                      unidade_id: checklist.unidade_id,
                      nome_unidade: checklist.nome_unidade,
                      nome_gerente: checklist.nome_gerente,
                      justificativa: checklist.justificativa,
                      tipo_checklist_diario: 'diario',
                      tipo_checklist_ocasional: 'ocasional',
                      conflitos_diario: diarioConflitos,
                      conflitos_ocasional: ocasionalConflitos
                  });
              }
          }

          return reply.status(200).send(result);
      } catch (error) {
          console.error(error);
          return reply.status(500).send("Erro ao processar a requisição.");
      }
    });



    app.get('/checklists-detalhados/:id', async (request, reply) => {
      const getChecklists = z.object({
        id: z.string().uuid(),
      });
    
      const { id } = getChecklists.parse(request.params);
    
      try {
          const checklistDetalhado = await knex
              .select(
                  'table_checklist.id as checklist_id',
                  'table_checklist.data',
                  'table_unidade.nome as nome_unidade',
                  'table_usuario.nome as nome_gerente'
              )
              .from('table_checklist')
              .join('table_unidade', 'table_checklist.unidade_id', 'table_unidade.id')
              .join('table_usuario', 'table_checklist.responsavel_id', 'table_usuario.id')
              .where('table_checklist.id', id)
              .first();
    
          if (!checklistDetalhado) {
              return reply.status(404).send({ message: 'Checklist não encontrado.' });
          }
    
          const checklistDiario = await knex('table_checklist_diario')
              .where('checklist_id', checklistDetalhado.checklist_id)
              .first();
    
          if (checklistDiario) {
              const itensDiario = await knex('table_checklistDiario_item')
                  .select(
                      'table_item_checklist.nome',
                      'table_checklistDiario_item.disponivel',
                      'table_motivo.nome as motivo'
                  )
                  .join(
                      'table_item_checklist',
                      'table_checklistDiario_item.item_checklist_id',
                      '=',
                      'table_item_checklist.id'
                  )
                  .leftJoin(
                      'table_item_checklist_motivo',
                      'table_item_checklist.id',
                      '=',
                      'table_item_checklist_motivo.item_checklist_id'
                  )
                  .leftJoin('table_motivo', 'table_item_checklist_motivo.motivo_id', '=', 'table_motivo.id')
                  .where('table_checklistDiario_item.checklistDiario_id', checklistDiario.id);
              const totalItensDiario = itensDiario.length;
              const itensMarcadosDiario = itensDiario.filter((item) => item.disponivel);
    
              const percentual = (itensMarcadosDiario.length / totalItensDiario) * 100 || 0;
    
              checklistDetalhado.itens_diario = itensDiario;
              checklistDetalhado.percentual_itens_marcados = percentual;
          } else {
              checklistDetalhado.itens_diario = [];
              checklistDetalhado.percentual_itens_marcados = 0;
          }
    
          return reply.status(200).send(checklistDetalhado);
      } catch (error) {
          console.error(error);
          return reply.status(500).send('Erro ao processar a requisição.');
      }
    });

    app.get('/checklistDiario/:id', async (request, reply) => {

      const getChecklists = z.object({
        id: z.string().uuid(),
      });
    
      const { id } = getChecklists.parse(request.params);
            try {
       
          const checklistDetalhado = await knex
              .select(
                  'table_checklist.id as checklist_id',
                  'table_checklist.data',
                  'table_unidade.nome as nome_unidade',
                  'table_usuario.nome as nome_gerente'
              )
              .from('table_checklist')
              .join('table_unidade', 'table_checklist.unidade_id', 'table_unidade.id')
              .join('table_usuario', 'table_checklist.responsavel_id', 'table_usuario.id')
              .where('table_checklist.id', id)
              .first();
  
          if (!checklistDetalhado) {
              return reply.status(404).send({ error: "Checklist not found" });
          }
  
          const checklistDiario = await knex("table_checklist_diario as tcd")
              .where("tcd.checklist_id", id)
              .first();
  
          const result:any = {
              checklist_id: checklistDetalhado.checklist_id,
              data: checklistDetalhado.data,
              nome_unidade: checklistDetalhado.nome_unidade,
              nome_gerente: checklistDetalhado.nome_gerente,
              justificativa: checklistDiario.justificativa,
              itens_diario: [],
              percentual_itens_marcados: 0,
          };
  
          if (checklistDiario) {
            const itensDiario = await knex("table_checklistDiario_item as tcdi")
                .select(
                    "tcdi.item_checklist_id as item_id",
                    "tcdi.disponivel",
                    "tm.nome as motivo_nome"
                )
                .leftJoin("table_item_checklist_motivo as tim", "tcdi.motivo_id", "tim.id")
                .leftJoin("table_motivo as tm", "tim.motivo_id", "tm.id")
                .where("tcdi.checklistDiario_id", checklistDiario.id);
        
            const totalItensDiario = itensDiario.length;
            const itensMarcadosDiario = itensDiario.filter((item) => item.disponivel);
        
            const percentual = (itensMarcadosDiario.length / totalItensDiario) * 100 || 0;
        
            // Mapeia os resultados
            result.itens_diario = await Promise.all(itensDiario.map(async (item) => {
                // Consulta o nome do item usando o item_id
                const nomeItem = await knex("table_item_checklist")
                    .select("nome")
                    .where("id", item.item_id)
                    .first();
        
                return {
                    nome: nomeItem ? nomeItem.nome : null,  // Verifica se encontrou um nome
                    disponivel: item.disponivel,
                    motivo: item.motivo_nome || null,
                };
            }));
        
            result.percentual_itens_marcados = percentual;
        }
          return reply.status(200).send(result);
      } catch (error) {
          console.error(error);
          return reply.status(500).send("Erro ao processar a requisição.");
      }
    });
  
    app.get('/checklists-detalhados-usuario/:idUsuario', async (request, reply) => {

      const getChecklists = z.object({
        idUsuario: z.string().uuid(),
      });
    
      const { idUsuario } = getChecklists.parse(request.params);
    
      try {
        const currentDate = new Date().toISOString().split("T")[0];
    
        // Obter o distrito associado ao usuário
        const distritoId = await knex('table_distrito')
          .select('id')
          .where('coordenador_id', idUsuario)
          .first();
        // Verificar se o usuário é coordenador de algum distrito
        if (!distritoId) {
          return reply.status(404).send("Usuário não é coordenador de nenhum distrito.");
        }
    
        // Obter as unidades do distrito
        const unidadesDistrito = await knex('table_unidade')
          .select('id')
          .where('distrito_id', distritoId.id);
    
        // Obter checklists detalhados para as unidades do distrito
        const checklistsDetalhados = await knex
          .select(
            'table_checklist.id as checklist_id',
            'table_checklist.data',
            'table_checklist.unidade_id',
            'table_unidade.nome as nome_unidade',
            'table_usuario.nome as nome_gerente'
          )
          .from('table_checklist')
          .join('table_unidade', 'table_checklist.unidade_id', 'table_unidade.id')
          .join('table_usuario', 'table_checklist.responsavel_id', 'table_usuario.id')
          .whereIn('table_checklist.unidade_id', unidadesDistrito.map(u => u.id))
          .where(knex.raw("DATE(table_checklist.data) = ?", currentDate));
    
        const result = [];
    
        for (const checklist of checklistsDetalhados) {
          const checklistDiario = await knex("table_checklist_diario as tcd")
            .where("tcd.checklist_id", checklist.checklist_id)
            .first();
    
          if (checklistDiario) {
            const itensDiario = await knex("table_checklistDiario_item as tcdi")
              .select(
                "tic.nome",
                "tcdi.disponivel",
                "tm.nome as motivo_nome"
              )
              .leftJoin("table_item_checklist_motivo as tim", "tcdi.motivo_id", "tim.id")
              .leftJoin("table_motivo as tm", "tim.motivo_id", "tm.id")
              .leftJoin("table_item_checklist as tic", "tim.item_checklist_id", "=", "tic.id")
              .where("tcdi.checklistDiario_id", checklistDiario.id);
    
            const totalItensDiario = itensDiario.length;
            const itensMarcadosDiario = itensDiario.filter((item) => item.disponivel);
    
            const percentual = (itensMarcadosDiario.length / totalItensDiario) * 100 || 0;
    
            result.push({
              checklist_id: checklist.checklist_id,
              data: checklist.data,
              nome_unidade: checklist.nome_unidade,
              nome_gerente: checklist.nome_gerente,
              itens_diario: itensDiario.map(item => ({
                nome: item.nome,
                disponivel: item.disponivel,
                motivo_nome: item.motivo_nome || null,
              })),
              percentual_itens_marcados: percentual,
            });
          } else {
            result.push({
              checklist_id: checklist.checklist_id,
              data: checklist.data,
              nome_unidade: checklist.nome_unidade,
              nome_gerente: checklist.nome_gerente,
              itens_diario: [],
              percentual_itens_marcados: 0,
            });
          }
        }
    
        result.sort((a, b) => a.percentual_itens_marcados - b.percentual_itens_marcados);
    
        return reply.status(200).send(result);
      } catch (error) {
        console.error(error);
        return reply.status(500).send("Erro ao processar a requisição.");
      }
    });

    app.get('/quantidade-unidades-distrito/:idUsuario', async (request, reply) => {

      const getQuantidadeUnidades = z.object({
        idUsuario: z.string().uuid(),
      });
    
      const { idUsuario } = getQuantidadeUnidades.parse(request.params);
    
      try {
        // Obter o distrito associado ao usuário
        const distritoId = await knex('table_distrito')
          .select('id')
          .where('coordenador_id', idUsuario)
          .first();
    
        // Verificar se o usuário é coordenador de algum distrito
        if (!distritoId) {
          return reply.status(404).send("Usuário não é coordenador de nenhum distrito.");
        }
    
        // Obter a quantidade de unidades vinculadas ao distrito
        const quantidadeUnidades = await knex('table_unidade')
          .count('id as quantidade')
          .where('distrito_id', distritoId.id)
          .first();
    
          if (quantidadeUnidades) {
            return reply.status(200).send({ quantidadeUnidades: quantidadeUnidades.quantidade });
          } else {
            return reply.status(404).send("Nenhuma unidade encontrada para este distrito.");
          }
      } catch (error) {
        console.error(error);
        return reply.status(500).send("Erro ao processar a requisição.");
      }
    });
  
    app.put("/:id", async (request, reply) => {

      try {
        const putChecklists = z.object({
          id: z.string().uuid(),
        });

        const { id } = putChecklists.parse(request.params);

        const updateChecklistBodySchema = z.object({
          data: z.string(),
          compareceu: z.boolean(),
          profissional_id: z.string().uuid(),
        });

        const { data, compareceu, profissional_id } = updateChecklistBodySchema.parse(
          request.body
        );

        await knex("table_checklist")
          .update({
            data,
            compareceu,
            profissional_id,
          })
          .where("id", id);

        reply.send({ success: true });
      } catch (error) {
        reply.status(400).send();
      }
    });

    app.delete("/:id", async (request, reply) => {
      const deleteChecklists = z.object({
        id: z.string().uuid(),
      });

      const { id } = deleteChecklists.parse(request.params);

      await knex("table_checklist").delete().where("id", id);
      reply.send({ success: true });
    });
}
