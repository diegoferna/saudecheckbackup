"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const env_1 = require("./env");
const cors_1 = __importDefault(require("@fastify/cors"));
const distrito_1 = require("./routes/distrito");
const unidade_1 = require("./routes/unidade");
const checklist_1 = require("./routes/checklist");
const usuario_1 = require("./routes/usuario");
const app = (0, fastify_1.default)();
app.register(cors_1.default, {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"], // métodos HTTP permitidos
});
app.register(distrito_1.distritosRoutes, {
    prefix: 'distrito'
});
app.register(unidade_1.unidadesRoutes, {
    prefix: 'unidade'
});
app.register(usuario_1.usuariosRoutes, {
    prefix: 'usuario'
});
app.register(checklist_1.checklistsRoutes, {
    prefix: 'checklists'
});
console.log(env_1.env.PORT);
app.listen({
    port: env_1.env.PORT,
    host: '0.0.0.0'
}).then(() => {
    console.log('Http server runing');
});
