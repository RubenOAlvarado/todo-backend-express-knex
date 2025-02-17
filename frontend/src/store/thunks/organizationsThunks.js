import { createAsyncThunk } from '@reduxjs/toolkit';
import { organizationsService } from '../../api/services/organizationsService';

// Fetch all organizations
export const fetchOrganizations = createAsyncThunk(
  'organizations/fetchOrganizations',
  async (_, { rejectWithValue }) => {
    try {
      const response = organizationsService.getAll();
      return response;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        return rejectWithValue([]);
      }
      return rejectWithValue(error.response.data);
    }
  }
);

// Fetch a single organization by ID
export const fetchOrganization = createAsyncThunk(
  'organizations/fetchOrganization',
  async (id, { rejectWithValue }) => {
    try {
      const response = organizationsService.get(id);
      return response;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        return rejectWithValue(null);
      }
      return rejectWithValue(error.response.data);
    }
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
    await organizationsService.delete(id);
    return id;
  }
);

// Create a project for an organization
export const createOrganizationProject = createAsyncThunk(
  'organizations/createOrganizationProject',
  async ({ organizationId, name }) => {
    console.log({ organizationId, name });
    return organizationsService.createOrganizationProject(organizationId, { name });
  }
);

// Fetch projects for an organization
export const getOrganizationProjects = createAsyncThunk(
  'organizations/getOrganizationProjects',
  async (organizationId, { rejectWithValue }) => {
    try {
      const response = await organizationsService.getOrganizationProjects(organizationId);
      return response;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        return rejectWithValue([]);
      }
      return rejectWithValue(error.response.data);
    }
  }
);

// Add a user to an organization
export const createOrganizationUser = createAsyncThunk(
  'organizations/createOrganizationUser',
  async ({ organizationId, email, password, role }) => {
    return organizationsService.createOrganizationUser(organizationId, { email, password, role });
  }
);

// Fetch users in an organization
export const getOrganizationUsers = createAsyncThunk(
  'organizations/getOrganizationUsers',
  async (organizationId, { rejectWithValue }) => {
    try {
      const response = await organizationsService.getOrganizationUsers(organizationId);
      return response;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        return rejectWithValue([]);
      }
      return rejectWithValue(error.response.data);
    }
  }
);