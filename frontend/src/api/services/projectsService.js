import apiClient from "../apiClient";

export const projectsService = {
    async getProject(projectId) {
        const response = await apiClient.get(`/projects/${projectId}`);
        return response.data;
    },
    async updateProject(projectId, data) {
        const response = await apiClient.put(`/projects/${projectId}`, data);
        return response.data;
    },
    async deleteProject(projectId) {
        const response = await apiClient.delete(`/projects/${projectId}`);
        return response.data;
    },
    async createProjectTask(projectId, data) {
        const response = await apiClient.post(`/projects/${projectId}/tasks`, data);
        return response.data;
    },
    async getProjectTasks(projectId) {
        const response = await apiClient.get(`/projects/${projectId}/tasks`);
        return response.data;
    },
};