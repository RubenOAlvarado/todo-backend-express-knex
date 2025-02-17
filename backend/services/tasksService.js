import { 
    assignTask, 
    changeTaskStatus, 
    createTask, 
    deleteTask, 
    getStatusById, 
    getStatusByName,
    getTaskById, 
    getTaskByUser, 
    getTasks, 
    unassignTask, 
    updateTask
} from "../database/tasks/queries.js";
import BadRequestError from "../shared/httpErrors/BadRequestError.js";
import NotFoundError from "../shared/httpErrors/NotFoundError.js";
import { getProjectByIdService } from "./projectsService.js";
import { getUserByIdService } from "./usersService.js";

export async function createTaskService({ projectId, title, description, createdBy }) {
    try {
        const project = await getProjectByIdService(projectId);
        if (!project) {
            throw new BadRequestError('Invalid project.', { projectId: projectId });
        }
        const [task] = await createTask({ 
            project_id: projectId,
            status_id: 1, 
            created_by:createdBy,
            title,
            description 
        });
        return task;
    } catch (error) {
        throw error;
    }
}

export async function getTasksService(projectId, status) {
    try {
        let statusId = null;
        if(status) {
            const validStatus = await getStatusByName(status);
            if (!validStatus) {
                throw new BadRequestError('Invalid status.', { status });
            }
            statusId = validStatus.id;
        }

        const project = await getProjectByIdService(projectId);
        if (!project) {
            throw new BadRequestError('Invalid project.', { projectId });
        }
        const tasks = await getTasks(projectId, statusId);
        if(tasks.length === 0) {
            const errorMesssage = status ? `Project does not have tasks with status ${status}.` : 'Project does not have tasks.';
            throw new NotFoundError(errorMesssage, { projectId, status });
        }
        return tasks;
    } catch (error) {
        throw error;
    }
}

export async function getTaskByIdService(id) {
    try {
        const task = await getTaskById(id);
        if (!task) {
            throw new NotFoundError('Task not found.', { id });
        }
        return task;
    } catch (error) {
        throw error;
    }
}

export async function updateTaskService(id, { projectId, title, description, statusId, createdBy }) {
    try {
        const validTask = await getTaskByIdService(id);
        const [updatedTask] = await updateTask(validTask.id, {
            project_id: projectId,
            status_id: statusId,
            created_by: createdBy,
            title,
            description
        });
        return updatedTask;
    } catch (error) {
        throw error;
    }
}

export async function deleteTaskService(id) {
    try {
        const validTask = await getTaskByIdService(id);
        const [deletedTask] = await deleteTask(validTask.id);
        return deletedTask;
    } catch (error) {
        throw error;
    }
}

export async function changeTaskStatusService(id, statusId) {
    try {
        const validStatus = await getStatusById(statusId);
        if (!validStatus) {
            throw new BadRequestError('Invalid status.', { statusId });
        }
        const validTask = await getTaskByIdService(id);
        const [updatedTask] = await changeTaskStatus(validTask.id, statusId);
        return updatedTask;
    } catch (error) {
        throw error;
    }
}

export async function assignTaskService(taskId, userId) {
    try {
        const validTask = await validateTaskAsignability(taskId);
        const user = await getUserByIdService(userId);
        if (!user) {
            throw new BadRequestError('Invalid user.', { userId });
        }
        if(validTask.is_assigned) {
            throw new BadRequestError('Task is already assigned.', { taskId });
        }
        const [assignment] = await assignTask(validTask.id, user.id);
        return assignment;
    } catch (error) {
        throw error;
    }
}

async function validateTaskAsignability(taskId) {
    const task = await getTaskById(taskId);
    if (!task) {
        throw new BadRequestError('Invalid task.', { taskId });
    }
    if(task.status_id === 3) {
        throw new BadRequestError('Task is already completed.', { taskId });
    }
    return task;
}

export async function unassignTaskService(taskId, userId) {
    try {
        const validTask = await validateTaskAsignability(taskId);
        const user = await getUserByIdService(userId);
        if (!user) {
            throw new BadRequestError('Invalid user.', { userId });
        }
        const taskIsAssigned = await getTaskAssignation(taskId);
        if(!taskIsAssigned) {
            throw new BadRequestError('Task needs to be assigned first.', { taskId });
        }
        const [assignment] = await unassignTask(validTask.id, user.id);
        return assignment;
    } catch (error) {
        throw error;
    }
}

export async function getTasksByUserService(userId) {
    try {
        const user = await getUserByIdService(userId);
        if (!user) {
            throw new BadRequestError('Invalid user.', { userId });
        }
        const tasks = await getTaskByUser(userId);
        if(tasks.length === 0) {
            throw new NotFoundError('User does not have tasks assigned.', { userId });
        }
        return tasks;
    } catch (error) {
        throw error;
    }
}
