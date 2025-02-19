import apiClient from "../apiClient";


export const commentsService = {
    async fetchComments(taskId) {
        const response = await apiClient.get(`/tasks/${taskId}/comments`);
        return response.data;
    },
    async createComment(taskId, data) {
        const response = await apiClient.post(`/tasks/${taskId}/comments`, data);
        return response.data;
    },
    async deleteComment(commentId) {
        const response = await apiClient.delete(`/comments/${commentId}`);
        return response.data;
    },
    async updateComment(commentId, data) {
        const response = await apiClient.put(`/comments/${commentId}`, data);
        return response.data;
    },
};

