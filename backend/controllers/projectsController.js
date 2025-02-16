import { createProjectService, deleteProjectService, getProjectByIdService, getProjectsService, updateProjectService } from "../services/projectsService.js";

export const createProjectController = async (req, res) => {
    try {
        const { id } = req.params;
        const project = await createProjectService({ ...req.body, organization_id: id });
        res.status(201).json(project);
    } catch (error) {
        res.status(error.statusCode).json({ message: error.message, context: error.context });
    }
};

export const getProjectsController = async (req, res) => {
    try {
        const projects = await getProjectsService(req.params.id);
        res.status(200).json(projects);
    } catch (error) {
        res.status(error.statusCode).json({ message: error.message, context: error.context });
    }
};

export const getProjectByIdController = async (req, res) => {
    try {
        const project = await getProjectByIdService(req.params.id);
        res.status(200).json(project);
    } catch (error) {
        res.status(error.statusCode).json({ message: error.message, context: error.context });
    }
};

export const updateProjectController = async (req, res) => {
    try {
        const project = await updateProjectService(req.params.id, req.body);
        res.status(200).json(project);
    } catch (error) {
        res.status(error.statusCode).json({ message: error.message, context: error.context });
    }
};

export const deleteProjectController = async (req, res) => {
    try {
        const project = await deleteProjectService(req.params.id);
        res.status(200).json(project);
    } catch (error) {
        res.status(error.statusCode).json({ message: error.message, context: error.context });
    }
};
