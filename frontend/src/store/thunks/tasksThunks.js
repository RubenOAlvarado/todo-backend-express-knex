import { createAsyncThunk } from '@reduxjs/toolkit';
import { tasksService } from '../../api/services/tasksService';
import { removeTaskFromProject, updateTaskInProject } from '../slices/projectsSlice';

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
  async (taskId, { dispatch }) => {
    await tasksService.deleteTask(taskId);
    dispatch(removeTaskFromProject(taskId));
    return taskId;
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
  async ({ taskId, userId }, { dispatch, rejectWithValue }) => {
    try {
      await tasksService.assignTask(taskId, userId);
      const updatedTask = await tasksService.getTask(taskId);
      dispatch(updateTaskInProject(updatedTask));
      return updatedTask;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Unassign a task from a user
export const unassignTask = createAsyncThunk(
  'tasks/unassignTask',
  async (taskId, { dispatch, rejectWithValue }) => {
    try {
      await tasksService.unassignTask(taskId);
      const updatedTask = await tasksService.getTask(taskId);
      dispatch(updateTaskInProject(updatedTask));
      return updatedTask;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);