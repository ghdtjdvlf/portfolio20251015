// API layer - would typically connect to backend
export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
}

// Simulated API calls
export const todosApi = {
  fetchTodos: async (): Promise<Todo[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const stored = localStorage.getItem('todos');
    return stored ? JSON.parse(stored) : [];
  },

  addTodo: async (title: string): Promise<Todo> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const newTodo: Todo = {
      id: Date.now().toString(),
      title,
      completed: false,
      createdAt: new Date(),
    };

    const stored = localStorage.getItem('todos');
    const todos = stored ? JSON.parse(stored) : [];
    todos.push(newTodo);
    localStorage.setItem('todos', JSON.stringify(todos));

    return newTodo;
  },

  toggleTodo: async (id: string): Promise<Todo> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const stored = localStorage.getItem('todos');
    const todos: Todo[] = stored ? JSON.parse(stored) : [];
    const todo = todos.find(t => t.id === id);

    if (todo) {
      todo.completed = !todo.completed;
      localStorage.setItem('todos', JSON.stringify(todos));
    }

    return todo!;
  },

  deleteTodo: async (id: string): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const stored = localStorage.getItem('todos');
    const todos: Todo[] = stored ? JSON.parse(stored) : [];
    const filtered = todos.filter(t => t.id !== id);
    localStorage.setItem('todos', JSON.stringify(filtered));
  }
};
