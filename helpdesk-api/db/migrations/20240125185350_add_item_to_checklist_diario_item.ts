// Em um novo arquivo de migração
import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.table('table_checklistDiario_item', function(table) {
    table.uuid('item_checklist_id').unsigned();
    table.foreign('item_checklist_id').references('table_item_checklist.id');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.table('table_checklistDiario_item', function(table) {
    table.dropColumn('item_checklist_id');
  });
}
