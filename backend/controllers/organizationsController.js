import { createOrganizationService, deleteOrganizationService, getOrganizationByIdService, getOrganizationsService, updateOrganizationService } from "../services/organizationsService.js";

export const createOrganization = async(req, res) => {
    try {
        const organization = await createOrganizationService(req.body);
        res.status(201).json(organization);
    } catch (error) {
        res.status(500).send(error);
    }
}

export const getOrganizations = async(req, res) => {
    try {
        const organizations = await getOrganizationsService();
        res.status(200).json(organizations);
    } catch (error) {
        res.status(500).send(error);
    }
}

export const getOrganization= async(req, res) => {
    try {
        const organization = await getOrganizationByIdService(req.params.id);
        res.status(200).json(organization);
    } catch (error) {
        res.status(500).send(error);
    }
}

export const updateOrganization = async (req, res) => {
    try {
        const organization = await updateOrganizationService(req.params.id, req.body);
        res.status(200).json(organization);
    } catch (error) {
        res.status(500).send(error);
    }
}

export const deleteOrganization= async (req, res) => {
    try {
        const organization = await deleteOrganizationService(req.params.id);
        res.status(200).json(organization);
    } catch (error) {
        res.status(500).send(error);
    }
}