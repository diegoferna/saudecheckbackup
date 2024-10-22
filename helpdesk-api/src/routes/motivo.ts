import { FastifyInstance } from "fastify";
import { z } from "zod";
import { randomUUID } from "node:crypto";
import { knex } from "../databaseSQLITE";

export async function motivoRoutes(app: FastifyInstance){
    app.get("/", async function(request, reply){
        const motivos = await knex("table_motivo").select();
        reply.send(motivos);
    })

    app.post("/", async function(request, reply){
        const createMotivoSchema = z.object({
            nome: z.string(),
        });

        const { nome } = createMotivoSchema.parse(request.body)

        const motivo = {
            id: randomUUID(),
            nome,
        }
        try {
            await knex('table_motivo').insert(motivo);

        }catch(error){
            console.log(error)
        }

        return reply.status(201).send(motivo);
    })

    

} 