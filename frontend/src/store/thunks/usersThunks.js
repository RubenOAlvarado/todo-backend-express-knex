import { createAsyncThunk } from '@reduxjs/toolkit';
import { usersService } from '../../api/services/usersService';
import { removeUserFromOrganization } from '../slices/organizationsSlice';

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
  async (userId, { dispatch }) => {
    await usersService.deleteUser(userId);
    dispatch(removeUserFromOrganization(userId));
    return userId;
  }
);

// Fetch tasks assigned to a user
export const fetchUserTasks = createAsyncThunk(
  'users/fetchUserTasks',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await usersService.getUserTasks(userId);
      return response;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        return rejectWithValue([]);
      }
      return rejectWithValue(error.response.data);
    }
  }
);