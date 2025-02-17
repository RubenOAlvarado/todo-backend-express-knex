import { createOrganization, getOrganizationById, getOrganizations, updateOrganization, deleteOrganization } from "../database/organizations/queries.js";
import NotFoundError from "../shared/httpErrors/NotFoundError.js";

export const createOrganizationService = async (data) => {
    try {
        const [org] = await createOrganization(data);
        return org;
    } catch (error) {
        throw error;
    }
};

export const getOrganizationsService = async () => {
    try {
        const organizations = await getOrganizations();
        if (organizations.length === 0) {
            throw new NotFoundError('No organizations found.');
        }
        return organizations;
    } catch (error) {
        throw error;
    }
};

export const getOrganizationByIdService = async (id) => {
    try {
        const organization = await getOrganizationById(id);
        if (!organization) {
            throw new NotFoundError('Organization not found.', { id }, false);
        }
        return organization;
    } catch (error) {
        throw error;
    }
};

export const updateOrganizationService = async (id, data) => {
    try {
        const validOrganization = await getOrganizationByIdService(id);
        const [updatedOrganization] = await updateOrganization(validOrganization.id, data);
        return updatedOrganization;
    } catch (error) {
        throw error;
    }
};

export const deleteOrganizationService = async (id) => {
    try {
        const validOrganization = await getOrganizationByIdService(id);
        const [deletedOrganization] = await deleteOrganization(validOrganization.id);
        return deletedOrganization;
    } catch (error) {
        throw error;
    }
};
