import { assignTaskService, changeTaskStatusService, createTaskService, deleteTaskService, getTaskByIdService, getTasksByUserService, getTasksService, unassignTaskService, updateTaskService } from "../services/tasksService.js";

export const createTaskController = async (req, res) => {
    try {
        const projectId = req.params.id;
        const task = await createTaskService({ ...req.body, projectId });
        res.status(201).json(task);
    } catch (error) {
        res.status(error.statusCode).json({ message: error.message, context: error.context });
    }
};

export const getTasksController = async (req, res) => {
    try {
        const projectId = req.params.id;
        const { status } = req.query;
        const tasks = await getTasksService(projectId, status);
        res.status(200).json(tasks);
    } catch (error) {
        res.status(error.statusCode).json({ message: error.message, context: error.context });
    }
};

export const getTaskByIdController = async (req, res) => {
    try {
        const task = await getTaskByIdService(req.params.id);
        res.status(200).json(task);
    } catch (error) {
        res.status(error.statusCode).json({ message: error.message, context: error.context });
    }
};

export const updateTaskController = async (req, res) => {
    try {
        const updatedTask = await updateTaskService(req.params.id, req.body);
        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(error.statusCode).json({ message: error.message, context: error.context });
    }
};

export const deleteTaskController = async (req, res) => {
    try {
        const deletedTask = await deleteTaskService(req.params.id);
        res.status(200).json(deletedTask);
    } catch (error) {
        res.status(error.statusCode).json({ message: error.message, context: error.context });
    }
};

export const changeTaskStatusController = async (req, res) => {
    try {
        const updatedTask = await changeTaskStatusService(req.params.id, req.body.statusId);
        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(error.statusCode).json({ message: error.message, context: error.context });
    }
};

export const assignTaskController = async (req, res) => {
    try {
        const updatedTask = await assignTaskService(req.params.id, req.body.userId);
        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(error.statusCode).json({ message: error.message, context: error.context });
    }
};

export const unassignTaskController = async (req, res) => {
    try {
        const updatedTask = await unassignTaskService(req.params.id, req.params.userId);
        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(error.statusCode).json({ message: error.message, context: error.context });
    }
};

export const getTaskAssignmentsController = async (req, res) => {
    try {
        const assignments = await getTasksByUserService(req.params.id);
        res.status(200).json(assignments);
    } catch (error) {
        res.status(error.statusCode).json({ message: error.message, context: error.context });
    }
};
