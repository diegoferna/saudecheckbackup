import { FastifyInstance } from "fastify";
import { z } from "zod";
import { randomUUID } from "node:crypto";
import { knex } from "../databaseSQLITE";

export async function enderecoRoutes(app: FastifyInstance){
    app.get('/', async function(request, reply){
        const enderecos = await knex("table_endereco").select();
        reply.send(enderecos);
    })

    app.post('/', async function(request, reply){
        const createEndereco = z.object({
            nome: z.string(),
            logradouro: z.string(),
            numero: z.string(),
            tipo: z.string(),
        });

        const { nome, logradouro, numero, tipo } = createEndereco.parse(request.body)

        const endereco = {
            id: randomUUID(),
            nome,
            logradouro, 
            numero,
            tipo, 
        }
        try {
            await knex('table_endereco').insert(endereco);

        }catch(error){
            console.log(error)
        }

        return reply.status(201).send(endereco);
    })
} 