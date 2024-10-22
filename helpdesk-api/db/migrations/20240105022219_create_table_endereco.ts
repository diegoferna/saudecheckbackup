import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('table_endereco', function(table){
        table.uuid('id').primary();
        table.string('nome');

        table.string('logradouro'); // Rua, avenida, etc.
        table.string('numero');
        table.enum('tipo', ['unidade', 'distrito']);

        table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable()
    })
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('table_endereco');
}

