import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store';

export interface AnswerData {
    id: number,
    author: string,
    text: string,
    likes: number,
    parent: number
}

export interface AnswerState {
    answers: Array<AnswerData>
}

const initialState: AnswerState = {
    answers: [] as AnswerData[]
};

export const answerSlice = createSlice({
    name: "answer",
    initialState,
    reducers: {
        addLike: (state: AnswerState, action: PayloadAction<number>) => {
            (state.answers.find((element) => element.id === action.payload) as AnswerData).likes += 1;
        },
        addAnswer: (state: AnswerState, action: PayloadAction<AnswerData>) => {
            state.answers.push(action.payload);
        }
    }
});

export const { addLike, addAnswer } = answerSlice.actions;

export const selectAnswersByParent = (state: RootState, parent: number) => {
    return state.answer.answers.filter((answer: AnswerData) => answer.parent === parent);
}

export const selectAnswerById = (state: RootState, id: number) => {
    return state.answer.answers.find((answer: AnswerData) => answer.id === id);
}

export default answerSlice.reducer