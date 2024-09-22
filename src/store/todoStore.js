import { create } from 'zustand';

const useTodoStore = create((set) => ({
  todos: JSON.parse(localStorage.getItem('todos')) ?? [],

  addTodo: (todo) =>
    set((state) => ({
      todos: [...state.todos, { id: Date.now(), text: todo, completed: false }],
    })),

  removeTodo: (id) =>
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id != id),
    })),

  toggleTodo: (id) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ),
    })),

  updateTodo: (id, text) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, text: text } : todo
      ),
    })),

  clearTodos: () => {
    set(() => ({
      todos: [],
    }));
  },

  saveTodos: (todos) => {
    localStorage.setItem('todos', JSON.stringify(todos));
  },
}));

export default useTodoStore;
