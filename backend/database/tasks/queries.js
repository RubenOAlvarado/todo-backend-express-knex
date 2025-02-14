import db from '../connection.js';


export const createTask = async (task) => {
    return db("Tasks").insert(task).returning("*");
};

export const getTasks = async (projectId, statusId) => {
    return db("Tasks")
        .select("*")
        .where("project_id", projectId)
        .andWhere("status_id", statusId)
        .andWhere("is_deleted", false);
};

export const getTaskById = async (id) => {
    return db("Tasks").select("*").where("id", id).first();
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

export const unassignTask = async (taskId, userId) => {
    return db("TaskAssignments")
        .update({ unassigned_at: db.fn.now() })
        .where("task_id", taskId)
        .andWhere("user_id", userId)
        .returning("*");
};

export const getTaskByUser = async (userId) => {
    return db("TaskAssignments")
        .join("Tasks", "TaskAssignments.task_id", "Tasks.id")
        .select("Tasks.*", "TaskAssignments.assigned_at")
        .where("TaskAssignments.user_id", userId)
        .andWhereNull("TaskAssignments.unassigned_at");
};
