import { createSlice } from "@reduxjs/toolkit";
import { createComment, deleteComment, fetchCommentsByTaskId, updateComment } from "../thunks/commentsThunks";

const commentsSlice = createSlice({
  name: 'comments',
  initialState: {
    comments: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
},
  reducers: {
    clearComments(state) {
      state.comments = [];
    },
    updateCommentsAfterDelete(state, action) {
      const commentId = action.payload;
      state.comments = state.comments.filter((comment) => comment.id !== commentId);
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Comments
      .addCase(fetchCommentsByTaskId.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCommentsByTaskId.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.comments = action.payload;
      })
      .addCase(fetchCommentsByTaskId.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // Add Comment
      .addCase(createComment.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.comments.push(action.payload);
      })
      .addCase(createComment.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // Edit Comment
      .addCase(updateComment.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateComment.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.comments.findIndex(
          (comment) => comment.id === action.payload.id
        );
        if (index !== -1) {
          state.comments[index] = action.payload;
        }
      })
      .addCase(updateComment.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // Delete Comment
      .addCase(deleteComment.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.comments = state.comments.filter(
          (comment) => comment.id !== action.payload
        );
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
  },
});

export const { clearComments } = commentsSlice.actions;
export default commentsSlice.reducer;