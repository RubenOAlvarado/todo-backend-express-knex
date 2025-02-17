import { createSlice } from '@reduxjs/toolkit';
import { deleteUser, fetchUser, fetchUserTasks, updateUser } from '../thunks/usersThunks';

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    user: null,         // Currently selected user
    tasks: [],          // Tasks assigned to the user
    status: 'idle',     // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,        // Error message if any
  },
  reducers: {
    clearUser(state) {
      state.user = null;
    },
    clearUserTasks(state) {
      state.tasks = [];
    },
    resetState(state) {
      state.user = null;
      state.tasks = [];
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch User
      .addCase(fetchUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      // Update User
      .addCase(updateUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      // Delete User
      .addCase(deleteUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteUser.fulfilled, (state) => {
        state.status = 'succeeded';
        state.user = null;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      // Fetch User Tasks
      .addCase(fetchUserTasks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserTasks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tasks = action.payload;
      })
      .addCase(fetchUserTasks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { clearUser, clearUserTasks, resetState } = usersSlice.actions;
export default usersSlice.reducer;