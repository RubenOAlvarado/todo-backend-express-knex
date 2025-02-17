import apiClient from "../apiClient";

export const organizationsService = {
    async getAll() {
        const response = await apiClient.get("/organizations");
        return response.data;
    },
    async get(id) {
        const response = await apiClient.get(`/organizations/${id}`);
        return response.data;
    },
    async create(data) {
        const response = await apiClient.post("/organizations", data);
        return response.data;
    },
    async update(id, data) {
        const response = await apiClient.put(`/organizations/${id}`, data);
        return response.data;
    },
    async delete(id) {
        const response = await apiClient.delete(`/organizations/${id}`);
        return response.data;
    },
    async createOrganizationProject(organizationId, data) {
        console.log({ organizationId, data });
        const response = await apiClient.post(`/organizations/${organizationId}/projects`, data);
        return response.data;
    },
    async getOrganizationProjects(organizationId) {
        const response = await apiClient.get(`/organizations/${organizationId}/projects`);
        return response.data;
    },
    async createOrganizationUser(organizationId, data) {
        const response = await apiClient.post(`/organizations/${organizationId}/users`, data);
        return response.data;
    },
    async getOrganizationUsers(organizationId) {
        const response = await apiClient.get(`/organizations/${organizationId}/users`);
        return response.data;
    },
};