import { configureStore, ThunkAction, Action, getDefaultMiddleware } from '@reduxjs/toolkit';
import tasksReducer from '../features/tasksSlice';

const middleware = [
  ...getDefaultMiddleware({
    serializableCheck: false
  })
]
export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
  middleware
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>
