import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export interface Task {
  id: string;
  name: string;
  details?: string; 
  createdAt?: string; 
  updatedAt?: string; 
  deleted?: boolean; 
}

interface TasksState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}

const API_BASE_URL = `http://localhost:3001`;

const initialState: TasksState = {
  tasks: [],
  loading: false,
  error: null,
};

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
  const response = await axios.get<Task[]>(`${API_BASE_URL}/tasks`);
  return response.data;
});

export const addTask = createAsyncThunk<Task, {name: string}>(
  'tasks/addTask',
  async (task: {name: string}) => {
    const response = await axios.post<Task>(`${API_BASE_URL}/tasks`, task);
    return response.data;
  }
);

export const deleteTask = createAsyncThunk<string, string>(
  'tasks/deleteTask',
  async (id: string) => {
    await axios.delete(`${API_BASE_URL}/tasks/${id}`);
    return id;
  }
);

export const updateTaskDetails = createAsyncThunk<Task, { id: string; details: string }>(
  'tasks/updateTaskDetails',
  async ({ id, details }: { id: string; details: string }) => {
    const response = await axios.put<Task>(`${API_BASE_URL}/tasks/${id}`, { details });
    return response.data;
  }
);

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload ?? 'Error fetching tasks';
      })
      .addCase(addTask.fulfilled, (state, action: PayloadAction<Task>) => {
        state.tasks.push(action.payload);
      })
      .addCase(deleteTask.fulfilled, (state, action: PayloadAction<string>) => {
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      })
      .addCase(updateTaskDetails.fulfilled, (state, action: PayloadAction<Task>) => {
        state.tasks = state.tasks.map((task) =>
          task.id === action.payload.id ? { ...task, details: action.payload.details } : task
        );
      });
  },
});

export default tasksSlice.reducer;
