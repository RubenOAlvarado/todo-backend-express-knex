import { createAsyncThunk } from '@reduxjs/toolkit';
import { tasksService } from '../../api/services/tasksService';

// Fetch a task by ID
export const fetchTask = createAsyncThunk(
  'tasks/fetchTask',
  async (taskId) => {
    return tasksService.getTask(taskId);
  }
);

// Update a task
export const updateTask = createAsyncThunk(
  'tasks/updateTask',
  async ({ taskId, data }) => {
    return tasksService.updateTask(taskId, data);
  }
);

// Delete a task
export const deleteTask = createAsyncThunk(
  'tasks/deleteTask',
  async (taskId) => {
    return tasksService.deleteTask(taskId);
  }
);

// Change task status
export const changeTaskStatus = createAsyncThunk(
  'tasks/changeTaskStatus',
  async ({ taskId, statusId }) => {
    return tasksService.changeTaskStatus(taskId, statusId);
  }
);

// Assign a task to a user
export const assignTask = createAsyncThunk(
  'tasks/assignTask',
  async ({ taskId, userId }) => {
    return tasksService.assignTask(taskId, userId);
  }
);

// Unassign a task from a user
export const unassignTask = createAsyncThunk(
  'tasks/unassignTask',
  async ({ taskId, userId }) => {
    return tasksService.unassignTaks(taskId, userId);
  }
);