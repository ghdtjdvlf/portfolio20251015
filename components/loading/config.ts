// 로딩 설정 - 여기서 모든 스타일과 동작을 수정할 수 있습니다

export const loadingConfig = {
  // 스크롤 프로그레스 바 설정
  scrollProgress: {
    enabled: true,
    position: 'top' as 'top' | 'bottom', // top 또는 bottom
    height: 3, // px
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    barColor: '#0064ff', // 라이트모드
    barColorDark: '#0064ff', // 다크모드
    zIndex: 9999,
  },

  // 페이지 전환 로딩 설정
  pageTransition: {
    enabled: true,
    // 로딩 스피너 위치
    position: {
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    },
    // 스피너 크기
    size: 40, // px
    // 스피너 색상
    color: '#000000',
    colorDark: '#ffffff',
    // 스피너 두께
    borderWidth: 3, // px
    // 애니메이션 속도
    animationSpeed: '0.8s',
    // 백그라운드 오버레이
    overlay: {
      enabled: true,
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      backgroundColorDark: 'rgba(0, 0, 0, 0.8)',
    },
    zIndex: 99999,
  },
} as const;
