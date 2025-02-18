import { createSlice } from '@reduxjs/toolkit';
import { createProjectTask, deleteProject, fetchProject, fetchProjectTasks, updateProject } from '../thunks/projectsThunks';

const projectsSlice = createSlice({
  name: 'projects',
  initialState: {
    project: null,       // Currently selected project
    tasks: [],           // Tasks for the selected project
    status: 'idle',      // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,         // Error message if any
  },
  reducers: {
    clearProject(state) {
      state.project = null;
    },
    clearTasks(state) {
      state.tasks = [];
    },
    resetState(state) {
      state.project = null;
      state.tasks = [];
      state.status = 'idle';
      state.error = null;
    },
    removeTaskFromProject(state, action) {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    updateTaskInProject(state, action) {
      const updatedTask = action.payload;
      const index = state.tasks.findIndex((task) => task.id === updatedTask.id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Project
      .addCase(fetchProject.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProject.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.project = action.payload;
      })
      .addCase(fetchProject.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      // Update Project
      .addCase(updateProject.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.project = action.payload;
      })
      .addCase(updateProject.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      // Delete Project
      .addCase(deleteProject.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteProject.fulfilled, (state) => {
        state.status = 'succeeded';
        state.project = null;
      })
      .addCase(deleteProject.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      // Create Project Task
      .addCase(createProjectTask.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createProjectTask.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tasks.push(action.payload);
      })
      .addCase(createProjectTask.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      // Fetch Project Tasks
      .addCase(fetchProjectTasks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProjectTasks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tasks = action.payload;
      })
      .addCase(fetchProjectTasks.rejected, (state, action) => {
        if(Array.isArray(action.payload)) {
          state.status = 'succeeded';
          state.tasks = action.payload;
        } else {
          state.status = 'failed';
          state.error = action.error.message;
        }
      });
  },
});

export const { 
  clearProject, 
  clearTasks, 
  resetState, 
  removeTaskFromProject, 
  updateTaskInProject
} = projectsSlice.actions;
export default projectsSlice.reducer;