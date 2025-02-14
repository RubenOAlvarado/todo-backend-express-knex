import { assignTask, changeTaskStatus, createTask, deleteTask, getTaskById, getTaskByUser, getTasks, unassignTask, updateTask } from "../database/tasks/queries.js";
import BadRequestError from "../shared/httpErrors/BadRequestError.js";
import NotFoundError from "../shared/httpErrors/NotFoundError.js";
import { getProjectByIdService } from "./projectsService.js";
import { getUserByIdService } from "./usersService.js";

export async function createTaskService(taskData) {
    try {
        const project = await getProjectByIdService(taskData.projectId);
        if (!project) {
            throw new BadRequestError('Project not found');
        }
        const task = await createTask(taskData);
        return task;
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function getTasksService(projectId, statusId) {
    try {
        const tasks = await getTasks(projectId, statusId);
        if (!tasks) throw new NotFoundError('Tasks not found');
        return tasks;
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function getTaskByIdService(id) {
    try {
        const task = await getTaskById(id);
        if (!task) {
            throw new NotFoundError('Task not found');
        }
        return task;
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function updateTaskService(id, taskData) {
    try {
        const validTask = await getTaskById(id);
        const updatedTask = await updateTask(validTask.id, taskData);
        return updatedTask;
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function deleteTaskService(id) {
    try {
        const validTask = await getTaskById(id);
        const deletedTask = await deleteTask(validTask.id);
        return deletedTask;
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function changeTaskStatusService(id, statusId) {
    try {
        const validTask = await getTaskById(id);
        const updatedTask = await changeTaskStatus(validTask.id, statusId);
        return updatedTask;
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function assignTaskService(taskId, userId) {
    try {
        const validTask = await getTaskById(taskId);
        const assignment = await assignTask(validTask.id, userId);
        return assignment;
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function unassignTaskService(taskId, userId) {
    try {
        const validTask = await getTaskById(taskId);
        const user = await getUserByIdService(userId);
        if (!user) {
            throw new BadRequestError('User not found');
        }
        const assignment = await unassignTask(validTask.id, user.id);
        return assignment;
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function getTasksByUserService(userId) {
    try {
        const user = await getUserByIdService(userId);
        if (!user) {
            throw new BadRequestError('User not found');
        }
        const tasks = await getTaskByUser(userId);
        return tasks;
    } catch (error) {
        throw new Error(error.message);
    }
}
