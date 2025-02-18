import { createSlice } from '@reduxjs/toolkit';
import { assignTask, changeTaskStatus, deleteTask, fetchTask, unassignTask, updateTask } from '../thunks/tasksThunks';

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    task: null,       // Currently selected task
    status: 'idle',   // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,      // Error message if any
  },
  reducers: {
    clearTask(state) {
      state.task = null;
    },
    resetState(state) {
      state.task = null;
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Task
      .addCase(fetchTask.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTask.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.task = action.payload;
      })
      .addCase(fetchTask.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      // Update Task
      .addCase(updateTask.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.task = action.payload;
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      // Delete Task
      .addCase(deleteTask.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteTask.fulfilled, (state) => {
        state.status = 'succeeded';
        state.task = null;
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      // Change Task Status
      .addCase(changeTaskStatus.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(changeTaskStatus.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.task = action.payload;
      })
      .addCase(changeTaskStatus.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      // Assign Task
      .addCase(assignTask.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(assignTask.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.task = action.payload;
      })
      .addCase(assignTask.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      // Unassign Task
      .addCase(unassignTask.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(unassignTask.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(unassignTask.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { clearTask, resetState } = tasksSlice.actions;
export default tasksSlice.reducer;