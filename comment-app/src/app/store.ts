import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import commentContainerReducer from "../Components/CommentContainer/commentContainerSlice"
import commentReducer from "../Components/Comment/commentSlice";
import answerReducer from "../Components/Answer/answerSlice";

export const store = configureStore({
  reducer: {
    comment: commentReducer,
    answer: answerReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
