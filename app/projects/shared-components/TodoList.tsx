import { FC, useMemo } from 'react';
import styled from '@emotion/styled';
import { useAtom } from 'jotai';
import { filterAtom, searchAtom } from '../todo/store/todoAtoms';
import { useTodos } from '../shared-hooks/useTodos';
import TodoItem from './TodoItem';

const TodoList: FC = () => {
  const { todos, isLoading, toggleTodo, deleteTodo } = useTodos();
  const [filter] = useAtom(filterAtom);
  const [search] = useAtom(searchAtom);

  // Filtered todos using useMemo for performance
  const filteredTodos = useMemo(() => {
    let result = todos;

    // Apply filter
    if (filter === 'active') {
      result = result.filter(todo => !todo.completed);
    } else if (filter === 'completed') {
      result = result.filter(todo => todo.completed);
    }

    // Apply search
    if (search) {
      result = result.filter(todo =>
        todo.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    return result;
  }, [todos, filter, search]);

  if (isLoading) {
    return <Loading>로딩 중...</Loading>;
  }

  if (filteredTodos.length === 0) {
    return <EmptyState>할 일이 없습니다</EmptyState>;
  }

  return (
    <Container>
      {filteredTodos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
        />
      ))}
    </Container>
  );
};

const Container = styled.div`
  margin-top: 24px;
`;

const Loading = styled.div`
  text-align: center;
  padding: 48px;
  color: #6B7280;
  font-size: 18px;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 48px;
  color: #9CA3AF;
  font-size: 16px;
`;

export default TodoList;
