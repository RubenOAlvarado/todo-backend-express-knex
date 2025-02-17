import { createSlice } from "@reduxjs/toolkit";
import { createOrganization, createOrganizationProject, createOrganizationUser, deleteOrganization, fetchOrganization, fetchOrganizations, getOrganizationProjects, getOrganizationUsers, updateOrganization } from "../thunks/organizationsThunks";

const organizationsSlice = createSlice({
  name: 'organizations',
  initialState: {
    organizations: [],
    organization: null,
    projects: [],
    users: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    clearOrganization(state) {
      state.organization = null;
    },
    clearProjects(state) {
      state.projects = [];
    },
    clearUsers(state) {
      state.users = [];
    },
    resetState(state) {
      state.organizations = [];
      state.organization = null;
      state.projects = [];
      state.users = [];
      state.status = 'idle';
      state.error = null;
    },
    removeProjectFromOrganization(state, action) {
      state.projects = state.projects.filter(project => project.id !== action.payload);
    },
    removeUserFromOrganization(state, action) {
      state.users = state.users.filter(user => user.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Organizations
      .addCase(fetchOrganizations.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchOrganizations.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.organizations = action.payload;
      })
      .addCase(fetchOrganizations.rejected, (state, action) => {
        if(Array.isArray(action.payload)) {
          state.status = 'succeeded';
          state.organizations = action.payload;
        } else {
          state.status = 'failed';
          state.error = action.error.message;
        }
      })

      // Fetch Single Organization
      .addCase(fetchOrganization.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchOrganization.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.organization = action.payload;
      })
      .addCase(fetchOrganization.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      // Create Organization
      .addCase(createOrganization.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createOrganization.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.organizations.push(action.payload);
      })
      .addCase(createOrganization.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      // Update Organization
      .addCase(updateOrganization.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateOrganization.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const { id, ...data } = action.payload;
        state.organizations = state.organizations.map(org =>
          org.id === id ? { ...org, ...data } : org
        );
      })
      .addCase(updateOrganization.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      // Delete Organization
      .addCase(deleteOrganization.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteOrganization.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.organizations = state.organizations.filter(org => org.id !== action.payload);
      })
      .addCase(deleteOrganization.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      // Create Organization Project
      .addCase(createOrganizationProject.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createOrganizationProject.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.projects.push(action.payload);
      })
      .addCase(createOrganizationProject.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      // Fetch Organization Projects
      .addCase(getOrganizationProjects.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getOrganizationProjects.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.projects = action.payload;
      })
      .addCase(getOrganizationProjects.rejected, (state, action) => {
        if(Array.isArray(action.payload)) {
          state.status = 'succeeded';
          state.projects = action.payload;
        } else {
          state.status = 'failed';
          state.error = action.error.message;
        }
      })

      // Create Organization User
      .addCase(createOrganizationUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(createOrganizationUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users.push(action.payload);
      })
      .addCase(createOrganizationUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      // Fetch Organization Users
      .addCase(getOrganizationUsers.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getOrganizationUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload;
      })
      .addCase(getOrganizationUsers.rejected, (state, action) => {
        if(Array.isArray(action.payload)) {
          state.status = 'succeeded';
          state.users = action.payload;
        } else {
          state.status = 'failed';
          state.error = action.error.message;
        }
      });
  },
});

export const { 
  clearOrganization, 
  clearProjects, 
  clearUsers, 
  resetState, 
  removeProjectFromOrganization,
  removeUserFromOrganization, 
} = organizationsSlice.actions;
export default organizationsSlice.reducer;