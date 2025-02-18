import db from '../connection.js';


export const createTask = async (task) => {
    return db("Tasks").insert({
        ...task,
        created_at: db.fn.now(),
    }).returning("*");
};

export const getTasks = async (projectId, statusId) => {
    const query = db("Tasks")
        .select("Tasks.*", db.raw(`CASE WHEN "TaskAssignments"."id" IS NOT NULL THEN TRUE ELSE FALSE END AS "is_assigned"`))
        .leftJoin("TaskAssignments", function () {
            this.on("Tasks.id", "=", "TaskAssignments.task_id")
                .andOnNull("TaskAssignments.unassigned_at");
            })
        .where("project_id", projectId)
        .andWhere("is_deleted", false);
    if (statusId) {
        query.andWhere("status_id", statusId)
    }
    return query;
};

export const getTaskById = async (id) => {
  return db("Tasks")
    .select("Tasks.*", db.raw(`CASE WHEN "TaskAssignments"."id" IS NOT NULL THEN TRUE ELSE FALSE END AS "is_assigned"`))
    .leftJoin("TaskAssignments", function () {
      this.on("Tasks.id", "=", "TaskAssignments.task_id")
          .andOnNull("TaskAssignments.unassigned_at");
    })
    .where("Tasks.id", id)
    .first();
};

export const updateTask = async (id, task) => {
    return db("Tasks")
        .update({ ...task, update_at: db.fn.now() })
        .where("id", id)
        .returning("*");
};

export const deleteTask = async (id) => {
    return db("Tasks")
        .update({ is_deleted: true, update_at: db.fn.now() })
        .where("id", id)
        .returning("*");
};

export const changeTaskStatus = async (id, statusId) => {
    return db("Tasks")
        .update({ status_id: statusId, update_at: db.fn.now() }) 
        .where("id", id)
        .returning("*");
};

export const assignTask = async (taskId, userId) => {
    return db("TaskAssignments")
        .insert({ task_id: taskId, user_id: userId })
        .returning("*");
};

export const unassignTask = async (taskId) => {
    return db("TaskAssignments")
        .where("task_id", taskId)
        .del();
};

export const getTaskByUser = async (userId) => {
    return db("TaskAssignments")
        .join("Tasks", "TaskAssignments.task_id", "Tasks.id")
        .select("Tasks.*", "TaskAssignments.assigned_at")
        .where("TaskAssignments.user_id", userId)
        .andWhere("TaskAssignments.unassigned_at", null);
};

export const getStatusByName = async (name) => {
    return db("TaskStatuses").select("*").where("name", name).first();
}

export const getStatusById = async (id) => {
    return db("TaskStatuses").select("*").where("id", id).first();
}