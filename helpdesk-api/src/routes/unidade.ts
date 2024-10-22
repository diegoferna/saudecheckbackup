import { FastifyInstance } from "fastify";
import { z } from "zod";
import { randomUUID } from "node:crypto";
import { knex } from "../databaseSQLITE";

interface Unidade {
  id: string;
  nome: string;
  local: string;
  gerente_id: string;
  distrito_id: string;
}

export async function unidadesRoutes(app: FastifyInstance) {
  app.get("/", async (request, reply) => {
    const unidades = await knex("table_unidade").select();
    reply.send(unidades);
  });

  app.get("/:id", async (request, reply) => {
    const getUnidades = z.object({
      id: z.string().uuid(),
    });

    const { id } = getUnidades.parse(request.params);
    const unidade = await knex("table_unidade")
      .select()
      .where("gerente_id", id)
      .first();

    reply.send(unidade);
  });

  app.post("/", async (request, reply) => {
    const createUnidadeBodySchema = z.object({
      nome: z.string(),
      local: z.string(),
      gerenteId: z.string(),
      distritoId: z.string(),
    });

    const { nome, local, distritoId , gerenteId } = createUnidadeBodySchema.parse(
      request.body
    );

    const unidade = {
      id: randomUUID(),
      nome,
      endereco_id: local,
      gerente_id: gerenteId,
      distrito_id: distritoId,
    };

    await knex("table_unidade").insert(unidade);

    return reply.status(201).send(unidade);
  });

  app.put("/:id", async (request, reply) => {
    try {
      const putUnidades = z.object({
        id: z.string().uuid(),
      });

      const { id } = putUnidades.parse(request.params);

      const updateUnidadeBodySchema = z.object({
        nome: z.string(),
        local: z.string(),
        gerente: z.string(),
        distrito_id: z.string().uuid(),
      });

      const { nome, local, gerente, distrito_id } = updateUnidadeBodySchema.parse(
        request.body
      );

      await knex("table_unidade")
        .update({
          nome,
          local,
          gerente,
          distrito_id,
        })
        .where("id", id);

      reply.send({ success: true });
    } catch (error) {
      reply.status(400).send();
    }
  });

  app.delete("/:id", async (request, reply) => {
    const deleteUnidades = z.object({
      id: z.string().uuid(),
    });

    const { id } = deleteUnidades.parse(request.params);

    await knex("table_unidade").delete().where("id", id);
    reply.send({ success: true });
  });
}
