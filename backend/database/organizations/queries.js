import db from '../connection.js';


export const getOrganizations = async () => {
    return db("Organizations").select("*");
};

export const getOrganizationById = async (id) => {
    return db("Organizations")
        .select("*")
        .where("id", id)
        .first();
};

export const createOrganization = async (organization) => {
    return db("Organizations")
        .insert({ ...organization, created_at: db.fn.now() })
        .returning("*");
};

export const updateOrganization = async (id, organization) => {
    return db("Organizations")
        .update(organization)
        .where("id", id)
        .returning("*");
};

export const deleteOrganization = async (id) => {
    return db("Organizations")
        .where("id", id)
        .del()
        .returning("*");
};