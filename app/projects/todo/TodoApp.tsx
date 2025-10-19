// Todo 프로젝트를 독립된 컴포넌트로 분리
import { FC } from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { theme } from '../../styles/theme';
import TodoInput from '../shared-components/TodoInput';
import FilterBar from '../shared-components/FilterBar';
import TodoList from '../shared-components/TodoList';

const TodoApp: FC = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Header>
        <HomeButton onClick={() => navigate('/')}>
          <Arrow>←</Arrow>
          <span>홈</span>
        </HomeButton>
        <Title>📝 Todo App</Title>
        <Subtitle>TanStack Query와 Jotai를 활용한 할 일 관리</Subtitle>
        <TechStack>
          <TechBadge color="#61DAFB">React</TechBadge>
          <TechBadge color="#3178C6">TypeScript</TechBadge>
          <TechBadge color="#000000">Next.js</TechBadge>
          <TechBadge color="#FF4154">TanStack Query</TechBadge>
          <TechBadge color="#7C3AED">Jotai</TechBadge>
          <TechBadge color="#DB7093">Emotion</TechBadge>
          <TechBadge color="#646CFF">Vite</TechBadge>
        </TechStack>
      </Header>

      <Content>
        <TodoInput />
        <FilterBar />
        <TodoList />
      </Content>

      <FeatureList>
        <FeatureTitle>🎯 구현된 기능</FeatureTitle>
        <FeatureItem>✅ 할 일 추가/삭제/완료 처리</FeatureItem>
        <FeatureItem>✅ Optimistic Updates로 즉각적 UI 반응</FeatureItem>
        <FeatureItem>✅ 필터링 (전체/진행중/완료)</FeatureItem>
        <FeatureItem>✅ 실시간 검색</FeatureItem>
        <FeatureItem>✅ LocalStorage 자동 저장</FeatureItem>
        <FeatureItem>✅ TanStack Query 자동 캐싱 (5분)</FeatureItem>
      </FeatureList>
    </Container>
  );
};

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 48px;
  position: relative;
`;

const HomeButton = styled.button`
  position: absolute;
  left: 0;
  top: 0;
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  border-radius: ${theme.borderRadius.sm};
  transition: all ${theme.transitions.fast};
  font-size: 14px;
  font-weight: 500;
  color: ${theme.colors.primary};

  &:hover {
    background: ${theme.colors.surfaceSecondary};
  }
`;

const Arrow = styled.span`
  font-size: 18px;
`;

const Title = styled.h1`
  font-size: 48px;
  font-weight: 700;
  color: ${theme.colors.text};
  margin-bottom: 12px;
`;

const Subtitle = styled.p`
  font-size: 18px;
  color: #6b7280;
  margin-bottom: 24px;
`;

const TechStack = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: center;
`;

const TechBadge = styled.span<{ color: string }>`
  padding: 6px 12px;
  background: ${props => props.color};
  color: white;
  border-radius: ${theme.borderRadius.sm};
  font-size: 12px;
  font-weight: 600;
`;

const Content = styled.main`
  background: ${theme.colors.surface};
  padding: 32px;
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.lg};
  margin-bottom: 32px;
`;

const FeatureList = styled.div`
  padding: 32px;
  background: #f9fafb;
  border-radius: 16px;
  border: 2px solid #e5e7eb;
`;

const FeatureTitle = styled.h3`
  font-size: 24px;
  font-weight: 700;
  color: #111827;
  margin-bottom: 16px;
`;

const FeatureItem = styled.div`
  font-size: 16px;
  color: #4b5563;
  padding: 8px 0;
  padding-left: 24px;
`;

export default TodoApp;
