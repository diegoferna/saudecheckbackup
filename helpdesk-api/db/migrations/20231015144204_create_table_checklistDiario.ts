import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('table_checklist_diario', table => {
        table.uuid('id').primary();
        table.string('nome').notNullable();
        table.string('justificativa');

        table.uuid('checklist_id').unsigned().nullable();
        table.foreign('checklist_id').references('table_checklist.id');

        table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable()
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('table_checklist_diario');
}