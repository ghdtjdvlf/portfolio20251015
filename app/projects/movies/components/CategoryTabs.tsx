import { FC } from 'react';
import styled from '@emotion/styled';
import { useAtom } from 'jotai';
import { selectedCategoryAtom } from '../store/movieAtoms';
import { MovieCategory } from '../types/movie';

const CategoryTabs: FC = () => {
  const [selectedCategory, setSelectedCategory] = useAtom(selectedCategoryAtom);

  const categories: { value: MovieCategory; label: string }[] = [
    { value: 'popular', label: '🔥 인기' },
    { value: 'top_rated', label: '⭐ 최고 평점' },
    { value: 'upcoming', label: '🎬 개봉 예정' },
    { value: 'now_playing', label: '🎥 현재 상영' },
  ];

  return (
    <Container>
      {categories.map((category) => (
        <Tab
          key={category.value}
          active={selectedCategory === category.value}
          onClick={() => setSelectedCategory(category.value)}
        >
          {category.label}
        </Tab>
      ))}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 32px;
  flex-wrap: wrap;
  justify-content: center;
`;

const Tab = styled.button<{ active: boolean }>`
  padding: 12px 24px;
  background: ${props => props.active
    ? 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)'
    : '#ffffff'};
  color: ${props => props.active ? 'white' : '#4b5563'};
  border: 2px solid ${props => props.active ? '#3b82f6' : '#e5e7eb'};
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: ${props => props.active
    ? '0 4px 12px rgba(59, 130, 246, 0.3)'
    : '0 2px 4px rgba(0, 0, 0, 0.05)'};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.active
      ? '0 6px 16px rgba(59, 130, 246, 0.4)'
      : '0 4px 8px rgba(0, 0, 0, 0.1)'};
  }

  &:active {
    transform: translateY(0);
  }
`;

export default CategoryTabs;
