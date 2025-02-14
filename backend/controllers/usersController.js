import { createUserService, getUsersService, getUserByIdService, updateUserService, deleteUserService } from "../services/usersService.js";

export const createUserController = async (req, res) => {
    try {
        const user = req.body;
        const organizationId = req.params.organizationId;
        const role = req.body.role;
        const newUser = await createUserService(user, organizationId, role);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(error.statusCode).json({ message: error.message });
    }
};

export const getUsersController = async (req, res) => {
    try {
        const organizationId = req.params.organizationId;
        const users = await getUsersService(organizationId);
        res.status(200).json(users);
    } catch (error) {
        res.status(error.statusCode).json({ message: error.message });
    }
};

export const getUserByIdController = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await getUserByIdService(id);
        res.status(200).json(user);
    } catch (error) {
        res.status(error.statusCode).json({ message: error.message });
    }
};

export const updateUserController = async (req, res) => {
    try {
        const id = req.params.id;
        const user = req.body;
        const updatedUser = await updateUserService(id, user);
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(error.statusCode).json({ message: error.message });
    }
};

export const deleteUserController = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedUser = await deleteUserService(id);
        res.status(200).json(deletedUser);
    } catch (error) {
        res.status(error.statusCode).json({ message: error.message });
    }
};
