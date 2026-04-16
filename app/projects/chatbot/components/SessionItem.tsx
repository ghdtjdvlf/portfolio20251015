import { FC } from 'react';
import styled from '@emotion/styled';
import { ChatSession } from '../types/chat';

interface SessionItemProps {
  session: ChatSession;
  isActive: boolean;
  onClick: () => void;
  onDelete: (e: React.MouseEvent) => void;
}

const SessionItem: FC<SessionItemProps> = ({ session, isActive, onClick, onDelete }) => {
  const formatDate = (date: Date) => {
    const now = new Date();
    const sessionDate = new Date(date);
    const diffInHours = (now.getTime() - sessionDate.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return sessionDate.toLocaleTimeString('ko-KR', {
        hour: '2-digit',
        minute: '2-digit',
      });
    } else if (diffInHours < 48) {
      return '어제';
    } else {
      return sessionDate.toLocaleDateString('ko-KR', {
        month: 'short',
        day: 'numeric',
      });
    }
  };

  const messageCount = session.messages.length;

  return (
    <Container isActive={isActive} onClick={onClick}>
      <MainContent>
        <SessionTitle>{session.title}</SessionTitle>
        <SessionMeta>
          <MetaItem>
            <MetaIcon>💬</MetaIcon>
            <MetaText>{messageCount}</MetaText>
          </MetaItem>
          <MetaDivider>•</MetaDivider>
          <MetaItem>
            <MetaText>{formatDate(session.updatedAt)}</MetaText>
          </MetaItem>
        </SessionMeta>
      </MainContent>
      <DeleteButton onClick={onDelete} title="대화 삭제">
        <DeleteIcon>×</DeleteIcon>
      </DeleteButton>
    </Container>
  );
};

const Container = styled.div<{ isActive: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 14px 12px;
  margin-bottom: 4px;
  cursor: pointer;
  background: ${props => props.isActive ? '#fce7f3' : 'transparent'};
  border-radius: 10px;
  border-left: 3px solid ${props => props.isActive ? '#ec4899' : 'transparent'};
  transition: all 0.2s;

  @media (hover: hover) {
    &:hover {
      background: ${props => props.isActive ? '#fce7f3' : '#f9fafb'};

      button {
        opacity: 1;
      }
    }
  }

  @media (hover: none) {
    &:active {
      background: ${props => props.isActive ? '#fce7f3' : '#f9fafb'};
    }
  }
`;

const MainContent = styled.div`
  flex: 1;
  min-width: 0;
`;

const SessionTitle = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #212121;
  margin-bottom: 6px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const SessionMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const MetaIcon = styled.span`
  font-size: 11px;
  line-height: 1;
`;

const MetaText = styled.span`
  font-size: 12px;
  color: #9e9e9e;
`;

const MetaDivider = styled.span`
  font-size: 12px;
  color: #e0e0e0;
`;

const DeleteButton = styled.button`
  width: 28px;
  height: 28px;
  border-radius: 6px;
  background: transparent;
  border: none;
  color: #9e9e9e;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.5;
  transition: all 0.2s;
  flex-shrink: 0;

  @media (hover: none) {
    opacity: 1;
  }

  &:hover {
    background: #fee;
    color: #f44336;
    opacity: 1;
  }

  &:active {
    transform: scale(0.9);
  }
`;

const DeleteIcon = styled.span`
  font-size: 20px;
  font-weight: 300;
  line-height: 1;
`;

export default SessionItem;
