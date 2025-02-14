import { assignTaskService, changeTaskStatusService, createTaskService, deleteTaskService, getTaskByIdService, getTasksByUserService, getTasksService, unassignTaskService, updateTaskService } from "../services/tasksService.js";

export const createTaskController = async (req, res) => {
    try {
        const task = await createTaskService(req.body);
        res.status(201).json(task);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getTasksController = async (req, res) => {
    try {
        const tasks = await getTasksService(req.query.project_id, req.query.status_id);
        res.status(200).json(tasks);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getTaskByIdController = async (req, res) => {
    try {
        const task = await getTaskByIdService(req.params.id);
        res.status(200).json(task);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateTaskController = async (req, res) => {
    try {
        const updatedTask = await updateTaskService(req.params.id, req.body);
        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteTaskController = async (req, res) => {
    try {
        const deletedTask = await deleteTaskService(req.params.id);
        res.status(200).json(deletedTask);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const changeTaskStatusController = async (req, res) => {
    try {
        const updatedTask = await changeTaskStatusService(req.params.id, req.body.status_id);
        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const assignTaskController = async (req, res) => {
    try {
        const updatedTask = await assignTaskService(req.params.id, req.body.user_id);
        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const unassignTaskController = async (req, res) => {
    try {
        const updatedTask = await unassignTaskService(req.params.id, req.params.userId);
        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getTaskAssignmentsController = async (req, res) => {
    try {
        const assignments = await getTasksByUserService(req.params.id);
        res.status(200).json(assignments);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
