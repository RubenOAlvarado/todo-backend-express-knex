import { createUser, getUserByEmail, getUsers, getUserById, updateUser, deleteUser } from "../database/users/queries.js";
import BadRequestError from "../shared/httpErrors/BadRequestError.js";
import NotFoundError from "../shared/httpErrors/NotFoundError.js";

export async function createUserService(organizationId, data) {
    try {
        const userExists = await getUserByEmail(data.email);
        if (userExists) {
            throw new BadRequestError('User already exists.', { email: data.email }, true);
        }
        const user = await createUser(organizationId, data);
        return user;
    } catch (error) {
        throw error;
    }
}

export async function getUsersService(organizationId) {
    try {
        const users = await getUsers(organizationId);
        if (users.length === 0) {
            throw new NotFoundError('Organization does not have users registered.', { organizationId });
        }
        return users;
    } catch (error) {
        throw error;
    }
}

export async function getUserByIdService(id) {
    try {
        const user = await getUserById(id);
        if (!user) {
            throw new NotFoundError('User not found.', { id });
        }
        return user;
    } catch (error) {
        throw error;
    }
}

export async function updateUserService(id, user) {
    try {
        const validUser = await getUserByIdService(id);
        const [updatedUser] = await updateUser(validUser.id, user);
        return updatedUser;
    } catch (error) {
        throw error;
    }
}

export async function deleteUserService(id) {
    try {
        const validUser = await getUserByIdService(id);
        const [user] = await deleteUser(validUser.id);
        return user;
    } catch (error) {
        throw error;
    }
}
