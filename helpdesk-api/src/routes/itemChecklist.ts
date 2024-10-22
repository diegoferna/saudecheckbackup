import { FastifyInstance } from "fastify";
import { z } from "zod";
import { randomUUID } from "node:crypto";
import { knex } from "../databaseSQLITE";



export async function ItemChecklist(app: FastifyInstance){
    app.get("/item-checklist-diario", async function(request, reply){
        const items = await knex("table_item_checklist").select();
        reply.send(items);
    })

    app.get("/item-checklist-ocasional", async function(request, reply){
        const items = await knex("table_item_checklistOcasional").select();
        reply.send(items);
    })


    app.post("/", async function(request, reply){
        const createItem = z.object({
            nome: z.string(),
            tipo_checklist: z.string()
        });

        const { nome, tipo_checklist } = createItem.parse(request.body)

        if(tipo_checklist == "diario"){
            const item = {
                id: randomUUID(),
                nome,
                tipo_checklist
            }

            try {
                await knex('table_item_checklist').insert(item);
    
            }catch(error){
                console.log(error)
            }
            return reply.status(201).send(item);
        }else {
            const item = {
                id: randomUUID(),
                nome,
                tipo_checklist
            }

            try {
                await knex('table_item_checklistOcasional').insert(item);
    
            }catch(error){
                console.log(error)
            }
            return reply.status(201).send(item);
        }
    })

} 