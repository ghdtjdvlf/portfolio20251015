import { FC, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { useAtom, useSetAtom } from 'jotai';
import { currentSessionIdAtom, createSessionAtom } from './store/chatAtoms';
import { useChat } from './hooks/useChat';
import MessageList from './components/MessageList';
import ChatInput from './components/ChatInput';
import SessionList from './components/SessionList';
import { theme } from '../shared-styles/theme';

const ChatBot: FC = () => {
  const navigate = useNavigate();
  const [currentSessionId] = useAtom(currentSessionIdAtom);
  const createSession = useSetAtom(createSessionAtom);
  const { currentSession, sendMessage, isLoading } = useChat();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Create initial session if none exists
  useEffect(() => {
    if (!currentSessionId) {
      createSession();
    }
  }, [currentSessionId, createSession]);

  const handleSendMessage = (message: string) => {
    sendMessage(message);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Container>
      {/* Header */}
      <Header>
        <HeaderContent>
          <HeaderLeft>
            <HomeButton onClick={() => navigate('/')}>
              <Arrow>←</Arrow>
              <span>홈</span>
            </HomeButton>
            <Divider />
            <MenuButton onClick={toggleSidebar}>
              <MenuIcon>☰</MenuIcon>
            </MenuButton>
            <Logo>
              <LogoIcon>🛍️</LogoIcon>
              <LogoText>쇼핑 도우미</LogoText>
            </Logo>
          </HeaderLeft>
          <StatusBadge>
            <StatusDot />
            <StatusText>Online</StatusText>
          </StatusBadge>
        </HeaderContent>
      </Header>

      <MainContent>
        {/* Sidebar */}
        <Sidebar isOpen={isSidebarOpen}>
          <SessionList onClose={() => setIsSidebarOpen(false)} />
        </Sidebar>

        {/* Overlay for mobile */}
        {isSidebarOpen && <Overlay onClick={() => setIsSidebarOpen(false)} />}

        {/* Chat Area */}
        <ChatArea>
          <MessageList
            messages={currentSession?.messages || []}
            onSendSuggestion={handleSendMessage}
          />
          <ChatInput onSend={handleSendMessage} disabled={isLoading} />
        </ChatArea>
      </MainContent>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: ${theme.colors.background};
`;

const Header = styled.header`
  background: ${theme.colors.surface};
  border-bottom: 1px solid ${theme.colors.borderLight};
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: ${theme.blur.md};
  background: rgba(255, 255, 255, 0.8);
`;

const HeaderContent = styled.div`
  max-width: 100%;
  margin: 0 auto;
  padding: 0 24px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const HomeButton = styled.button`
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

const Divider = styled.div`
  width: 1px;
  height: 24px;
  background: ${theme.colors.borderLight};
`;

const MenuButton = styled.button`
  width: 44px;
  height: 44px;
  border: none;
  background: transparent;
  cursor: pointer;
  border-radius: ${theme.borderRadius.md};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all ${theme.transitions.fast};
  color: ${theme.colors.text};

  &:hover {
    background: ${theme.colors.surfaceSecondary};
  }

  &:active {
    transform: scale(0.95);
  }

  @media (min-width: 769px) {
    display: none;
  }
`;

const MenuIcon = styled.span`
  font-size: 22px;
  color: ${theme.colors.text};
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const LogoIcon = styled.div`
  font-size: 32px;
  line-height: 1;
`;

const LogoText = styled.h1`
  font-size: 22px;
  font-weight: 600;
  color: ${theme.colors.text};
  letter-spacing: -0.5px;
`;

const StatusBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: ${theme.colors.surfaceSecondary};
  border-radius: ${theme.borderRadius.full};
  border: 1px solid ${theme.colors.borderLight};
`;

const StatusDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${theme.colors.success};
  animation: pulse 2s ease-in-out infinite;

  @keyframes pulse {
    0%, 100% {
      opacity: 1;
      transform: scale(1);
    }
    50% {
      opacity: 0.7;
      transform: scale(0.95);
    }
  }
`;

const StatusText = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: ${theme.colors.text};
`;

const MainContent = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
  position: relative;
`;

const Sidebar = styled.aside<{ isOpen: boolean }>`
  width: 300px;
  background: ${theme.colors.surface};
  border-right: 1px solid ${theme.colors.borderLight};
  flex-shrink: 0;

  @media (max-width: 768px) {
    position: fixed;
    top: 70px;
    left: 0;
    bottom: 0;
    z-index: 200;
    transform: translateX(${props => props.isOpen ? '0' : '-100%'});
    transition: transform ${theme.transitions.normal};
    box-shadow: ${props => props.isOpen ? theme.shadows.xl : 'none'};
  }
`;

const Overlay = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: block;
    position: fixed;
    top: 70px;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${theme.colors.overlay};
    z-index: 150;
    animation: fadeIn 0.2s ease-out;

    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
  }
`;

const ChatArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: ${theme.colors.background};
`;

export default ChatBot;
