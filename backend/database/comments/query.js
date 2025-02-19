import db from '../connection.js';

export const createTaskComment = async (taskId, content) => {
    return db('TaskComments').insert({ task_id: taskId, ...content }).returning('*');
};

export const getTaskComments = async (taskId) => {
    return db('TaskComments').select('*').where('task_id', taskId);
};

export const updateTaskComment = async (id, data) => {
    return db('TaskComments').update(data).where('id', id).returning('*');
}

export const deleteTaskComment = async (id) => {
    return db('TaskComments').where('id', id).del().returning('*');
};

export const getTaskCommentById = async (id) => {
    return db('TaskComments').select('*').where('id', id).first();
}