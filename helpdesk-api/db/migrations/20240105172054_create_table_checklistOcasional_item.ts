import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('table_checklistOcasional_item', function(table){
        table.uuid('id').primary();

        table.boolean('disponivel');
        table.string('justificativa');
        table.date('data');


        table.uuid('item_checklistOcasional_id').unsigned();
        table.foreign('item_checklistOcasional_id').references('table_item_checklistOcasional.id');

        table.uuid('checklistOcasional_id').unsigned();
        table.foreign('checklistOcasional_id').references('table_checklist_ocasional.id');

        table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable()
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('table_checklistOcasional_item');
}

