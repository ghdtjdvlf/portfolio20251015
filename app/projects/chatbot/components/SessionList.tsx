import { FC } from 'react';
import styled from '@emotion/styled';
import { useAtom, useSetAtom } from 'jotai';
import {
  sessionsAtom,
  currentSessionIdAtom,
  createSessionAtom,
  deleteSessionAtom,
} from '../store/chatAtoms';
import SessionItem from './SessionItem';

interface SessionListProps {
  onClose?: () => void;
}

const SessionList: FC<SessionListProps> = ({ onClose }) => {
  const [sessions] = useAtom(sessionsAtom);
  const [currentSessionId, setCurrentSessionId] = useAtom(currentSessionIdAtom);
  const createSession = useSetAtom(createSessionAtom);
  const deleteSession = useSetAtom(deleteSessionAtom);

  const handleNewSession = () => {
    createSession();
    onClose?.();
  };

  const handleSelectSession = (sessionId: string) => {
    setCurrentSessionId(sessionId);
    onClose?.();
  };

  const handleDeleteSession = (e: React.MouseEvent, sessionId: string) => {
    e.stopPropagation();
    if (window.confirm('이 대화를 삭제하시겠습니까?')) {
      deleteSession(sessionId);
    }
  };

  return (
    <Container>
      <Header>
        <HeaderContent>
          <Title>대화 목록</Title>
          <SessionCount>{sessions.length}</SessionCount>
        </HeaderContent>
        <NewSessionButton onClick={handleNewSession}>
          <ButtonIcon>+</ButtonIcon>
          <ButtonText>새 대화</ButtonText>
        </NewSessionButton>
      </Header>

      <SessionsList>
        {sessions.length === 0 ? (
          <EmptyState>
            <EmptyIcon>💭</EmptyIcon>
            <EmptyText>저장된 대화가 없습니다</EmptyText>
            <EmptyButton onClick={handleNewSession}>
              첫 대화 시작하기
            </EmptyButton>
          </EmptyState>
        ) : (
          sessions.map((session) => (
            <SessionItem
              key={session.id}
              session={session}
              isActive={session.id === currentSessionId}
              onClick={() => handleSelectSession(session.id)}
              onDelete={(e) => handleDeleteSession(e, session.id)}
            />
          ))
        )}
      </SessionsList>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background: white;
`;

const Header = styled.div`
  padding: 20px;
  border-bottom: 1px solid #e0e0e0;
`;

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const Title = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: #212121;
`;

const SessionCount = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 24px;
  height: 24px;
  padding: 0 8px;
  background: #fce7f3;
  color: #db2777;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
`;

const NewSessionButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 16px;
  background: #ec4899;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #db2777;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(236, 72, 153, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;

const ButtonIcon = styled.span`
  font-size: 18px;
  font-weight: 300;
`;

const ButtonText = styled.span``;

const SessionsList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 12px;

  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: #e0e0e0;
    border-radius: 3px;

    &:hover {
      background: #bdbdbd;
    }
  }
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  text-align: center;
`;

const EmptyIcon = styled.div`
  font-size: 48px;
  margin-bottom: 16px;
  opacity: 0.4;
`;

const EmptyText = styled.div`
  font-size: 15px;
  color: #757575;
  margin-bottom: 20px;
`;

const EmptyButton = styled.button`
  padding: 10px 20px;
  background: #fce7f3;
  color: #db2777;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #fbcfe8;
  }
`;

export default SessionList;
