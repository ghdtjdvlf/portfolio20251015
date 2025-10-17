import { FC, useEffect } from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { theme } from '../../styles/theme';
import KakaoMap from './components/KakaoMap';
import KakaoLogin from './components/KakaoLogin';
import { KakaoUserInfo } from './types/kakao';

const KakaoApp: FC = () => {
  const navigate = useNavigate();

  // Load Kakao Maps SDK
  useEffect(() => {
    const KAKAO_JS_KEY = ''; // TODO: Add your Kakao JavaScript Key

    if (!KAKAO_JS_KEY) {
      console.warn('Kakao JavaScript Key is not set. Please add it in KakaoApp.tsx');
      return;
    }

    // Check if already loaded
    if (window.kakao && window.kakao.maps) {
      window.kakao.maps.load(() => {
        console.log('Kakao Maps loaded');
      });
      return;
    }

    // Load Kakao Maps SDK
    const script = document.createElement('script');
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_JS_KEY}&libraries=services&autoload=false`;
    script.async = true;
    script.onload = () => {
      if (window.kakao && window.kakao.maps) {
        window.kakao.maps.load(() => {
          console.log('Kakao Maps loaded');
        });
      }
    };
    document.head.appendChild(script);

    return () => {
      // Cleanup if needed
    };
  }, []);

  const handleLoginSuccess = (user: KakaoUserInfo) => {
    console.log('Login success:', user);
  };

  const handleLogout = () => {
    console.log('Logged out');
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
            <Logo>
              <LogoIcon>📍</LogoIcon>
              <LogoText>카카오 맵 & 로그인</LogoText>
            </Logo>
          </HeaderLeft>
        </HeaderContent>
      </Header>

      {/* Main Content */}
      <MainContent>
        {/* Kakao Login Section */}
        <LoginSection>
          <SectionTitle>카카오 계정으로 로그인</SectionTitle>
          <KakaoLogin
            onLoginSuccess={handleLoginSuccess}
            onLogout={handleLogout}
          />
        </LoginSection>

        {/* Kakao Map Section */}
        <MapSection>
          <SectionTitle>장소 검색</SectionTitle>
          <MapWrapper>
            <KakaoMap />
          </MapWrapper>
        </MapSection>
      </MainContent>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: ${theme.colors.background};
  overflow: hidden;
`;

const Header = styled.header`
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: ${theme.blur.md};
  border-bottom: 1px solid ${theme.colors.borderLight};
  position: sticky;
  top: 0;
  z-index: 100;
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

  &:active {
    transform: scale(0.98);
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

  @media (max-width: 640px) {
    font-size: 18px;
  }
`;

const MainContent = styled.main`
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 0;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: ${theme.colors.borderLight};
    border-radius: 4px;
  }
`;

const LoginSection = styled.section`
  background: ${theme.colors.surface};
  border-bottom: 1px solid ${theme.colors.borderLight};
  padding: 32px 24px;

  @media (max-width: 640px) {
    padding: 24px 16px;
  }
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: ${theme.colors.text};
  margin-bottom: 20px;
  text-align: center;

  @media (max-width: 640px) {
    font-size: 18px;
    margin-bottom: 16px;
  }
`;

const MapSection = styled.section`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 32px 24px;
  min-height: 500px;
  background: linear-gradient(
    to bottom,
    ${theme.colors.surface} 0%,
    ${theme.colors.background} 100%
  );

  @media (max-width: 640px) {
    padding: 24px 16px;
    min-height: 400px;
  }
`;

const MapWrapper = styled.div`
  flex: 1;
  border-radius: ${theme.borderRadius.xl};
  overflow: hidden;
  box-shadow: ${theme.shadows.xl};
  border: 1px solid ${theme.colors.borderLight};
  background: white;
  min-height: 450px;

  @media (max-width: 640px) {
    min-height: 350px;
    border-radius: ${theme.borderRadius.lg};
  }
`;

export default KakaoApp;
