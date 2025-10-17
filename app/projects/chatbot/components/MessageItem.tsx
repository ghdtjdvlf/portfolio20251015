import { FC, useState } from 'react';
import styled from '@emotion/styled';
import { Message } from '../types/chat';

interface MessageItemProps {
  message: Message;
}

const MessageItem: FC<MessageItemProps> = ({ message }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const isUser = message.role === 'user';

  return (
    <Container isUser={isUser}>
      <MessageWrapper isUser={isUser}>
        <MessageBubble isUser={isUser}>
          {message.isLoading ? (
            <LoadingDots>
              <Dot delay={0} />
              <Dot delay={0.15} />
              <Dot delay={0.3} />
            </LoadingDots>
          ) : (
            <MessageContent>{message.content}</MessageContent>
          )}
        </MessageBubble>
        {!isUser && !message.isLoading && (
          <CopyButton onClick={handleCopy} copied={copied}>
            {copied ? '✓' : '📋'}
          </CopyButton>
        )}
      </MessageWrapper>
      <Timestamp isUser={isUser}>
        {new Date(message.timestamp).toLocaleTimeString('ko-KR', {
          hour: '2-digit',
          minute: '2-digit',
        })}
      </Timestamp>
    </Container>
  );
};

const Container = styled.div<{ isUser: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: ${props => props.isUser ? 'flex-end' : 'flex-start'};
  margin-bottom: 20px;
  animation: slideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const MessageWrapper = styled.div<{ isUser: boolean }>`
  display: flex;
  align-items: flex-end;
  gap: 8px;
  max-width: 75%;

  @media (max-width: 768px) {
    max-width: 85%;
  }
`;

const MessageBubble = styled.div<{ isUser: boolean }>`
  padding: 12px 16px;
  border-radius: ${props => props.isUser
    ? '16px 16px 4px 16px'
    : '16px 16px 16px 4px'};
  background: ${props => props.isUser ? '#ec4899' : 'white'};
  color: ${props => props.isUser ? 'white' : '#212121'};
  font-size: 15px;
  line-height: 1.5;
  word-wrap: break-word;
  white-space: pre-wrap;
  box-shadow: ${props => props.isUser
    ? '0 2px 8px rgba(236, 72, 153, 0.25)'
    : '0 2px 8px rgba(0, 0, 0, 0.06)'};
  transition: all 0.2s;

  &:hover {
    box-shadow: ${props => props.isUser
      ? '0 4px 12px rgba(236, 72, 153, 0.35)'
      : '0 4px 12px rgba(0, 0, 0, 0.1)'};
  }
`;

const MessageContent = styled.div`
  word-break: break-word;
`;

const CopyButton = styled.button<{ copied: boolean }>`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: ${props => props.copied ? '#ec4899' : 'white'};
  border: 1px solid ${props => props.copied ? '#ec4899' : '#e0e0e0'};
  color: ${props => props.copied ? 'white' : '#757575'};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  transition: all 0.2s;
  flex-shrink: 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

  &:hover {
    background: ${props => props.copied ? '#db2777' : '#f5f5f5'};
    border-color: ${props => props.copied ? '#db2777' : '#bdbdbd'};
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
`;

const Timestamp = styled.div<{ isUser: boolean }>`
  font-size: 11px;
  color: #9e9e9e;
  margin-top: 4px;
  padding: 0 4px;
  align-self: ${props => props.isUser ? 'flex-end' : 'flex-start'};
`;

const LoadingDots = styled.div`
  display: flex;
  gap: 5px;
  padding: 4px 0;
  align-items: center;
  justify-content: center;
`;

const Dot = styled.div<{ delay: number }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #9e9e9e;
  animation: bounce 1.2s infinite ease-in-out;
  animation-delay: ${props => props.delay}s;

  @keyframes bounce {
    0%, 60%, 100% {
      transform: translateY(0);
      opacity: 0.6;
    }
    30% {
      transform: translateY(-10px);
      opacity: 1;
    }
  }
`;

export default MessageItem;
