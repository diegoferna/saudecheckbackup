import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('table_unidade', table => {
        table.uuid('id').primary();
        table.string('nome').notNullable();

        

        table.uuid('gerente_id').unsigned().notNullable();
        table.foreign('gerente_id').references('table_usuario.id');
        table.uuid('distrito_id').unsigned().notNullable();
        table.foreign('distrito_id').references('table_distrito.id');
        table.uuid('endereco_id')
        table.foreign('endereco_id').references('table_endereco.id');

        table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable()
      })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('table_unidade');

}

