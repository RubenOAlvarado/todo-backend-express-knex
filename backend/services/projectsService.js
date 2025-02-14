import { createProject, getProjectById, getProjects, updateProject, deleteProject } from "../database/projects/queries.js";
import { getOrganizationByIdService } from "./organizationsService.js";
import BadRequestError from "../shared/httpErrors/BadRequestError.js";
import NotFoundError from "../shared/httpErrors/NotFoundError.js";

export async function createProjectService(data) {
    try {
        const organizationId = data.organizationId;
        const organization = await getOrganizationByIdService(organizationId);
        if (!organization) {
            throw new BadRequestError('Organization not found');
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
            throw new BadRequestError('Organization not found');
        }
        const projects = await getProjects(organizationId);
        if (projects.length === 0) {
            throw new NotFoundError('No projects found');
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
            throw new NotFoundError('Project not found');
        }
        return project;
    } catch (error) {
        throw error;
    }
}

export async function updateProjectService(id, data) {
    try {
        const validProject = await getProjectById(id);
        if (!validProject) {
            throw new BadRequestError('Project not found');
        }
        const updatedProject = await updateProject(validProject.id, data);
        return updatedProject;
    } catch (error) {
        throw error;
    }
}

export async function deleteProjectService(id) {
    try {
        const validProject = await getProjectById(id);
        if (!validProject) {
            throw new BadRequestError('Project not found');
        }
        const deletedProject = await deleteProject(id);
        return deletedProject;
    } catch (error) {
        throw error;
    }
}
