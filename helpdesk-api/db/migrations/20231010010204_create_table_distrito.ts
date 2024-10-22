import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('table_distrito', table => {
        table.uuid('id').primary();
        table.string('nome').notNullable();

        table.uuid('coordenador_id')
        table.foreign('coordenador_id').references('table_usuario.id');
        
        
        table.uuid('endereco_id')
        table.foreign('endereco_id').references('table_endereco.id');

        table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable()
      })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('table_distrito');

}

