import { FC, useState, FormEvent } from 'react';
import styled from '@emotion/styled';
import { theme } from '../shared-styles/theme';
import { useTodos } from '../shared-hooks/useTodos';

const TodoInput: FC = () => {
  const [input, setInput] = useState('');
  const { addTodo } = useTodos();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      addTodo(input.trim());
      setInput('');
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type="text"
        placeholder="새로운 할 일을 입력하세요..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <AddButton type="submit">추가</AddButton>
    </Form>
  );
};

const Form = styled.form`
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
`;

const Input = styled.input`
  flex: 1;
  padding: 12px 16px;
  font-size: 16px;
  border: 2px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  outline: none;
  transition: border-color 0.2s;

  &:focus {
    border-color: ${theme.colors.primary};
  }
`;

const AddButton = styled.button`
  padding: 12px 24px;
  background: ${theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${theme.borderRadius.md};
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: ${theme.colors.primaryHover};
  }
`;

export default TodoInput;
