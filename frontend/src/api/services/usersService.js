import apiClient from "../apiClient";

export const usersService = {
    async getUser(userId) {
        const response = await apiClient.get(`/users/${userId}`);
        return response.data;
    },
    async updateUser(userId, data) {
        const response = await apiClient.put(`/users/${userId}`, data);
        return response.data;
    },
    async deleteUser(userId) {
        const response = await apiClient.delete(`/users/${userId}`);
        return response.data;
    },
    async getUserTasks(userId) {
        const response = await apiClient.get(`/users/${userId}/tasks`);
        return response.data;
    },
};