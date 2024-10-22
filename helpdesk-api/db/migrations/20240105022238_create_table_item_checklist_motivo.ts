import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('table_item_checklist_motivo', function (table) {
        table.uuid('id').primary();

        table.uuid('item_checklist_id').unsigned();
        table.foreign('item_checklist_id').references('table_item_checklist.id');

        table.uuid('motivo_id').unsigned();
        table.foreign('motivo_id').references('table_motivo.id');

        table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable()
    })
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('table_item_checklist_motivo');
}

