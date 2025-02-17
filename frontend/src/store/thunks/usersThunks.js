import { createAsyncThunk } from '@reduxjs/toolkit';
import { usersService } from '../../api/services/usersService';

// Fetch a user by ID
export const fetchUser = createAsyncThunk(
  'users/fetchUser',
  async (userId) => {
    return usersService.getUser(userId);
  }
);

// Update a user
export const updateUser = createAsyncThunk(
  'users/updateUser',
  async ({ userId, data }) => {
    return usersService.updateUser(userId, data);
  }
);

// Delete a user
export const deleteUser = createAsyncThunk(
  'users/deleteUser',
  async (userId) => {
    return usersService.deleteUser(userId);
  }
);

// Fetch tasks assigned to a user
export const fetchUserTasks = createAsyncThunk(
  'users/fetchUserTasks',
  async (userId) => {
    return usersService.getUserTasks(userId);
  }
);