import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import studentsSlice from '../features/students/studentsSlice';

export const store = configureStore({
  reducer: {
    students:studentsSlice,
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
