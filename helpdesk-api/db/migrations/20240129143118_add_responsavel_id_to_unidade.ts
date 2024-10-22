import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.table('table_unidade', function(table) {
    table.uuid('responsavel_id').unsigned().nullable();
    table.foreign('responsavel_id').references('table_usuario.id');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.table('table_unidade', function(table) {
    table.dropColumn('responsavel_id');
  });
}
