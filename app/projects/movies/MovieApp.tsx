import { FC } from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { useAtomValue } from 'jotai';
import { selectedCategoryAtom, searchQueryAtom } from './store/movieAtoms';
import { useMoviesByCategory, useSearchMovies } from './hooks/useMovies';
import MovieCard from './components/MovieCard';
import MovieModal from './components/MovieModal';
import CategoryTabs from './components/CategoryTabs';
import SearchBar from './components/SearchBar';
import { theme } from '../../styles/theme';

const MovieApp: FC = () => {
  const navigate = useNavigate();
  const selectedCategory = useAtomValue(selectedCategoryAtom);
  const searchQuery = useAtomValue(searchQueryAtom);

  // 검색 모드 vs 카테고리 모드
  const {
    data: categoryData,
    fetchNextPage: fetchNextCategoryPage,
    hasNextPage: hasNextCategoryPage,
    isFetchingNextPage: isFetchingNextCategoryPage,
    isLoading: isCategoryLoading,
  } = useMoviesByCategory(selectedCategory);

  const {
    data: searchData,
    fetchNextPage: fetchNextSearchPage,
    hasNextPage: hasNextSearchPage,
    isFetchingNextPage: isFetchingNextSearchPage,
    isLoading: isSearchLoading,
  } = useSearchMovies(searchQuery);

  const isSearchMode = searchQuery.length > 0;
  const data = isSearchMode ? searchData : categoryData;
  const fetchNextPage = isSearchMode ? fetchNextSearchPage : fetchNextCategoryPage;
  const hasNextPage = isSearchMode ? hasNextSearchPage : hasNextCategoryPage;
  const isFetchingNextPage = isSearchMode ? isFetchingNextSearchPage : isFetchingNextCategoryPage;
  const isLoading = isSearchMode ? isSearchLoading : isCategoryLoading;

  const allMovies = data?.pages.flatMap(page => page.results) || [];

  return (
    <Container>
      <Header>
        <HomeButton onClick={() => navigate('/')}>
          <Arrow>←</Arrow>
          <span>홈</span>
        </HomeButton>
        <Title>🎬 영화 추천</Title>
        <Subtitle>TMDB API를 활용한 영화 정보 및 추천 시스템</Subtitle>
        <TechStack>
          <TechBadge color="#FF4154">TanStack Query (Infinite)</TechBadge>
          <TechBadge color="#7C3AED">Jotai (Category/Search)</TechBadge>
          <TechBadge color="#61DAFB">React</TechBadge>
          <TechBadge color="#DB7093">Emotion (Modal)</TechBadge>
          <TechBadge color="#3178C6">TypeScript</TechBadge>
          <TechBadge color="#01D277">TMDB API</TechBadge>
        </TechStack>
      </Header>

      <SearchBar />

      {!isSearchMode && <CategoryTabs />}

      {isSearchMode && (
        <SearchResultHeader>
          "{searchQuery}" 검색 결과 ({allMovies.length}개)
        </SearchResultHeader>
      )}

      {isLoading ? (
        <LoadingText>영화를 불러오는 중...</LoadingText>
      ) : allMovies.length === 0 ? (
        <EmptyState>
          {isSearchMode
            ? '검색 결과가 없습니다.'
            : '영화를 불러올 수 없습니다.'}
        </EmptyState>
      ) : (
        <>
          <Grid>
            {allMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </Grid>

          {hasNextPage && (
            <LoadMoreButton
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
            >
              {isFetchingNextPage ? '로딩 중...' : '더 보기'}
            </LoadMoreButton>
          )}
        </>
      )}

      <MovieModal />

      <FeatureList>
        <FeatureTitle>🎯 구현된 기능</FeatureTitle>
        <FeatureItem>✅ 4가지 카테고리 필터링 (인기/평점/개봉예정/상영중)</FeatureItem>
        <FeatureItem>✅ 실시간 영화 검색</FeatureItem>
        <FeatureItem>✅ 무한 스크롤 (페이지네이션)</FeatureItem>
        <FeatureItem>✅ 영화 상세 모달 (클릭 시)</FeatureItem>
        <FeatureItem>✅ 평점, 개봉일, 러닝타임, 제작비, 수익 정보</FeatureItem>
        <FeatureItem>✅ 장르 뱃지 시스템</FeatureItem>
        <FeatureItem>✅ Jotai로 카테고리/검색 상태 관리</FeatureItem>
      </FeatureList>
    </Container>
  );
};

const Container = styled.div`
  padding: 40px 20px;
  max-width: 1400px;
  margin: 0 auto;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 48px;
  position: relative;
`;

const HomeButton = styled.button`
  position: absolute;
  left: 0;
  top: 0;
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

const Title = styled.h1`
  font-size: 48px;
  font-weight: 700;
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 12px;
`;

const Subtitle = styled.p`
  font-size: 18px;
  color: #6b7280;
  margin-bottom: 24px;
`;

const TechStack = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 16px;
`;

const TechBadge = styled.span<{ color: string }>`
  padding: 6px 12px;
  background: ${props => props.color};
  color: white;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
`;

const SearchResultHeader = styled.div`
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  color: #111827;
  margin-bottom: 24px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
`;

const LoadingText = styled.div`
  text-align: center;
  font-size: 18px;
  color: #6b7280;
  padding: 48px;
`;

const EmptyState = styled.div`
  text-align: center;
  font-size: 18px;
  color: #9ca3af;
  padding: 48px;
`;

const LoadMoreButton = styled.button`
  display: block;
  margin: 0 auto;
  padding: 16px 48px;
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(59, 130, 246, 0.4);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const FeatureList = styled.div`
  margin-top: 64px;
  padding: 32px;
  background: #f9fafb;
  border-radius: 16px;
  border: 2px solid #e5e7eb;
`;

const FeatureTitle = styled.h3`
  font-size: 24px;
  font-weight: 700;
  color: #111827;
  margin-bottom: 16px;
`;

const FeatureItem = styled.div`
  font-size: 16px;
  color: #4b5563;
  padding: 8px 0;
  padding-left: 24px;
`;

export default MovieApp;
