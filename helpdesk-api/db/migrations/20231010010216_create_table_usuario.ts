import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('table_usuario', function (table) {
        table.uuid('id').primary();
        table.string('nome').notNullable();
        table.string('email').unique();
        table.string('senha').notNullable();
        table.enu('tipo', ['administrador', 'suporte', 'supervisor', 'gerente', 'representante']);
        table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable()
      })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('table_usuario');
}

