import db from '../connection.js';

export const createUser = async (organizationId, { email, password, role }) => {
    return db.transaction(async (trx) => {
        const [ user ] = await trx('Users').insert({ email, password }).returning('*');
        await trx('UserOrganizations').insert({ user_id: user.id, organization_id: organizationId, role });

        return user;
    });
};

export const getUsers = async (organizationId) => {
    return db('Users').join('UserOrganizations', 'Users.id', 'UserOrganizations.user_id').select('Users.*').where('UserOrganizations.organization_id', organizationId)
            .where('UserOrganizations.organization_id', organizationId)
            .select('Users.*', "UserOrganizations.role", "UserOrganizations.organization_id");
};

export const getUserById = async (id) => {
    return db('Users').select('*').where('id', id).first();
};

export const updateUser = async (id, user) => {
    return db('Users').update(user).where('id', id).returning('*');
};

export const deleteUser = async (id) => {
    return db('Users').delete().where('id', id).returning('*');
};

export const getUserByEmail = async (email) => {
    return db('Users').select('*').where('email', email).first();
};