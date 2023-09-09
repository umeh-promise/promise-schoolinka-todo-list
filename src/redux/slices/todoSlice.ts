import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import todosData from '../../data/todos.json';
import Notification from '../../components/Notification';

export interface Todo {
  updatedAt: string | Date;
  id: number;
  title: string;
  todoDate: string;
  completed: boolean;
  time: {
    startTime: string;
    endTime: string;
  };
}

export interface TodoState {
  todos: Todo[];
  todo: Todo | null;
}

const initialState: TodoState = {
  todos: [...todosData],
  todo: null,
};

const showNotification = Notification();

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<TodoState>) => {
      const { todo } = action.payload;

      if (todo) state.todos = [todo, ...state.todos];

      showNotification({
        title: 'Success',
        body: 'Task added successfully!',
        duration: 3000,
        type: 'success',
      });
    },

    updateTodo: (state, action: PayloadAction<TodoState>) => {
      const { todo } = action.payload;
      const todos = state.todos.find((currTodo) => currTodo.id === todo?.id);

      if (todos) {
        todos.title = action.payload.todo?.title as string;
        todos.todoDate = action.payload.todo?.todoDate as string;
        todos.time.startTime = action.payload.todo?.time.startTime as string;
        todos.time.endTime = action.payload.todo?.time.endTime as string;
        todos.completed = action.payload.todo?.completed as boolean;
      }

      showNotification({
        title: 'Success',
        body: 'Task updated successfully!',
        duration: 3000,
        type: 'success',
      });
    },

    deleteTodo: (state, action: PayloadAction<{ id: number }>) => {
      const { id } = action.payload;
      state.todos = state.todos.filter((todo) => todo.id !== id);

      showNotification({
        title: 'Success',
        body: 'Task deleted successfully!',
        duration: 3000,
        type: 'success',
      });
    },

    getTodo: (state, action: PayloadAction<{ id: number }>) => {
      const { id } = action.payload;
      state.todo = state.todos.find((todo) => todo.id === id) as Todo;
    },
  },
});

export const { addTodo, getTodo, deleteTodo, updateTodo } = todoSlice.actions;

export default todoSlice.reducer;
