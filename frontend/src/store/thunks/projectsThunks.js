import { createAsyncThunk } from '@reduxjs/toolkit';
import { projectsService } from '../../api/services/projectsService';
import { removeProjectFromOrganization } from '../slices/organizationsSlice';

// Fetch a project by ID
export const fetchProject = createAsyncThunk(
  'projects/fetchProject',
  async (projectId) => {
    return projectsService.getProject(projectId);
  }
);

// Update a project
export const updateProject = createAsyncThunk(
  'projects/updateProject',
  async ({ projectId, data }) => {
    return projectsService.updateProject(projectId, data);
  }
);

// Delete a project
export const deleteProject = createAsyncThunk(
  'projects/deleteProject',
  async (projectId, { dispatch }) => {
    await projectsService.deleteProject(projectId);
    dispatch(removeProjectFromOrganization(projectId));
    return projectId;
  }
);

// Create a task for a project
export const createProjectTask = createAsyncThunk(
  'projects/createProjectTask',
  async ({ projectId, title, description, createdBy }) => {
    return projectsService.createProjectTask(projectId, { title, description, createdBy });
  }
);

// Fetch tasks for a project
export const fetchProjectTasks = createAsyncThunk(
  'projects/fetchProjectTasks',
  async (projectId, { rejectWithValue }) => {
    try {
      const response = await projectsService.getProjectTasks(projectId);
      return response;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        return rejectWithValue([]);
      }
      return rejectWithValue(error.response.data);
    }
  }
);