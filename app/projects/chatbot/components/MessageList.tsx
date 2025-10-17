import { FC, useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import { Message } from '../types/chat';
import MessageItem from './MessageItem';

interface MessageListProps {
  messages: Message[];
  onSendSuggestion?: (message: string) => void;
}

const MessageList: FC<MessageListProps> = ({ messages, onSendSuggestion }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const suggestions = [
    { icon: '📦', text: '배송은 얼마나 걸리나요?' },
    { icon: '🔄', text: '반품은 어떻게 하나요?' },
    { icon: '🎁', text: '1초만에 쿠폰 받기' },
    { icon: '💰', text: '할인 쿠폰이 있나요?' },
  ];

  const handleSuggestionClick = (text: string) => {
    if (onSendSuggestion) {
      onSendSuggestion(text);
    }
  };

  if (messages.length === 0) {
    return (
      <Container>
        <EmptyState>
          <EmptyIcon>🛍️</EmptyIcon>
          <EmptyTitle>안녕하세요! 쇼핑 도우미입니다</EmptyTitle>
          <EmptySubtext>무엇을 도와드릴까요? 아래 버튼을 눌러보세요!</EmptySubtext>
          <SuggestionList>
            {suggestions.map((suggestion, index) => (
              <SuggestionCard
                key={index}
                onClick={() => handleSuggestionClick(suggestion.text)}
              >
                <SuggestionIcon>{suggestion.icon}</SuggestionIcon>
                <SuggestionText>{suggestion.text}</SuggestionText>
              </SuggestionCard>
            ))}
          </SuggestionList>
          <Notice>
            💡 주문번호나 개인정보는 입력하지 말아주세요!
          </Notice>
        </EmptyState>
      </Container>
    );
  }

  return (
    <Container>
      <MessagesList>
        {messages.map((message) => (
          <MessageItem key={message.id} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </MessagesList>
    </Container>
  );
};

const Container = styled.div`
  flex: 1;
  overflow-y: auto;
  background: #fafafa;

  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: #e0e0e0;
    border-radius: 4px;

    &:hover {
      background: #bdbdbd;
    }
  }
`;

const MessagesList = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 24px 20px;
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 40px 20px;
  text-align: center;
`;

const EmptyIcon = styled.div`
  font-size: 72px;
  margin-bottom: 20px;
  animation: bounce 2s ease-in-out infinite;

  @keyframes bounce {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
  }
`;

const EmptyTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: #212121;
  margin-bottom: 12px;
`;

const EmptySubtext = styled.p`
  font-size: 15px;
  color: #757575;
  margin-bottom: 40px;
  max-width: 400px;
  line-height: 1.5;
`;

const SuggestionList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 12px;
  max-width: 700px;
  width: 100%;
  margin-bottom: 24px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const SuggestionCard = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 20px 16px;
  background: white;
  border: 2px solid #f8bbd0;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s;
  font-family: inherit;

  &:hover {
    border-color: #ec4899;
    background: #fce7f3;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(236, 72, 153, 0.2);
  }

  &:active {
    transform: translateY(0);
  }
`;

const SuggestionIcon = styled.div`
  font-size: 28px;
`;

const SuggestionText = styled.div`
  font-size: 13px;
  font-weight: 500;
  color: #424242;
  line-height: 1.4;
`;

const Notice = styled.div`
  font-size: 13px;
  color: #9e9e9e;
  background: #fff3e0;
  padding: 12px 20px;
  border-radius: 20px;
  border: 1px solid #ffe0b2;
`;

export default MessageList;
