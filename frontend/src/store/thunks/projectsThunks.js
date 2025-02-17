import { createAsyncThunk } from '@reduxjs/toolkit';
import { projectsService } from '../../api/services/projectsService';

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
  async (projectId) => {
    return projectsService.deleteProject(projectId);
  }
);

// Create a task for a project
export const createProjectTask = createAsyncThunk(
  'projects/createProjectTask',
  async ({ projectId, data }) => {
    return projectsService.createProjectTask(projectId, data);
  }
);

// Fetch tasks for a project
export const fetchProjectTasks = createAsyncThunk(
  'projects/fetchProjectTasks',
  async (projectId) => {
    return projectsService.getProjectTasks(projectId);
  }
);