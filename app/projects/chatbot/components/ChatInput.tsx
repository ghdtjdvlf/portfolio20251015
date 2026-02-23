import { FC, useState, KeyboardEvent } from 'react';
import styled from '@emotion/styled';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

const ChatInput: FC<ChatInputProps> = ({ onSend, disabled = false }) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim() && !disabled) {
      onSend(message.trim());
      setMessage('');
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Container>
      <InputWrapper>
        <InputContainer>
          <TextArea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="메시지를 입력하세요..."
            disabled={disabled}
            rows={1}
          />
          <SendButton
            onClick={handleSend}
            disabled={disabled || !message.trim()}
            hasMessage={!!message.trim()}
          >
            <SendIcon hasMessage={!!message.trim()}>➤</SendIcon>
          </SendButton>
        </InputContainer>
        <HintText>Shift + Enter로 줄바꿈</HintText>
      </InputWrapper>
    </Container>
  );
};

const Container = styled.div`
  padding: 16px 20px;
  background: white;
  border-top: 1px solid #e0e0e0;
`;

const InputWrapper = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

const InputContainer = styled.div`
  display: flex;
  gap: 12px;
  align-items: flex-end;
`;

const TextArea = styled.textarea`
  flex: 1;
  padding: 14px 16px;
  font-size: 15px;
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  outline: none;
  resize: none;
  font-family: inherit;
  line-height: 1.5;
  min-height: 48px;
  max-height: 120px;
  background: white;
  color: #212121;
  transition: all 0.2s;

  &:focus {
    border-color: #ec4899;
    box-shadow: 0 0 0 3px rgba(236, 72, 153, 0.1);
  }

  &:disabled {
    background: #f5f5f5;
    cursor: not-allowed;
    color: #9e9e9e;
  }

  &::placeholder {
    color: #bdbdbd;
  }
`;

const SendButton = styled.button<{ hasMessage: boolean }>`
  width: 48px;
  height: 48px;
  background: ${props => props.hasMessage ? '#ec4899' : '#f5f5f5'};
  color: white;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  flex-shrink: 0;
  box-shadow: ${props => props.hasMessage ? '0 2px 8px rgba(236, 72, 153, 0.3)' : 'none'};

  &:hover:not(:disabled) {
    background: ${props => props.hasMessage ? '#db2777' : '#eeeeee'};
    transform: ${props => props.hasMessage ? 'scale(1.05)' : 'none'};
  }

  &:active:not(:disabled) {
    transform: scale(0.95);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

const SendIcon = styled.span<{ hasMessage: boolean }>`
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.hasMessage ? 'white' : '#bdbdbd'};
  transition: color 0.2s;
`;

const HintText = styled.div`
  font-size: 12px;
  color: #9e9e9e;
  margin-top: 8px;
  text-align: center;
`;

export default ChatInput;
