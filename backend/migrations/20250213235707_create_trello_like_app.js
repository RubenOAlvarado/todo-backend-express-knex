/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema
    .dropTableIfExists("TaskAssignments")
    .dropTableIfExists("UserOrganizations")
    .dropTableIfExists("Tasks")
    .dropTableIfExists("TaskStatuses")
    .dropTableIfExists("Projects")
    .dropTableIfExists("Users")
    .dropTableIfExists("Organizations")
    .createTable("Organizations", function (table) {
      table.increments("id").primary();
      table.string("name").notNullable();
      table.timestamp("created_at").defaultTo(knex.fn.now());
    })
    .createTable("Users", function (table) {
      table.increments("id").primary();
      table.string("email").unique().notNullable();
      table.string("password").notNullable();
      table.timestamp("created_at").defaultTo(knex.fn.now());
    })
    .createTable("Projects", function (table) {
      table.increments("id").primary();
      table.string("name").notNullable();
      table.integer("organization_id").unsigned().references("id").inTable("Organizations").onDelete("CASCADE");
      table.timestamp("created_at").defaultTo(knex.fn.now());
    })
    .createTable("TaskStatuses", function (table) {
      table.increments("id").primary();
      table.string("name").unique().notNullable();
    })
    .createTable("Tasks", function (table) {
      table.increments("id").primary();
      table.string("title").notNullable();
      table.text("description");
      table.integer("status_id").unsigned().references("id").inTable("TaskStatuses");
      table.integer("project_id").unsigned().references("id").inTable("Projects").onDelete("CASCADE");
      table.integer("created_by").unsigned().references("id").inTable("Users");
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("update_at").defaultTo(knex.fn.now());
      table.boolean("is_deleted").defaultTo(false);
    })
    .createTable("UserOrganizations", function (table) {
      table.increments("id").primary();
      table.integer("user_id").unsigned().references("id").inTable("Users").onDelete("CASCADE");
      table.integer("organization_id").unsigned().references("id").inTable("Organizations").onDelete("CASCADE");
      table.string("role").notNullable();
    })
    .createTable("TaskAssignments", function (table) {
      table.increments("id").primary();
      table.integer("task_id").unsigned().references("id").inTable("Tasks").onDelete("CASCADE");
      table.integer("user_id").unsigned().references("id").inTable("Users").onDelete("CASCADE");
      table.timestamp("assigned_at").defaultTo(knex.fn.now());
      table.timestamp("unassigned_at").nullable();
    });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema
    .dropTableIfExists("TaskAssignments")
    .dropTableIfExists("UserOrganizations")
    .dropTableIfExists("Tasks")
    .dropTableIfExists("TaskStatuses")
    .dropTableIfExists("Projects")
    .dropTableIfExists("Users")
    .dropTableIfExists("Organizations");
}
