/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema
    .dropTableIfExists("TaskComments")
    .createTable('TaskComments', (table) => {
        table.increments('id').primary();
        table.integer('task_id').unsigned().notNullable().references('id').inTable('Tasks').onDelete('CASCADE');
        table.text('content').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
    });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema
    .dropTableIfExists("TaskComments");
}
