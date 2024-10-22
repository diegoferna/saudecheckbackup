import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('table_checklist', table => {
        table.uuid('id').primary();
        table.date('data');

        table.uuid('unidade_id').unsigned().notNullable();
        table.foreign('unidade_id').references('table_unidade.id');

        table.uuid('responsavel_id').unsigned().notNullable();
        table.foreign('responsavel_id').references('table_usuario.id');

        table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable()
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('table_checklist');
}

