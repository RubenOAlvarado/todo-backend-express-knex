/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('Organizations').del()
  await knex('Organizations').insert([
    { name: "Organization 1" },
    { name: "Organization 2" },
    { name: "Organization 3" },
  ]);
  await knex('Users').del()
  await knex('Users').insert([
    { email: "test@io.com", password: "123456" },
    { email: "test2@io.com", password: "123456" },
    { email: "test3@io.com", password: "123456" },
  ]);
  await knex('Projects').del()
  await knex('Projects').insert([
    { name: "Project 1", organization_id: 1 },
    { name: "Project 2", organization_id: 1 },
    { name: "Project 3", organization_id: 2 },
  ]);
  await knex('TaskStatuses').del()
  await knex('TaskStatuses').insert([
    { name: "To Do" },
    { name: "In Progress" },
    { name: "Done" },
  ]);
  await knex('Tasks').del()
  await knex('Tasks').insert([
    { title: "Task 1", description: "Description 1", status_id: 1, project_id: 1, created_by: 1 },
    { title: "Task 2", description: "Description 2", status_id: 2, project_id: 1, created_by: 1 },
    { title: "Task 3", description: "Description 3", status_id: 3, project_id: 2, created_by: 2 },
  ]);
  await knex('UserOrganizations').del()
  await knex('UserOrganizations').insert([
    { user_id: 1, organization_id: 1, role: "admin" },
    { user_id: 2, organization_id: 1, role: "member" },
    { user_id: 3, organization_id: 2, role: "member" },
  ]);
  await knex('TaskAssignments').del()
  await knex('TaskAssignments').insert([
    { task_id: 1, user_id: 1 },
    { task_id: 2, user_id: 2 },
    { task_id: 3, user_id: 3 },
  ]);
}
