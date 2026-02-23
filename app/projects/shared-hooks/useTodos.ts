// TanStack Query - Server state management
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { todosApi, Todo } from '../shared-api/todos';

export const useTodos = () => {
  const queryClient = useQueryClient();

  // Fetch todos
  const { data: todos = [], isLoading, error } = useQuery<Todo[], Error>({
    queryKey: ['todos'],
    queryFn: todosApi.fetchTodos,
  });

  // Add todo mutation
  const addTodoMutation = useMutation<Todo, Error, string>({
    mutationFn: todosApi.addTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  // Toggle todo mutation
  const toggleTodoMutation = useMutation<Todo, Error, string, { previousTodos: Todo[] | undefined }>({
    mutationFn: todosApi.toggleTodo,
    onMutate: async (id: string) => {
      // Optimistic update
      await queryClient.cancelQueries({ queryKey: ['todos'] });
      const previousTodos = queryClient.getQueryData<Todo[]>(['todos']);

      queryClient.setQueryData<Todo[]>(['todos'], (old = []) =>
        old.map(todo =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
      );

      return { previousTodos };
    },
    onError: (err, id, context) => {
      queryClient.setQueryData(['todos'], context?.previousTodos);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  // Delete todo mutation
  const deleteTodoMutation = useMutation<void, Error, string>({
    mutationFn: todosApi.deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  return {
    todos,
    isLoading,
    error,
    addTodo: addTodoMutation.mutate,
    toggleTodo: toggleTodoMutation.mutate,
    deleteTodo: deleteTodoMutation.mutate,
  };
};
