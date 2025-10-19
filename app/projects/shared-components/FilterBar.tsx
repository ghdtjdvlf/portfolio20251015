import { FC } from 'react';
import styled from '@emotion/styled';
import { useAtom } from 'jotai';
import { filterAtom, searchAtom, FilterType } from '../todo/store/todoAtoms';
import { theme } from '../shared-styles/theme';

const FilterBar: FC = () => {
  const [filter, setFilter] = useAtom(filterAtom);
  const [search, setSearch] = useAtom(searchAtom);

  const filters: FilterType[] = ['all', 'active', 'completed'];

  return (
    <Container>
      <SearchInput
        type="text"
        placeholder="검색..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <FilterButtons>
        {filters.map((f) => (
          <FilterButton
            key={f}
            active={filter === f}
            onClick={() => setFilter(f)}
          >
            {f === 'all' ? '전체' : f === 'active' ? '진행중' : '완료'}
          </FilterButton>
        ))}
      </FilterButtons>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
  flex-wrap: wrap;
`;

const SearchInput = styled.input`
  flex: 1;
  min-width: 200px;
  padding: 10px 16px;
  font-size: 14px;
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  outline: none;

  &:focus {
    border-color: ${theme.colors.primary};
  }
`;

const FilterButtons = styled.div`
  display: flex;
  gap: 8px;
`;

const FilterButton = styled.button<{ active: boolean }>`
  padding: 10px 20px;
  background: ${props => props.active ? theme.colors.primary : theme.colors.surface};
  color: ${props => props.active ? 'white' : theme.colors.text};
  border: 1px solid ${props => props.active ? theme.colors.primary : theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${props => props.active ? theme.colors.primaryHover : theme.colors.background};
  }
`;

export default FilterBar;
