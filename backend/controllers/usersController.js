import { createUserService, getUsersService, getUserByIdService, updateUserService, deleteUserService } from "../services/usersService.js";

export const createUserController = async (req, res) => {
    try {
        const user = req.body;
        const organizationId = req.params.id;
        const newUser = await createUserService(organizationId, user);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(error.statusCode).json({ message: error.message, context: error.context });
    }
};

export const getUsersController = async (req, res) => {
    try {
        const organizationId = req.params.id;
        const users = await getUsersService(organizationId);
        res.status(200).json(users);
    } catch (error) {
        res.status(error.statusCode).json({ message: error.message, context: error.context });
    }
};

export const getUserByIdController = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await getUserByIdService(id);
        res.status(200).json(user);
    } catch (error) {
        res.status(error.statusCode).json({ message: error.message, context: error.context });
    }
};

export const updateUserController = async (req, res) => {
    try {
        const id = req.params.id;
        const user = req.body;
        const updatedUser = await updateUserService(id, user);
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(error.statusCode).json({ message: error.message, context: error.context });
    }
};

export const deleteUserController = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedUser = await deleteUserService(id);
        res.status(200).json(deletedUser);
    } catch (error) {
        res.status(error.statusCode).json({ message: error.message, context: error.context });
    }
};
