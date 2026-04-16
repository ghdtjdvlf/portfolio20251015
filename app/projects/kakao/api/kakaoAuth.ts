import { KakaoLoginResponse, KakaoUserInfo } from '../types/kakao';

// Kakao API configuration
const KAKAO_REST_API_KEY = ''; // TODO: Add your Kakao REST API Key
const KAKAO_REDIRECT_URI = ''; // TODO: Add your Redirect URI (e.g., http://localhost:5173/kakao/callback)

export const kakaoAuthConfig = {
  restApiKey: KAKAO_REST_API_KEY,
  redirectUri: KAKAO_REDIRECT_URI,
  authUrl: 'https://kauth.kakao.com/oauth/authorize',
  tokenUrl: 'https://kauth.kakao.com/oauth/token',
  userInfoUrl: 'https://kapi.kakao.com/v2/user/me',
};

/**
 * Get Kakao OAuth authorization URL
 */
export const getKakaoAuthUrl = (): string => {
  const params = new URLSearchParams({
    client_id: kakaoAuthConfig.restApiKey,
    redirect_uri: kakaoAuthConfig.redirectUri,
    response_type: 'code',
  });

  return `${kakaoAuthConfig.authUrl}?${params.toString()}`;
};

/**
 * Exchange authorization code for access token
 */
export const getKakaoToken = async (code: string): Promise<KakaoLoginResponse> => {
  const params = new URLSearchParams({
    grant_type: 'authorization_code',
    client_id: kakaoAuthConfig.restApiKey,
    redirect_uri: kakaoAuthConfig.redirectUri,
    code: code,
  });

  const response = await fetch(kakaoAuthConfig.tokenUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: params.toString(),
  });

  if (!response.ok) {
    throw new Error('Failed to get Kakao token');
  }

  return response.json();
};

/**
 * Get user information using access token
 */
export const getKakaoUserInfo = async (accessToken: string): Promise<KakaoUserInfo> => {
  const response = await fetch(kakaoAuthConfig.userInfoUrl, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to get user info');
  }

  return response.json();
};

/**
 * Logout from Kakao
 */
export const kakaoLogout = async (accessToken: string): Promise<void> => {
  const response = await fetch('https://kapi.kakao.com/v1/user/logout', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to logout');
  }
};
