import { FC, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { theme } from '../../shared-styles/theme';
import { getKakaoAuthUrl, getKakaoToken, getKakaoUserInfo, kakaoLogout } from '../api/kakaoAuth';
import { KakaoUserInfo } from '../types/kakao';

interface KakaoLoginProps {
  onLoginSuccess?: (user: KakaoUserInfo) => void;
  onLogout?: () => void;
}

const KakaoLogin: FC<KakaoLoginProps> = ({ onLoginSuccess, onLogout }) => {
  const [user, setUser] = useState<KakaoUserInfo | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Load user data from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('kakao_user');
    const savedToken = localStorage.getItem('kakao_access_token');

    if (savedUser && savedToken) {
      setUser(JSON.parse(savedUser));
      setAccessToken(savedToken);
    }
  }, []);

  // Handle OAuth callback
  useEffect(() => {
    const handleCallback = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');

      if (code && !user) {
        setIsLoading(true);
        try {
          // Exchange code for token
          const tokenResponse = await getKakaoToken(code);
          const token = tokenResponse.access_token;

          // Get user info
          const userInfo = await getKakaoUserInfo(token);

          // Save to state and localStorage
          setUser(userInfo);
          setAccessToken(token);
          localStorage.setItem('kakao_user', JSON.stringify(userInfo));
          localStorage.setItem('kakao_access_token', token);

          // Callback
          if (onLoginSuccess) {
            onLoginSuccess(userInfo);
          }

          // Clean up URL
          window.history.replaceState({}, document.title, window.location.pathname);
        } catch (error) {
          console.error('Kakao login failed:', error);
          alert('로그인에 실패했습니다. 다시 시도해주세요.');
        } finally {
          setIsLoading(false);
        }
      }
    };

    handleCallback();
  }, [user, onLoginSuccess]);

  // Handle login button click
  const handleLogin = () => {
    const authUrl = getKakaoAuthUrl();
    window.location.href = authUrl;
  };

  // Handle logout
  const handleLogout = async () => {
    if (!accessToken) return;

    setIsLoading(true);
    try {
      await kakaoLogout(accessToken);

      // Clear state and localStorage
      setUser(null);
      setAccessToken(null);
      localStorage.removeItem('kakao_user');
      localStorage.removeItem('kakao_access_token');

      // Callback
      if (onLogout) {
        onLogout();
      }
    } catch (error) {
      console.error('Logout failed:', error);
      // Clear anyway
      setUser(null);
      setAccessToken(null);
      localStorage.removeItem('kakao_user');
      localStorage.removeItem('kakao_access_token');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <Container>
        <LoadingSpinner />
        <LoadingText>로그인 중...</LoadingText>
      </Container>
    );
  }

  if (user) {
    return (
      <Container>
        <UserCard>
          <UserInfo>
            {user.properties.profile_image && (
              <ProfileImage src={user.properties.profile_image} alt="Profile" />
            )}
            <UserDetails>
              <UserName>{user.properties.nickname}</UserName>
              {user.kakao_account.email && (
                <UserEmail>{user.kakao_account.email}</UserEmail>
              )}
            </UserDetails>
          </UserInfo>
          <LogoutButton onClick={handleLogout} disabled={isLoading}>
            로그아웃
          </LogoutButton>
        </UserCard>
      </Container>
    );
  }

  return (
    <Container>
      <LoginButton onClick={handleLogin} disabled={isLoading}>
        <KakaoIcon>
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 3C6.477 3 2 6.477 2 10.75c0 2.745 1.758 5.15 4.4 6.567l-1.075 3.908c-.075.272.195.495.435.36l4.748-2.663c.495.075.998.113 1.492.113 5.523 0 10-3.477 10-7.75S17.523 3 12 3z"/>
          </svg>
        </KakaoIcon>
        <span>카카오 로그인</span>
      </LoginButton>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const LoginButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  width: 100%;
  max-width: 400px;
  height: 56px;
  background: #fee500;
  color: #000000;
  border: none;
  border-radius: ${theme.borderRadius.lg};
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all ${theme.transitions.fast};
  box-shadow: ${theme.shadows.md};

  &:hover {
    background: #fdd835;
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.lg};
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const KakaoIcon = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 100%;
    height: 100%;
  }
`;

const UserCard = styled.div`
  width: 100%;
  max-width: 400px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: ${theme.borderRadius.xl};
  padding: 24px;
  box-shadow: ${theme.shadows.lg};
  border: 1px solid rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const ProfileImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid ${theme.colors.borderLight};
`;

const UserDetails = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const UserName = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: ${theme.colors.text};
`;

const UserEmail = styled.div`
  font-size: 14px;
  color: ${theme.colors.textSecondary};
`;

const LogoutButton = styled.button`
  width: 100%;
  height: 44px;
  background: ${theme.colors.surfaceSecondary};
  color: ${theme.colors.text};
  border: 1px solid ${theme.colors.borderLight};
  border-radius: ${theme.borderRadius.md};
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all ${theme.transitions.fast};

  &:hover {
    background: ${theme.colors.borderLight};
  }

  &:active {
    transform: scale(0.98);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const LoadingSpinner = styled.div`
  width: 40px;
  height: 40px;
  border: 3px solid ${theme.colors.borderLight};
  border-top-color: ${theme.colors.primary};
  border-radius: 50%;
  animation: spin 0.8s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const LoadingText = styled.div`
  margin-top: 16px;
  font-size: 15px;
  color: ${theme.colors.textSecondary};
`;

export default KakaoLogin;
