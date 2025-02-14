import db from '../connection.js';

export const createProject = async (project) => {
    return db("Projects")
        .insert({ ...project, created_at: db.fn.now() }) // Asegurar que created_at se incluya
        .returning("*");
};

export const getProjects = async (organizationId) => {
    return db("Projects")
        .select("*")
        .where("organization_id", organizationId);
};

export const getProjectById = async (id) => {
    return db("Projects")
        .select("*")
        .where("id", id)
        .first();
};

export const updateProject = async (id, project) => {
    return db("Projects")
        .update({ ...project })
        .where("id", id)
        .returning("*");
};

export const deleteProject = async (id) => {
    return db("Projects")
        .where("id", id)
        .del() 
        .returning("*");
};