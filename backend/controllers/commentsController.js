import { CreateTaskCommentService, DeleteTaskCommentService, GetTaskCommentByIdService, GetTaskCommentsService, UpdateTaskCommentService } from "../services/commentsService.js";

export const createTaskCommentController = async (req, res) => {
    try {
        const { id } = req.params;
        const comment = await CreateTaskCommentService(id, req.body);
        res.status(201).json(comment);
    } catch (error) {
        res.status(error.statusCode).json({ message: error.message, context: error.context });
    }
};

export const getTaskCommentsController = async (req, res) => {
    try {
        const comments = await GetTaskCommentsService(req.params.id);
        res.status(200).json(comments);
    } catch (error) {
        res.status(error.statusCode).json({ message: error.message, context: error.context });
    }
};

export const getTaskCommentByIdController = async (req, res) => {
    try {
        const comment = await GetTaskCommentByIdService(req.params.id);
        res.status(200).json(comment);
    } catch (error) {
        res.status(error.statusCode).json({ message: error.message, context: error.context });
    }
};

export const updateTaskCommentController = async (req, res) => {
    try {
        const comment = await UpdateTaskCommentService(req.params.id, req.body);
        res.status(200).json(comment);
    } catch (error) {
        res.status(error.statusCode).json({ message: error.message, context: error.context });
    }
};

export const deleteTaskCommentController = async (req, res) => {
    try {
        const comment = await DeleteTaskCommentService(req.params.id);
        res.status(200).json(comment);
    } catch (error) {
        res.status(error.statusCode).json({ message: error.message, context: error.context });
    }
};