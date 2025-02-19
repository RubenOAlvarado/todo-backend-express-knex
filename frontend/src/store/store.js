import { configureStore } from '@reduxjs/toolkit';
import organizationsReducer from './slices/organizationsSlice.js';
import projectsReducer from './slices/projectsSlice.js';
import tasksReducer from './slices/tasksSlice.js';
import usersReducer from './slices/usersSlice.js';
import commentsReducer from './slices/commentsSlice.js';


export const store = configureStore({
    reducer: {
        organizations: organizationsReducer,
        projects: projectsReducer,
        tasks: tasksReducer,
        users: usersReducer,
        comments: commentsReducer,
    },
});