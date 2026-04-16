// React + TypeScript + Emotion component
import { FC } from 'react';
import styled from '@emotion/styled';
import { theme } from '../shared-styles/theme';
import { Todo } from '../shared-api/todos';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const TodoItem: FC<TodoItemProps> = ({ todo, onToggle, onDelete }) => {
  return (
    <Container>
      <CheckboxLabel>
        <Checkbox
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
        />
        <TodoText completed={todo.completed}>{todo.title}</TodoText>
      </CheckboxLabel>
      <DeleteButton onClick={() => onDelete(todo.id)}>삭제</DeleteButton>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  background: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  margin-bottom: 8px;
  transition: all 0.2s;

  &:hover {
    box-shadow: ${theme.shadows.md};
  }
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  flex: 1;
  cursor: pointer;
`;

const Checkbox = styled.input`
  width: 20px;
  height: 20px;
  margin-right: 12px;
  cursor: pointer;
`;

const TodoText = styled.span<{ completed: boolean }>`
  font-size: 16px;
  color: ${props => props.completed ? theme.colors.completed : theme.colors.text};
  text-decoration: ${props => props.completed ? 'line-through' : 'none'};
`;

const DeleteButton = styled.button`
  padding: 8px 16px;
  background: ${theme.colors.danger};
  color: white;
  border: none;
  border-radius: ${theme.borderRadius.sm};
  cursor: pointer;
  font-size: 14px;
  transition: background 0.2s;

  &:hover {
    background: ${theme.colors.dangerHover};
  }
`;

export default TodoItem;
