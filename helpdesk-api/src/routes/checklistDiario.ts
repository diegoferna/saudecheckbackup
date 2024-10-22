import { FastifyInstance } from "fastify";
import { z } from "zod";
import { randomUUID } from "node:crypto";
import { knex } from "../databaseSQLITE";

export async function ChecklistDiario(app: FastifyInstance){
    app.get("/", async function(reply,request){

    })

    app.post("/", async function(reply,request){
        const checklistDiario = z.object({

        })

        
    })

} 