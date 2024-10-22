"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unidadesRoutes = void 0;
const zod_1 = require("zod");
const node_crypto_1 = require("node:crypto");
const databaseSQLITE_1 = require("../databaseSQLITE");
async function unidadesRoutes(app) {
    app.get("/", async (request, reply) => {
        const unidades = await (0, databaseSQLITE_1.knex)("table_unidade").select();
        reply.send(unidades);
    });
    app.get("/:id", async (request, reply) => {
        const getUnidades = zod_1.z.object({
            id: zod_1.z.string().uuid(),
        });
        const { id } = getUnidades.parse(request.params);
        const unidade = await (0, databaseSQLITE_1.knex)("table_unidade")
            .select()
            .where("gerente_id", id)
            .first();
        reply.send(unidade);
    });
    app.post("/", async (request, reply) => {
        const createUnidadeBodySchema = zod_1.z.object({
            nome: zod_1.z.string(),
            local: zod_1.z.string(),
            gerenteId: zod_1.z.string(),
            distritoId: zod_1.z.string(),
        });
        const { nome, local, distritoId, gerenteId } = createUnidadeBodySchema.parse(request.body);
        const unidade = {
            id: (0, node_crypto_1.randomUUID)(),
            nome,
            local,
            gerente_id: gerenteId,
            distrito_id: distritoId,
        };
        await (0, databaseSQLITE_1.knex)("table_unidade").insert(unidade);
        return reply.status(201).send(unidade);
    });
    app.put("/:id", async (request, reply) => {
        try {
            const putUnidades = zod_1.z.object({
                id: zod_1.z.string().uuid(),
            });
            const { id } = putUnidades.parse(request.params);
            const updateUnidadeBodySchema = zod_1.z.object({
                nome: zod_1.z.string(),
                local: zod_1.z.string(),
                gerente: zod_1.z.string(),
                distrito_id: zod_1.z.string().uuid(),
            });
            const { nome, local, gerente, distrito_id } = updateUnidadeBodySchema.parse(request.body);
            await (0, databaseSQLITE_1.knex)("table_unidade")
                .update({
                nome,
                local,
                gerente,
                distrito_id,
            })
                .where("id", id);
            reply.send({ success: true });
        }
        catch (error) {
            reply.status(400).send();
        }
    });
    app.delete("/:id", async (request, reply) => {
        const deleteUnidades = zod_1.z.object({
            id: zod_1.z.string().uuid(),
        });
        const { id } = deleteUnidades.parse(request.params);
        await (0, databaseSQLITE_1.knex)("table_unidade").delete().where("id", id);
        reply.send({ success: true });
    });
}
exports.unidadesRoutes = unidadesRoutes;
