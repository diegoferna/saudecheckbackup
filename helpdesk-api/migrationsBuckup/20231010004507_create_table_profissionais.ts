import { Knex } from "knex";


exports.up = async (knex: Knex) => {
    await knex.schema.createTable('table_checklist_proffissionais', table => {
        table.uuid('id').primary();
        table.boolean('presente').notNullable();
        table.string('checklist_id').unsigned().notNullable();
        table.foreign('checklist_id').references('table_checklist.id');
        table.string('profissional_id').unsigned().notNullable();
        table.foreign('profissional_id').references('table_profissional.id');
      })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('table_checklist_proffissionais');

}

