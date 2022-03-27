import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import { RootState, store } from "../../app/store"

import { Comment } from "../Comment/Comment";
import { CommentState, CommentData } from "../Comment/commentSlice";

export const commentContainerSlice = createSlice({
    name: 'commentContainer',
    initialState: {},
    reducers: {}
});

export const { } = commentContainerSlice.actions;

export default commentContainerSlice.reducer;