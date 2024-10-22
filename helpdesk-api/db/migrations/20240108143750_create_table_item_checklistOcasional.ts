import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('table_item_checklistOcasional', function(table){
            table.uuid('id').primary();
            table.string('nome').notNullable();
            table.string('tipo_checklist').defaultTo('ocasional').notNullable();
    
            table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable()
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('table_item_checklistOcasional');
}

