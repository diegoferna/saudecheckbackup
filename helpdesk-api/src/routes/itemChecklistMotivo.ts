import { FastifyInstance } from "fastify";
import { z } from "zod";
import { randomUUID } from "node:crypto";
import { knex } from "../databaseSQLITE";

export async function itemChecklistMotivo(app: FastifyInstance){

    app.get('/', async function(request, reply) {
        try {
            // Realiza um join entre as tabelas para obter informações de nome
            const itemsMotivos = await knex("table_item_checklist_motivo as tim")
                .select(
                    'tic.id as item_id',
                    'tic.nome as item_nome',
                    'tic.tipo_checklist as item_tipo',
                    'tm.nome as motivo_nome',
                    'tm.id as id_motivo'
                )
                .join('table_item_checklist as tic', 'tim.item_checklist_id', 'tic.id')
                .join('table_motivo as tm', 'tim.motivo_id', 'tm.id')
                .groupBy('tic.id', 'tm.nome')
                .orderBy('tic.id');
    
            const result = itemsMotivos.reduce((acc, { item_id, item_nome, item_tipo, id_motivo, motivo_nome }) => {
                const existingItem = acc.find((item:any) => item.id === item_id);
    
                if (existingItem) {
                    existingItem.motivos.push({id_motivo: id_motivo,motivo_nome: motivo_nome});
                } else {
                    acc.push({
                        id: item_id,
                        nome: item_nome,
                        tipo: item_tipo,
                        motivos: [{id_motivo: id_motivo,motivo_nome: motivo_nome}],
                    });
                }
    
                return acc;
            }, []);
    
            reply.send(result);
        } catch (error) {
            console.error(error);
            reply.status(500).send({ error: "Internal Server Error" });
        }
    });
    
    app.get('/obterIdMotivo/:item_checklist_id/:motivo_id', async (request, reply) => {

        const getChecklists = z.object({
            item_checklist_id: z.string().uuid(),
            motivo_id: z.string().uuid()
        });

        const { item_checklist_id, motivo_id } = getChecklists.parse(request.params);

        try {
      
          const idMotivo = await knex('table_item_checklist_motivo')
            .select('id')
            .where({ item_checklist_id, motivo_id })
            .first();
      
          if (!idMotivo) {
            return reply.status(404).send({ error: 'Motivo não encontrado para os IDs fornecidos.' });
          }
      
          reply.send({ id_motivo: idMotivo.id });
        } catch (error) {
          console.error(error);
          reply.status(500).send({ error: 'Internal Server Error' });
        }
      });
      
    
    app.post("/", async function (request, reply) {
        
        const createItemMotivo = z.object({
            item_checklist_id: z.string(),
            motivo_ids: z.array(z.string()), // Change to array of motivo_ids
        });
    
        const { item_checklist_id, motivo_ids } = createItemMotivo.parse(request.body);
        try {
            const insertedMotivos = await Promise.all(
                motivo_ids.map(async (motivo_id) => {
                    const itemMotivo = {
                        id: randomUUID(),
                        item_checklist_id,
                        motivo_id,
                    };
    
                    await knex('table_item_checklist_motivo').insert(itemMotivo);
    
                    return itemMotivo;
                })
            );
    
            return reply.status(201).send(insertedMotivos);
        } catch (error) {
            return reply.status(500).send({ error: "Internal Server Error2" });
        }
    });

    // Endpoint para retornar todas as informações relacionadas aos itens de checklist
// Endpoint para retornar todos os registros da tabela table_item_checklist_motivo
    app.get('/todosItensChecklistMotivo', async (request, reply) => {
        try {
        const todosItensChecklistMotivo = await knex('table_item_checklist_motivo')
            .select('*');
    
        reply.send(todosItensChecklistMotivo);
        } catch (error) {
        console.error(error);
        reply.status(500).send({ error: 'Internal Server Error' });
        }
    });
} 