import { FastifyInstance } from "fastify";
import { z } from "zod";
import { randomUUID } from "node:crypto";
import { knex } from "../databaseSQLITE";

interface Distrito {
  id: string;
  nome: string;
  local: string;
  coordenador: string;
}

export async function distritosRoutes(app: FastifyInstance) {
  app.get("/", async (request, reply) => {
    const distritos = await knex("table_distrito").select();
    reply.send(distritos);
  });

  app.get("/:id", async (request, reply) => {
    const getDistritos = z.object({
      id: z.string().uuid(),
    });

    const { id } = getDistritos.parse(request.params);

    const distrito = await knex("table_distrito")
      .select()
      .where("id", id)
      .first();

    reply.send(distrito);
  });

  app.post("/", async (request, reply) => {
    const createDistritoBodySchema = z.object({
      nome: z.string(),
      local: z.string(),
      coordenador: z.string(),
    });

    const { nome, local, coordenador } = createDistritoBodySchema.parse(
      request.body
    );

    const distrito = {
      id: randomUUID(),
      nome,
      endereco_id: local,
      coordenador_id: coordenador,
    };

    await knex("table_distrito").insert(distrito);

    return reply.status(201).send(distrito);
  });

  app.put("/:id", async (request, reply) => {
    try {
      const putDistritos = z.object({
        id: z.string().uuid(),
      });

      const { id } = putDistritos.parse(request.params);

      const updateDistritoBodySchema = z.object({
        nome: z.string(),
        local: z.string(),
        coordenador: z.string(),
      });

      const { nome, local, coordenador } = updateDistritoBodySchema.parse(
        request.body
      );

      await knex("table_distrito")
        .update({
          nome,
          local,
          coordenador,
        })
        .where("id", id);

      reply.send({ success: true });
    } catch (error) {
      reply.status(400).send();
    }
  });

  app.delete("/:id", async (request, reply) => {
    const deleteDistritos = z.object({
      id: z.string().uuid(),
    });

    const { id } = deleteDistritos.parse(request.params);

    await knex("table_distrito").delete().where("id", id);
    reply.send({ success: true });
  });
}
