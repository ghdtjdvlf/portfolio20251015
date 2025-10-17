import { FC, useState, FormEvent } from 'react';
import styled from '@emotion/styled';
import { useSetAtom } from 'jotai';
import { searchQueryAtom } from '../store/movieAtoms';

const SearchBar: FC = () => {
  const [input, setInput] = useState('');
  const setSearchQuery = useSetAtom(searchQueryAtom);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSearchQuery(input.trim());
  };

  const handleClear = () => {
    setInput('');
    setSearchQuery('');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <SearchInput
        type="text"
        placeholder="영화 제목으로 검색..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      {input && (
        <ClearButton type="button" onClick={handleClear}>
          ✕
        </ClearButton>
      )}
      <SearchButton type="submit">🔍 검색</SearchButton>
    </Form>
  );
};

const Form = styled.form`
  display: flex;
  gap: 12px;
  margin-bottom: 32px;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  position: relative;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 14px 20px;
  padding-right: 50px;
  font-size: 16px;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  outline: none;
  transition: all 0.2s;

  &:focus {
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const ClearButton = styled.button`
  position: absolute;
  right: 140px;
  top: 50%;
  transform: translateY(-50%);
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #e5e7eb;
  color: #6b7280;
  border: none;
  cursor: pointer;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  &:hover {
    background: #d1d5db;
  }
`;

const SearchButton = styled.button`
  padding: 14px 28px;
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(59, 130, 246, 0.4);
  }

  &:active {
    transform: translateY(0);
  }
`;

export default SearchBar;
