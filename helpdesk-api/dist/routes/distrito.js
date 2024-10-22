"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.distritosRoutes = void 0;
const zod_1 = require("zod");
const node_crypto_1 = require("node:crypto");
const databaseSQLITE_1 = require("../databaseSQLITE");
async function distritosRoutes(app) {
    app.get("/", async (request, reply) => {
        const distritos = await (0, databaseSQLITE_1.knex)("table_distrito").select();
        reply.send(distritos);
    });
    app.get("/:id", async (request, reply) => {
        const getDistritos = zod_1.z.object({
            id: zod_1.z.string().uuid(),
        });
        const { id } = getDistritos.parse(request.params);
        const distrito = await (0, databaseSQLITE_1.knex)("table_distrito")
            .select()
            .where("id", id)
            .first();
        reply.send(distrito);
    });
    app.post("/", async (request, reply) => {
        const createDistritoBodySchema = zod_1.z.object({
            nome: zod_1.z.string(),
            local: zod_1.z.string(),
            coordenador: zod_1.z.string(),
        });
        const { nome, local, coordenador } = createDistritoBodySchema.parse(request.body);
        const distrito = {
            id: (0, node_crypto_1.randomUUID)(),
            nome,
            local,
            coordenador,
        };
        await (0, databaseSQLITE_1.knex)("table_distrito").insert(distrito);
        return reply.status(201).send(distrito);
    });
    app.put("/:id", async (request, reply) => {
        try {
            const putDistritos = zod_1.z.object({
                id: zod_1.z.string().uuid(),
            });
            const { id } = putDistritos.parse(request.params);
            const updateDistritoBodySchema = zod_1.z.object({
                nome: zod_1.z.string(),
                local: zod_1.z.string(),
                coordenador: zod_1.z.string(),
            });
            const { nome, local, coordenador } = updateDistritoBodySchema.parse(request.body);
            await (0, databaseSQLITE_1.knex)("table_distrito")
                .update({
                nome,
                local,
                coordenador,
            })
                .where("id", id);
            reply.send({ success: true });
        }
        catch (error) {
            reply.status(400).send();
        }
    });
    app.delete("/:id", async (request, reply) => {
        const deleteDistritos = zod_1.z.object({
            id: zod_1.z.string().uuid(),
        });
        const { id } = deleteDistritos.parse(request.params);
        await (0, databaseSQLITE_1.knex)("table_distrito").delete().where("id", id);
        reply.send({ success: true });
    });
}
exports.distritosRoutes = distritosRoutes;
