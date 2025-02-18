import apiClient from "../apiClient";

export const tasksService = {
    async getTask(taskId) {
        const response = await apiClient.get(`/tasks/${taskId}`);
        return response.data;
    },
    async updateTask(taskId, data) {
        const response = await apiClient.put(`/tasks/${taskId}`, data);
        return response.data;
    },
    async deleteTask(taskId) {
        const response = await apiClient.delete(`/tasks/${taskId}`);
        return response.data;
    },
    async changeTaskStatus(taskId, statusId) {
        const response = await apiClient.patch(`/tasks/${taskId}/status`, { statusId });
        return response.data;
    },
    async assignTask(taskId, userId) {
        const response = await apiClient.post(`/tasks/${taskId}/assign`, { userId });
        return response.data;
    },
    async unassignTask(taskId) {
        await apiClient.delete(`/tasks/${taskId}/assign`);
    }
};