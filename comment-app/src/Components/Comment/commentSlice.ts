import { createSlice, Dictionary, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store';

import { AnswerState } from '../Answer/answerSlice'
// import { initialState, CommentContainerState } from "../CommentContainer/commentContainerSlice";

export interface CommentData {
    id: number,
    author: string,
    text: string,
    likes: number,
    answers: Array<AnswerState>
}


export interface CommentState {
    comments: Array<CommentData>
}


const initialState: CommentState = {
    comments: []
};


export const commentSlice = createSlice({
    name: "comment",
    initialState,
    reducers: {
        addLike: (state: CommentState, action: PayloadAction<number>) => {
            (state.comments.find((element) => element.id === action.payload) as CommentData).likes += 1;
        },
        addComment: (state: CommentState, action: PayloadAction<CommentData>) => {
            state.comments.push(action.payload);
        }
    },
});

export const { addLike, addComment} = commentSlice.actions;

export const selectCommentById = (state: RootState, id: number) => {
    return state.comment.comments.find((comment) => comment.id === id);
}

export const selectComments = (state: RootState) => {
    return state.comment.comments;
}

export default commentSlice.reducer;