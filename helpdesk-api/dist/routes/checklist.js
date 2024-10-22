"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checklistsRoutes = void 0;
const zod_1 = require("zod");
const node_crypto_1 = require("node:crypto");
const databaseSQLITE_1 = require("../databaseSQLITE");
async function checklistsRoutes(app) {
    app.get("/checklists-do-dia", async (request, reply) => {
        try {
            const checklistsDoDia = await databaseSQLITE_1.knex
                .select([
                'c.*',
                'u.nome as nomeUnidade',
                'us.nome as nomeGerente',
                databaseSQLITE_1.knex.raw({})
            ])
                .from('table_checklist as c')
                .join('table_unidade as u', 'c.unidade_id', '=', 'u.id')
                .join('table_usuario as us', 'u.gerente_id', '=', 'us.id')
                .where(databaseSQLITE_1.knex.raw("CAST(c.created_at AS DATE) = CAST(GETDATE() AS DATE)"));
            reply.send(checklistsDoDia);
        }
        catch (error) {
            console.log(error);
            return [];
        }
    });
    app.get("/", async (request, reply) => {
        const currentDate = new Date().toISOString().split('T')[0];
        try {
            const checklists = await (0, databaseSQLITE_1.knex)("table_checklist")
                .join("table_checklist_diario", "table_checklist.id", "=", "table_checklist_diario.checklist_id")
                .join("table_checklist_ocasional", "table_checklist.id", "=", "table_checklist_ocasional.checklist_id")
                .join("table_unidade", "table_checklist.unidade_id", "=", "table_unidade.id")
                .join("table_usuario", "table_checklist.gerente_id", "=", "table_usuario.id")
                .select("table_checklist.*", "table_unidade.nome as nomeUnidade", "table_usuario.nome as nomeUsuario", databaseSQLITE_1.knex.raw(`(
            (CASE WHEN farmacia_disponivel THEN 1 ELSE 0 END) +
            (CASE WHEN vacina_disponivel THEN 1 ELSE 0 END) +
            (CASE WHEN curativo_simples_disponivel THEN 1 ELSE 0 END) +
            (CASE WHEN curativo_especial_disponivel  THEN 1 ELSE 0 END) +
            (CASE WHEN procedimento_disponivel THEN 1 ELSE 0 END) +
            (CASE WHEN marcacao_interna_disponivel THEN 1 ELSE 0 END) +
            (CASE WHEN marcacao_externa_disponivel  THEN 1 ELSE 0 END) +
            (CASE WHEN atendimento_medico_disponivel  THEN 1 ELSE 0 END) +
            (CASE WHEN atendimento_odontologico_disponivel  THEN 1 ELSE 0 END) +
            (CASE WHEN acolhimento_disponivel  THEN 1 ELSE 0 END) +
            (CASE WHEN coleta_laboratorio_disponivel  THEN 1 ELSE 0 END) +
            (CASE WHEN visita_domiciliar_disponivel  THEN 1 ELSE 0 END) +
            (CASE WHEN sala_Laboratorio_disponivel  THEN 1 ELSE 0 END) +
            (CASE WHEN sala_esterilizacao_disponivel  THEN 1 ELSE 0 END) +
            (CASE WHEN carro_visita_disponivel THEN 1 ELSE 0 END) +
            (CASE WHEN instabilidade_informacao_disponivel THEN 1 ELSE 0 END) +
            (CASE WHEN alvara_sanitario THEN 1 ELSE 0 END) +
            (CASE WHEN relotacao_profissional_disponivel THEN 1 ELSE 0 END) +
            (CASE WHEN afastamento_profissional_disponivel THEN 1 ELSE 0 END) +
            (CASE WHEN apresentacao_profissional_disponivel THEN 1 ELSE 0 END) +
            (CASE WHEN desligamento_profissional_disponivel THEN 1 ELSE 0 END) +
            (CASE WHEN acionamento_samu_disponivel THEN 1 ELSE 0 END) +
            (CASE WHEN ausencia_insumo_disponivel THEN 1 ELSE 0 END) +
            (CASE WHEN incidentes_criticos_disponivel THEN 1 ELSE 0 END) +
            (CASE WHEN intercorrencia_estrutural_disponivel THEN 1 ELSE 0 END) +
            (CASE WHEN intercorrencia_sala_ondonto_disponivel THEN 1 ELSE 0 END) 
          ) as totalTrueItems`))
                .where(databaseSQLITE_1.knex.raw("DATE(table_checklist.data) = ?", currentDate));
            reply.send({ items: checklists });
        }
        catch (error) {
            console.log(error);
            return [];
        }
    });
    app.get("/:id", async (request, reply) => {
        console.log('iniciando consulta');
        const getChecklists = zod_1.z.object({
            id: zod_1.z.string().uuid(),
        });
        const { id } = getChecklists.parse(request.params);
        try {
            const checklist = await (0, databaseSQLITE_1.knex)("table_checklist")
                .select()
                .where("id", id)
                .first();
            if (checklist) {
                const checklistDiario = await (0, databaseSQLITE_1.knex)("table_checklist_diario")
                    .select()
                    .where("checklist_id", id)
                    .first();
                const checklistOcasional = await (0, databaseSQLITE_1.knex)("table_checklist_ocasional")
                    .select()
                    .where("checklist_id", id)
                    .first();
                checklist.checklistDiario = checklistDiario;
                checklist.checklistOcasional = checklistOcasional;
            }
            reply.send({ items: checklist });
        }
        catch (error) {
            console.log(error);
            return [];
        }
    });
    app.get("/checklists_do_dia", async (request, reply) => {
        const queryParams = zod_1.z.object({
            page: zod_1.z.string().transform((value) => parseInt(value)),
            itemsPerPage: zod_1.z.string().transform((value) => parseInt(value)),
        });
        const currentDate = new Date().toISOString().split('T')[0];
        const { page, itemsPerPage } = queryParams.parse(request.query);
        const checklistsQuery = (0, databaseSQLITE_1.knex)("table_checklist")
            .select("table_checklist.*", "usuario.nome as gerente_nome", "unidade.nome as unidade_nome", 
        // Campos da tabela 'table_checklist_diario'
        "diario.farmacia_disponivel", "diario.motivo_farmacia", 
        // ... adicione outros campos conforme necessário ...
        // Campos da tabela 'table_checklist_ocasional'
        "ocasional.alvara_sanitario", "ocasional.data_alvara_sanitario"
        // ... adicione outros campos conforme necessário ...
        )
            .leftJoin("table_usuario as usuario", "usuario.id", "table_checklist.gerente_id")
            .leftJoin("table_unidade as unidade", "unidade.id", "table_checklist.unidade_id")
            // Junte as tabelas 'table_checklist_diario' e 'table_checklist_ocasional'
            .leftJoin("table_checklist_diario as diario", "diario.checklist_id", "table_checklist.id")
            .leftJoin("table_checklist_ocasional as ocasional", "ocasional.checklist_id", "table_checklist.id")
            .where(databaseSQLITE_1.knex.raw("DATE(table_checklist.data) = ?", currentDate));
        const totalItemsResult = (await checklistsQuery.clone().count("* as count").first());
        const totalPages = Math.ceil(totalItemsResult.count / itemsPerPage);
        const checklists = await checklistsQuery
            .orderBy("created_at", "desc")
            .limit(itemsPerPage * totalPages)
            .offset((page - 1) * itemsPerPage);
        reply.send({ items: checklists, totalPages: totalPages });
    });
    app.get("/checklists_com_profissional_ausente", async (request, reply) => {
        const queryParams = zod_1.z.object({
            page: zod_1.z.string().transform((value) => parseInt(value)),
            itemsPerPage: zod_1.z.string().transform((value) => parseInt(value)),
        });
        const { page, itemsPerPage } = queryParams.parse(request.query);
        const checklists = await (0, databaseSQLITE_1.knex)("table_checklist")
            .select()
            .whereExists((0, databaseSQLITE_1.knex)("table_checklist_proffissionais")
            .select("*")
            .whereRaw("table_checklist_proffissionais.checklist_id = table_checklist.id")
            .andWhere("presente", false))
            .limit(itemsPerPage)
            .offset((page - 1) * itemsPerPage);
        reply.send(checklists);
    });
    app.get("/checklists_farmacia_indisponivel", async (request, reply) => {
        const checklists = await (0, databaseSQLITE_1.knex)("table_checklist")
            .select(databaseSQLITE_1.knex.raw("strftime('%d/%m/%Y', data) as data"), databaseSQLITE_1.knex.raw("count(*) as count"))
            .where("farmacia_disponivel", 0)
            .andWhere("data", ">=", databaseSQLITE_1.knex.raw("date('now', '-30 days')"))
            .groupByRaw("strftime('%d/%m/%Y', data)")
            .orderBy("data");
        reply.send(checklists);
    });
    app.get("/checklists_profissional_ausente", async (request, reply) => {
        const checklists = await (0, databaseSQLITE_1.knex)("table_checklist")
            .select(databaseSQLITE_1.knex.raw("strftime('%d/%m/%Y', table_checklist.data) as data"), databaseSQLITE_1.knex.raw("count(distinct table_checklist.id) as count"))
            .innerJoin("table_checklist_proffissionais", "table_checklist.id", "table_checklist_proffissionais.checklist_id")
            .where("table_checklist_proffissionais.presente", 0)
            .andWhere("table_checklist.data", ">=", databaseSQLITE_1.knex.raw("date('now', '-30 days')"))
            .groupByRaw("strftime('%d/%m/%Y', table_checklist.data)")
            .orderBy("data");
        reply.send(checklists);
    });
    app.get("/checklists_profissional", async (request, reply) => {
        // Consulta o banco de dados para obter todos os checklists
        const checklists = await (0, databaseSQLITE_1.knex)("table_checklist")
            .select("table_checklist.id", "table_checklist.data", "table_checklist.farmacia_disponivel", "table_checklist.motivo_farmacia", "table_checklist.motivo_profissional_ausente", "table_checklist.unidade_id", "table_checklist.gerente_id", "usuario.nome as gerente_nome", "unidade.nome as unidade_nome")
            .leftJoin("table_usuario as usuario", "usuario.id", "table_checklist.gerente_id")
            .leftJoin("table_unidade as unidade", "unidade.id", "table_checklist.unidade_id");
        // Consulta o banco de dados para obter os profissionais associados a cada checklist
        for (const checklist of checklists) {
            const profissionais = await (0, databaseSQLITE_1.knex)("table_checklist_proffissionais")
                .select("table_profissional.nome", "table_checklist_proffissionais.presente")
                .where("checklist_id", checklist.id)
                .leftJoin("table_profissional", "table_profissional.id", "table_checklist_proffissionais.profissional_id");
            checklist.profissionais = profissionais;
        }
        return reply.status(200).send(checklists);
    });
    app.post("/", async (request, reply) => {
        const createChecklistBodySchema = zod_1.z.object({
            data: zod_1.z.string(),
            unidade_id: zod_1.z.string().uuid(),
            gerente_id: zod_1.z.string().uuid(),
            // Adicione os campos específicos do Checklist Diário e Ocasional aqui
            farmacia_disponivel: zod_1.z.boolean().nullable(),
            motivo_farmacia: zod_1.z.string().nullable(),
            vacina_disponivel: zod_1.z.boolean().nullable(),
            motivo_vacina: zod_1.z.string().nullable(),
            curativo_simples_disponivel: zod_1.z.boolean().nullable(),
            motivo_curativo_simples: zod_1.z.string().nullable(),
            curativo_especial_disponivel: zod_1.z.boolean().nullable(),
            motivo_curativo_especial: zod_1.z.string().nullable(),
            procedimento_disponivel: zod_1.z.boolean().nullable(),
            motivo_procedimento: zod_1.z.string().nullable(),
            marcacao_interna_disponivel: zod_1.z.boolean().nullable(),
            motivo_marcacao_interna: zod_1.z.string().nullable(),
            marcacao_externa_disponivel: zod_1.z.boolean().nullable(),
            motivo_marcacao_externa: zod_1.z.string().nullable(),
            atendimento_medico_disponivel: zod_1.z.boolean().nullable(),
            motivo_atendimento_medico: zod_1.z.string().nullable(),
            atendimento_odontologico_disponivel: zod_1.z.boolean().nullable(),
            motivo_atendimento_odontologico: zod_1.z.string().nullable(),
            acolhimento_disponivel: zod_1.z.boolean().nullable(),
            motivo_acolhimiento: zod_1.z.string().nullable(),
            coleta_laboratorio_disponivel: zod_1.z.boolean().nullable(),
            motivo_coleta_laboratorio: zod_1.z.string().nullable(),
            visita_domiciliar_disponivel: zod_1.z.boolean().nullable(),
            motivo_visita_domiciliar: zod_1.z.string().nullable(),
            sala_Laboratorio_disponivel: zod_1.z.boolean().nullable(),
            motivo_sala_laboratorio: zod_1.z.string().nullable(),
            sala_esterilizacao_disponivel: zod_1.z.boolean().nullable(),
            motivo_sala_esterilizacao: zod_1.z.string().nullable(),
            carro_visita_disponivel: zod_1.z.boolean().nullable(),
            motivo_carro_visita: zod_1.z.string().nullable(),
            instabilidade_informacao_disponivel: zod_1.z.boolean().nullable(),
            motivo_instabilidade_informacao: zod_1.z.string().nullable(),
            //Checklist Ocasional
            alvara_sanitario: zod_1.z.boolean().nullable(),
            data_alvara_sanitario: zod_1.z.string().nullable(),
            relotacao_profissional_disponivel: zod_1.z.boolean().nullable(),
            nome_profissional_relotacao: zod_1.z.string().nullable(),
            data_relotacao: zod_1.z.string().nullable(),
            afastamento_profissional_disponivel: zod_1.z.boolean().nullable(),
            nome_profissional_afastamento: zod_1.z.string().nullable(),
            data_afastamento_profissional: zod_1.z.string().nullable(),
            apresentacao_profissional_disponivel: zod_1.z.boolean().nullable(),
            nome_profissional_apresentacao: zod_1.z.string().nullable(),
            data_apresentacao_profissional: zod_1.z.string().nullable(),
            desligamento_profissional_disponivel: zod_1.z.boolean().nullable(),
            nome_profissional_desligamento: zod_1.z.string().nullable(),
            data_desligamento_profissional: zod_1.z.string().nullable(),
            acionamento_samu_disponivel: zod_1.z.boolean().nullable(),
            motivo_acionamento_samu: zod_1.z.string().nullable(),
            data_acionamento_samu: zod_1.z.string().nullable(),
            ausencia_insumo_disponivel: zod_1.z.boolean().nullable(),
            motivo_ausencia_insumo: zod_1.z.string().nullable(),
            data_ausencia_insumo: zod_1.z.string().nullable(),
            incidentes_criticos_disponivel: zod_1.z.boolean().nullable(),
            motivo_incidentes_criticos: zod_1.z.string().nullable(),
            data_incidentes_criticos: zod_1.z.string().nullable(),
            intercorrencia_estrutural_disponivel: zod_1.z.boolean().nullable(),
            motivo_intercorrencia_estrutural: zod_1.z.string().nullable(),
            data_intercorrencia_estrutural: zod_1.z.string().nullable(),
            intercorrencia_sala_odontologia_disponivel: zod_1.z.boolean().nullable(),
            motivo_intercorrencia_sala_odontologia_disponivel: zod_1.z.string().nullable(),
            data_intercorrencia_sala_odontologia_disponivel: zod_1.z.string().nullable(),
        });
        const { data, unidade_id, gerente_id, farmacia_disponivel, motivo_farmacia, curativo_simples_disponivel, motivo_curativo_simples, curativo_especial_disponivel, motivo_curativo_especial, procedimento_disponivel, motivo_procedimento, marcacao_interna_disponivel, motivo_marcacao_interna, marcacao_externa_disponivel, motivo_marcacao_externa, atendimento_medico_disponivel, motivo_atendimento_medico, atendimento_odontologico_disponivel, motivo_atendimento_odontologico, acolhimento_disponivel, motivo_acolhimiento, coleta_laboratorio_disponivel, motivo_coleta_laboratorio, visita_domiciliar_disponivel, motivo_visita_domiciliar, sala_Laboratorio_disponivel, motivo_sala_laboratorio, sala_esterilizacao_disponivel, motivo_sala_esterilizacao, carro_visita_disponivel, motivo_carro_visita, instabilidade_informacao_disponivel, motivo_instabilidade_informacao, 
        //Checklist Ocasional
        alvara_sanitario, data_alvara_sanitario, relotacao_profissional_disponivel, nome_profissional_relotacao, data_relotacao, afastamento_profissional_disponivel, nome_profissional_afastamento, data_afastamento_profissional, apresentacao_profissional_disponivel, nome_profissional_apresentacao, data_apresentacao_profissional, desligamento_profissional_disponivel, nome_profissional_desligamento, data_desligamento_profissional, acionamento_samu_disponivel, motivo_acionamento_samu, data_acionamento_samu, ausencia_insumo_disponivel, motivo_ausencia_insumo, data_ausencia_insumo, incidentes_criticos_disponivel, motivo_incidentes_criticos, data_incidentes_criticos, intercorrencia_estrutural_disponivel, motivo_intercorrencia_estrutural, data_intercorrencia_estrutural, } = createChecklistBodySchema.parse(request.body);
        const checklistId = (0, node_crypto_1.randomUUID)();
        const checklist = {
            id: checklistId,
            data,
            unidade_id,
            gerente_id,
        };
        await (0, databaseSQLITE_1.knex)("table_checklist").insert(checklist);
        const checklistDiario_id = (0, node_crypto_1.randomUUID)();
        const checklistDiario = {
            id: checklistDiario_id,
            checklist_id: checklistId,
            farmacia_disponivel,
            motivo_farmacia,
            curativo_simples_disponivel,
            motivo_curativo_simples,
            curativo_especial_disponivel,
            motivo_curativo_especial,
            procedimento_disponivel,
            motivo_procedimento,
            marcacao_interna_disponivel,
            motivo_marcacao_interna,
            marcacao_externa_disponivel,
            motivo_marcacao_externa,
            atendimento_medico_disponivel,
            motivo_atendimento_medico,
            atendimento_odontologico_disponivel,
            motivo_atendimento_odontologico,
            acolhimento_disponivel,
            motivo_acolhimiento,
            coleta_laboratorio_disponivel,
            motivo_coleta_laboratorio,
            visita_domiciliar_disponivel,
            motivo_visita_domiciliar,
            sala_Laboratorio_disponivel,
            motivo_sala_laboratorio,
            sala_esterilizacao_disponivel,
            motivo_sala_esterilizacao,
            carro_visita_disponivel,
            motivo_carro_visita,
            instabilidade_informacao_disponivel,
            motivo_instabilidade_informacao,
        };
        await (0, databaseSQLITE_1.knex)("table_checklist_diario").insert(checklistDiario);
        const checklistOcasional_id = (0, node_crypto_1.randomUUID)();
        const checklistOcasional = {
            id: checklistOcasional_id,
            checklist_id: checklistId,
            alvara_sanitario,
            data_alvara_sanitario,
            relotacao_profissional_disponivel,
            nome_profissional_relotacao,
            data_relotacao,
            afastamento_profissional_disponivel,
            nome_profissional_afastamento,
            data_afastamento_profissional,
            apresentacao_profissional_disponivel,
            nome_profissional_apresentacao,
            data_apresentacao_profissional,
            desligamento_profissional_disponivel,
            nome_profissional_desligamento,
            data_desligamento_profissional,
            acionamento_samu_disponivel,
            motivo_acionamento_samu,
            data_acionamento_samu,
            ausencia_insumo_disponivel,
            motivo_ausencia_insumo,
            data_ausencia_insumo,
            incidentes_criticos_disponivel,
            motivo_incidentes_criticos,
            data_incidentes_criticos,
            intercorrencia_estrutural_disponivel,
            motivo_intercorrencia_estrutural,
            data_intercorrencia_estrutural,
            // ... outros campos ...
        };
        await (0, databaseSQLITE_1.knex)("table_checklist_ocasional").insert(checklistOcasional);
        return reply.status(201).send(checklist);
    });
    app.put("/:id", async (request, reply) => {
        console.log('iniciando consulta');
        try {
            const putChecklists = zod_1.z.object({
                id: zod_1.z.string().uuid(),
            });
            const { id } = putChecklists.parse(request.params);
            const updateChecklistBodySchema = zod_1.z.object({
                data: zod_1.z.string(),
                compareceu: zod_1.z.boolean(),
                profissional_id: zod_1.z.string().uuid(),
            });
            const { data, compareceu, profissional_id } = updateChecklistBodySchema.parse(request.body);
            await (0, databaseSQLITE_1.knex)("table_checklist")
                .update({
                data,
                compareceu,
                profissional_id,
            })
                .where("id", id);
            reply.send({ success: true });
        }
        catch (error) {
            reply.status(400).send();
        }
    });
    app.delete("/:id", async (request, reply) => {
        const deleteChecklists = zod_1.z.object({
            id: zod_1.z.string().uuid(),
        });
        const { id } = deleteChecklists.parse(request.params);
        await (0, databaseSQLITE_1.knex)("table_checklist").delete().where("id", id);
        reply.send({ success: true });
    });
}
exports.checklistsRoutes = checklistsRoutes;
