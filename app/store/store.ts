
import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './taskslice';
import tripsReducer from './tripslice'; 

const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    trips: tripsReducer, 
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
