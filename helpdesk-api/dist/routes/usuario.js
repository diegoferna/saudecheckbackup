"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usuariosRoutes = void 0;
const zod_1 = require("zod");
const node_crypto_1 = require("node:crypto");
const databaseSQLITE_1 = require("../databaseSQLITE");
async function usuariosRoutes(app) {
    app.get('/:id', async (request, reply) => {
        const getUsuario = zod_1.z.object({
            id: zod_1.z.string().uuid(),
        });
        const { id } = getUsuario.parse(request.params);
        const user = await (0, databaseSQLITE_1.knex)('table_usuario')
            .select('table_usuario.nome as nome_usuario', 'table_unidade.nome as nome_unidade', 'table_distrito.nome as nome_distrito')
            .join('table_unidade', 'table_unidade.gerente', '=', 'table_usuario.nome')
            .join('table_distrito', 'table_distrito.id', '=', 'table_unidade.distrito_id')
            .where('table_usuario.id', id)
            .first();
        reply.send(user);
    });
    app.post("/login", async (request, reply) => {
        const getUsuario = zod_1.z.object({
            email: zod_1.z.string(),
            senha: zod_1.z.string(),
        });
        const { email, senha } = getUsuario.parse(request.body);
        const user = await (0, databaseSQLITE_1.knex)("table_usuario")
            .where({ email })
            .first();
        if (!user || senha !== user.senha) {
            reply.code(401).send({ message: "Nome de usuário ou senha inválidos" });
            return;
        }
        // Verificar se o usuário é um gerente
        if (user.tipo == "gerente" || user.tipo === "administrador") {
            // Buscar a unidade do gerente
            const unidade = await (0, databaseSQLITE_1.knex)("table_unidade")
                .where({ gerente_id: user.id })
                .first();
            // Incluir a informação da unidade na resposta
            user.unidade_id = unidade.id;
        }
        reply.send(user);
    });
    app.get("/", async (request, reply) => {
        const usuarios = await (0, databaseSQLITE_1.knex)("table_usuario").select();
        reply.send(usuarios);
    });
    app.post("/", async (request, reply) => {
        const createUsuarioBodySchema = zod_1.z.object({
            nome: zod_1.z.string(),
            email: zod_1.z.string(),
            senha: zod_1.z.string(),
            tipo: zod_1.z.string(),
        });
        const { nome, email, senha, tipo } = createUsuarioBodySchema.parse(request.body);
        const usuario = {
            id: (0, node_crypto_1.randomUUID)(),
            nome,
            email,
            senha,
            tipo,
        };
        await (0, databaseSQLITE_1.knex)("table_usuario").insert(usuario);
        reply.status(201).send(usuario);
    });
    app.put("/:id", async (request, reply) => {
        try {
            const putUsuarios = zod_1.z.object({
                id: zod_1.z.string().uuid(),
            });
            const { id } = putUsuarios.parse(request.params);
            const updateUsuarioBodySchema = zod_1.z.object({
                nome: zod_1.z.string(),
                email: zod_1.z.string(),
                senha: zod_1.z.string(),
                tipo: zod_1.z.string(),
            });
            const { nome, email, senha, tipo } = updateUsuarioBodySchema.parse(request.body);
            await (0, databaseSQLITE_1.knex)("table_usuario")
                .update({
                nome,
                email,
                senha,
                tipo,
            })
                .where("id", id);
            reply.send({ success: true });
        }
        catch (error) {
            reply.status(400).send();
        }
    });
    app.delete("/:id", async (request, reply) => {
        const deleteUsuario = zod_1.z.object({
            id: zod_1.z.string().uuid(),
        });
        const { id } = deleteUsuario.parse(request.params);
        await (0, databaseSQLITE_1.knex)("table_usuario").delete().where("id", id);
        reply.send({ success: true });
    });
}
exports.usuariosRoutes = usuariosRoutes;
