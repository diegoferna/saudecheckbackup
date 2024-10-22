import { FastifyInstance } from "fastify";
import { z } from "zod";
import { randomUUID } from "node:crypto";
import { knex } from "../databaseSQLITE";
import bcrypt, { compare, hash } from "bcrypt";
import { AppError } from "../errors/AppError";


export async function usuariosRoutes(app: FastifyInstance) {
  
  app.get('/:id', async (request, reply) => {
    const getUsuario = z.object({
      id: z.string().uuid(),
    });
    
    const { id } = getUsuario.parse(request.params);
    const user = await knex('table_usuario')
  .select('table_usuario.nome as nome_usuario', 'table_unidade.nome as nome_unidade', 'table_distrito.nome as nome_distrito')
  .join('table_unidade', 'table_unidade.gerente', '=', 'table_usuario.nome')
  .join('table_distrito', 'table_distrito.id', '=', 'table_unidade.distrito_id')
  .where('table_usuario.id', id)
  .first();

    reply.send(user);
  });
  
  app.post("/login", async (request, reply) => {
    const getUsuario = z.object({
      nome: z.string(),
      senha: z.string(),
    });

    const { nome, senha } = getUsuario.parse(request.body);

    const user = await knex("table_usuario")
      .where({ nome })
      .first();

    if (!user) {
      reply.code(401).send({ message: "Nome de usuário ou senha inválidos" });
      return;
    }

    const passwordMatch = await compare(senha, user.senha);

    if (!passwordMatch) {
      reply.code(401).send({ message: "Nome de usuário ou senha inválidos" });
      return;
    }


    if (user.tipo == "gerente" || user.tipo === "administrador") {
     
      // Buscar a unidade do gerente
      const unidade = await knex("table_unidade")
        .where({ gerente_id: user.id })
        .first();

      // Incluir a informação da unidade na resposta
      user.unidade_id = unidade.id ;

    }
    reply.send(user);
  });

  app.post("/alterarSenha", async (request, reply) => {
    const getUsuario = z.object({
      nome: z.string(),
      senhaAtual: z.string(),
      novaSenha: z.string(),
    });
  
    const { nome, senhaAtual, novaSenha } = getUsuario.parse(request.body);
  
    const user = await knex("table_usuario")
      .where({ nome })
      .first();
  
    const passwordMatch = await compare(senhaAtual, user.senha);
    const passwordHash = await hash(novaSenha, 8);

    if(passwordMatch){
      await knex("table_usuario")
      .where({ nome })
      .update({ senha: passwordHash });
    }
  
    reply.send({ message: "Senha alterada com sucesso!" });
  });
  
  app.get("/", async (request, reply) => {
    const usuarios = await knex("table_usuario").select();
    reply.send(usuarios);
  });

  app.post("/", async (request, reply) => {
    const createUsuarioBodySchema = z.object({
      nome: z.string().trim(),
      email: z.string(),
      senha: z.string(),
      tipo: z.string(),
    });

    const { nome, email, senha, tipo } = createUsuarioBodySchema.parse(
      request.body
    );

    const user = await knex("table_usuario")
      .where({ nome })
      .first();

    if(user != null){
      throw new AppError("Já existe um usuário com esse nome")
    }

    const passwordHash = await hash(senha, 8);

    const usuario = {
      id: randomUUID(),
      nome,
      email,
      senha: passwordHash,
      tipo,
    };

    await knex("table_usuario").insert(usuario);

    reply.status(201).send(usuario);
  });

  app.put("/:id", async (request, reply) => {
    try {
      const putUsuarios = z.object({
        id: z.string().uuid(),
      });

      const { id } = putUsuarios.parse(request.params);

      const updateUsuarioBodySchema = z.object({
        nome: z.string(),
        email: z.string(),
        senha: z.string(),
        tipo: z.string(),
      });

      const { nome, email, senha, tipo } = updateUsuarioBodySchema.parse(
        request.body
      );

      await knex("table_usuario")
        .update({
          nome,
          email,
          senha,
          tipo,
        })
        .where("id", id);

      reply.send({ success: true });
    } catch (error) {
      reply.status(400).send();
    }
  });

  app.delete("/:id", async (request, reply) => {
    const deleteUsuario = z.object({
      id: z.string().uuid(),
    });

    const { id } = deleteUsuario.parse(request.params);

    await knex("table_usuario").delete().where("id", id);
    reply.send({ success: true });
  });


app.post("/resetarSenha", async (request, reply) => {
  const resetarSenhaSchema = z.object({
    novaSenhaPadrao: z.string(),
    id: z.string()
  });

  const { novaSenhaPadrao , id} = resetarSenhaSchema.parse(request.body);
 

  try {
    // Verificar se o usuário existe
    const user = await knex("table_usuario")
      .where({ id })
      .first();

    if (!user) {
      return reply.status(404).send({ message: "Usuário não encontrado" });
    }

    // Atualizar a senha para o padrão "1234"
    const passwordHash = await hash(novaSenhaPadrao, 8);

    await knex("table_usuario")
      .where({ id })
      .update({ senha: passwordHash });

    reply.send({ message: "Senha resetada com sucesso!" });
  } catch (error) {
    console.error(error);
    reply.status(500).send({ message: "Erro ao resetar a senha do usuário" });
  }
});

app.get("/lista-usuarios", async (request, reply) => {
  const usuarios = await knex("table_usuario").select(['id', 'nome']);
  reply.send(usuarios);
});

}
