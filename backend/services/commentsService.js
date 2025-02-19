import { createTaskComment, deleteTaskComment, getTaskCommentById, getTaskComments, updateTaskComment } from "../database/comments/query.js";
import NotFoundError from "../shared/httpErrors/NotFoundError.js";
import { getTaskByIdService } from "./tasksService.js";

export const CreateTaskCommentService = async (taskId, content) => {
    try {
        const validTask = await getTaskByIdService(taskId);
        const [comment] = await createTaskComment(validTask.id, content);
        return comment;
    } catch (error) {
        throw error;
    }
};

export const GetTaskCommentsService = async (taskId) => {
    try {
        const validTask = await getTaskByIdService(taskId);
        const comments = await getTaskComments(validTask.id);
        if(!comments.length) {
            throw new NotFoundError('Comments not found.', { taskId });
        }
        return comments;
    } catch (error) {
        throw error;
    }
}

export const UpdateTaskCommentService = async (id, data) => {
    try {
        const validComment = await GetTaskCommentByIdService(id);
        const [comment] = await updateTaskComment(validComment.id, data);
        return comment;
    } catch (error) {
        throw error;
    }
}

export const DeleteTaskCommentService = async (id) => {
    try {
        const validComment = await GetTaskCommentByIdService(id);
        const [comment] = await deleteTaskComment(validComment.id);
        return comment;
    } catch (error) {
        throw error;
    }
}

export const GetTaskCommentByIdService = async (id) => {
    try {
        const comment = await getTaskCommentById(id);
        if(!comment) {
            throw new NotFoundError('Comment not found.', { id });
        }
        return comment;
    } catch (error) {
        throw error;
    }
}