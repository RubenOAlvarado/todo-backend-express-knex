import { createAsyncThunk } from '@reduxjs/toolkit';
import { commentsService } from "../../api/services/commentsService";

export const fetchCommentsByTaskId = createAsyncThunk(
    'comments/fetchCommentsByTaskId',
    async (taskId, { rejectWithValue }) => {
        try {
            const response = await commentsService.fetchComments(taskId);
            return response;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const createComment = createAsyncThunk(
    'comments/createComment',
    async ({taskId, content}, { rejectWithValue }) => {
        try {
            const response = await commentsService.createComment(taskId, { content });
            return response;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const deleteComment = createAsyncThunk(
    'comments/deleteComment',
    async (commentId, { rejectWithValue }) => {
        try {
            const response = await commentsService.deleteComment(commentId);
            return response.id;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const updateComment = createAsyncThunk(
    'comments/updateComment',
    async ({ commentId, data }, { rejectWithValue }) => {
        try {
            const response = await commentsService.updateComment(commentId, data);
            return response;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);