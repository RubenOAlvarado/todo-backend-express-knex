import { createAsyncThunk } from '@reduxjs/toolkit';
import { organizationsService } from '../../api/services/organizationsService';

// Fetch all organizations
export const fetchOrganizations = createAsyncThunk(
  'organizations/fetchOrganizations',
  async () => {
    return organizationsService.getAll();
  }
);

// Fetch a single organization by ID
export const fetchOrganization = createAsyncThunk(
  'organizations/fetchOrganization',
  async (id) => {
    return organizationsService.get(id);
  }
);

// Create a new organization
export const createOrganization = createAsyncThunk(
  'organizations/createOrganization',
  async (data) => {
    return organizationsService.create(data);
  }
);

// Update an organization
export const updateOrganization = createAsyncThunk(
  'organizations/updateOrganization',
  async ({ id, data }) => {
    return organizationsService.update(id, data);
  }
);

// Delete an organization
export const deleteOrganization = createAsyncThunk(
  'organizations/deleteOrganization',
  async (id) => {
    return organizationsService.delete(id);
  }
);

// Create a project for an organization
export const createOrganizationProject = createAsyncThunk(
  'organizations/createOrganizationProject',
  async ({ organizationId, name }) => {
    return organizationsService.createOrganizationProject(organizationId, { name });
  }
);

// Fetch projects for an organization
export const getOrganizationProjects = createAsyncThunk(
  'organizations/getOrganizationProjects',
  async (organizationId) => {
    return organizationsService.getOrganizationProjects(organizationId);
  }
);

// Add a user to an organization
export const createOrganizationUser = createAsyncThunk(
  'organizations/createOrganizationUser',
  async ({ organizationId, data }) => {
    return organizationsService.createOrganizationUser(organizationId, data);
  }
);

// Fetch users in an organization
export const getOrganizationUsers = createAsyncThunk(
  'organizations/getOrganizationUsers',
  async (organizationId) => {
    return organizationsService.getOrganizationUsers(organizationId);
  }
);