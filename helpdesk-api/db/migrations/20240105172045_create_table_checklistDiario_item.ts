import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('table_checklistDiario_item', function(table){
        table.uuid('id').primary();
        table.string('data');
        table.boolean('disponivel');

        table.uuid('checklistDiario_id').unsigned();
        table.foreign('checklistDiario_id').references('table_checklist_diario.id');

        table.uuid('motivo_id').unsigned();
        table.foreign('motivo_id').references('table_item_checklist_motivo.id');

        table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable()
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('table_checklistDiario_item');
}

