import { createProject, getProjectById, getProjects, updateProject, deleteProject } from "../database/projects/queries.js";
import { getOrganizationByIdService } from "./organizationsService.js";
import BadRequestError from "../shared/httpErrors/BadRequestError.js";
import NotFoundError from "../shared/httpErrors/NotFoundError.js";

export async function createProjectService(data) {
    try {
        const organizationId = data.organization_id;
        const [organization] = await getOrganizationByIdService(organizationId);
        if (!organization) {
            throw new BadRequestError('Invalid organization.', { organizationId });
        }
        return await createProject(data);
    } catch (error) {
        throw error;
    }
}

export async function getProjectsService(organizationId) {
    try {
        const validOrganization = await getOrganizationByIdService(organizationId);
        if (!validOrganization) {
            throw new BadRequestError('Invalid organization.', { organizationId });
        }
        const projects = await getProjects(organizationId);
        if (projects.length === 0) {
            throw new NotFoundError('Organization does not have projects yet.', { organizationId });
        }
        return projects;
    } catch (error) {
        throw error;
    }
}

export async function getProjectByIdService(id) {
    try {
        const project = await getProjectById(id);
        if (!project) {
            throw new NotFoundError('Project not found.', { id });
        }
        return project;
    } catch (error) {
        throw error;
    }
}

export async function updateProjectService(id, data) {
    try {
        const validProject = await getProjectByIdService(id);
        const updatedProject = await updateProject(validProject.id, data);
        return updatedProject;
    } catch (error) {
        throw error;
    }
}

export async function deleteProjectService(id) {
    try {
        const validProject = await getProjectByIdService(id);
        const deletedProject = await deleteProject(validProject.id);
        return deletedProject;
    } catch (error) {
        throw error;
    }
}
