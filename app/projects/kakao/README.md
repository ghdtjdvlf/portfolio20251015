# Kakao Map & Login Integration

## 설정 방법

### 1. 카카오 개발자 계정 설정

#### 카카오맵 API 설정
1. [카카오 개발자 사이트](https://developers.kakao.com/) 접속
2. '내 애플리케이션' > '애플리케이션 추가하기' 클릭
3. 앱 만들기 완료 후 '앱 설정' > '앱 키'에서 **JavaScript 키** 복사
4. '플랫폼' > 'Web 플랫폼 등록' 클릭
5. 사이트 도메인 추가: `http://localhost:5173`

#### 카카오 로그인 API 설정
1. 같은 앱의 '앱 설정' > '앱 키'에서 **REST API 키** 복사
2. '제품 설정' > '카카오 로그인' 활성화
3. 'Redirect URI' 등록: `http://localhost:5173/kakao`
4. '동의항목' 설정에서 필요한 정보 권한 설정 (닉네임, 프로필 이미지, 이메일 등)

### 2. 환경 변수 설정

`.env` 파일에 다음 내용 추가:

```env
# Kakao JavaScript Key (카카오맵용)
VITE_KAKAO_APP_KEY=your_javascript_key_here

# Kakao REST API Key (카카오 로그인용)
VITE_KAKAO_REST_API_KEY=your_rest_api_key_here
VITE_KAKAO_REDIRECT_URI=http://localhost:5173/kakao
```

### 3. 코드 수정

#### KakaoApp.tsx
- 17번째 줄: `KAKAO_JS_KEY` 변수를 환경 변수로 변경
```typescript
const KAKAO_JS_KEY = import.meta.env.VITE_KAKAO_APP_KEY;
```

#### api/kakaoAuth.ts
- 4-5번째 줄: API 키 설정
```typescript
const KAKAO_REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;
const KAKAO_REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI;
```

## 기능 설명

### 카카오맵
- 지도 표시 및 마커 기능
- 장소/주소 검색
- 검색 결과 클릭 시 지도 이동 및 마커 표시
- Apple 스타일의 깔끔한 UI

### 카카오 로그인
- OAuth 2.0 기반 카카오 로그인
- 사용자 정보 (닉네임, 프로필 이미지, 이메일) 표시
- localStorage를 통한 로그인 상태 유지
- 로그아웃 기능

## 파일 구조

```
kakao/
├── KakaoApp.tsx              # 메인 컴포넌트
├── index.tsx                 # Export
├── components/
│   ├── KakaoMap.tsx         # 지도 & 검색 컴포넌트
│   └── KakaoLogin.tsx       # 로그인 컴포넌트
├── api/
│   └── kakaoAuth.ts         # 카카오 로그인 API
├── types/
│   └── kakao.ts             # 타입 정의
└── README.md                # 이 파일
```

## 참고 문서

- [카카오맵 API 문서](https://apis.map.kakao.com/web/documentation/)
- [카카오 로그인 REST API 문서](https://developers.kakao.com/docs/latest/ko/kakaologin/rest-api)

## 문제 해결

### 지도가 표시되지 않는 경우
1. JavaScript 키가 올바르게 설정되었는지 확인
2. 플랫폼 설정에서 사이트 도메인이 올바른지 확인
3. 브라우저 콘솔에서 에러 메시지 확인

### 로그인이 작동하지 않는 경우
1. REST API 키가 올바르게 설정되었는지 확인
2. Redirect URI가 정확히 일치하는지 확인
3. 카카오 로그인이 활성화되어 있는지 확인
4. 브라우저의 쿠키/로컬스토리지가 허용되어 있는지 확인
