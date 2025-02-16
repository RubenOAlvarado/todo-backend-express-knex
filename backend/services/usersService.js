import { createUser, getUserByEmail, getUsers, getUserById, updateUser, deleteUser } from "../database/users/queries.js";
import BadRequestError from "../shared/httpErrors/BadRequestError.js";
import NotFoundError from "../shared/httpErrors/NotFoundError.js";

export async function createUserService(user, organizationId, role) {
    try {
        const userExists = await getUserByEmail(user.email);
        if (userExists) {
            throw new BadRequestError('User already exists.', { email: user.email }, true);
        }
        return createUser(user, organizationId, role);
    } catch (error) {
        throw error;
    }
}

export async function getUsersService(organizationId) {
    try {
        const users = await getUsers(organizationId);
        if (!users) {
            throw new NotFoundError('Users not found.', { organizationId });
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
        const validUser = await getUserById(id);
        const updatedUser = await updateUser(validUser.id, user);
        return updatedUser;
    } catch (error) {
        throw error;
    }
}

export async function deleteUserService(id) {
    try {
        const validUser = await getUserById(id);
        const user = await deleteUser(validUser.id);
        return user;
    } catch (error) {
        throw error;
    }
}
