import { FC, useState } from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { usePokemonList, useSearchPokemon } from './hooks/usePokemon';
import PokemonCard from './components/PokemonCard';
import SearchBar from './components/SearchBar';
import { theme } from '../../styles/theme';

const PokemonDex: FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = usePokemonList();
  const { data: searchResult, isLoading: isSearching, error: searchError } = useSearchPokemon(searchQuery);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  // 검색 모드
  if (searchQuery) {
    return (
      <Container>
        <Header>
          <HomeButton onClick={() => navigate('/')}>
            <Arrow>←</Arrow>
            <span>홈</span>
          </HomeButton>
          <Title>🎮 포켓몬 도감</Title>
          <Subtitle>PokeAPI를 활용한 포켓몬 정보 검색</Subtitle>
        </Header>

        <SearchBar onSearch={handleSearch} />

        <ClearButton onClick={handleClearSearch}>← 전체 목록으로 돌아가기</ClearButton>

        {isSearching && <LoadingText>검색 중...</LoadingText>}

        {searchError && (
          <ErrorBox>
            ❌ 포켓몬을 찾을 수 없습니다. 이름이나 번호를 확인해주세요.
          </ErrorBox>
        )}

        {searchResult && (
          <SearchResultContainer>
            <PokemonCard pokemon={{ name: searchResult.name, url: '' }} />
          </SearchResultContainer>
        )}
      </Container>
    );
  }

  // 목록 모드
  const allPokemon = data?.pages.flatMap(page => page.results) || [];

  return (
    <Container>
      <Header>
        <HomeButton onClick={() => navigate('/')}>
          <Arrow>←</Arrow>
          <span>홈</span>
        </HomeButton>
        <Title>🎮 포켓몬 도감</Title>
        <Subtitle>카드를 클릭하면 상세 정보를 볼 수 있습니다</Subtitle>
        <TechStack>
          <TechBadge color="#FF4154">TanStack Query (Infinite Query)</TechBadge>
          <TechBadge color="#61DAFB">React Hooks</TechBadge>
          <TechBadge color="#DB7093">Emotion (Flip Card)</TechBadge>
          <TechBadge color="#3178C6">TypeScript</TechBadge>
          <TechBadge color="#646CFF">PokeAPI</TechBadge>
        </TechStack>
      </Header>

      <SearchBar onSearch={handleSearch} />

      {isLoading ? (
        <LoadingText>포켓몬 도감을 불러오는 중...</LoadingText>
      ) : (
        <>
          <Grid>
            {allPokemon.map((pokemon) => (
              <PokemonCard key={pokemon.name} pokemon={pokemon} />
            ))}
          </Grid>

          {hasNextPage && (
            <LoadMoreButton onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
              {isFetchingNextPage ? '로딩 중...' : '더 보기'}
            </LoadMoreButton>
          )}
        </>
      )}

      <FeatureList>
        <FeatureTitle>🎯 구현된 기능</FeatureTitle>
        <FeatureItem>✅ 무한 스크롤 (TanStack Query useInfiniteQuery)</FeatureItem>
        <FeatureItem>✅ 실시간 포켓몬 검색</FeatureItem>
        <FeatureItem>✅ 3D 플립 카드 애니메이션</FeatureItem>
        <FeatureItem>✅ 타입별 동적 색상 시스템</FeatureItem>
        <FeatureItem>✅ 스탯 바 시각화</FeatureItem>
        <FeatureItem>✅ 능력치, 신체 정보 표시</FeatureItem>
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
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
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

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
`;

const LoadingText = styled.div`
  text-align: center;
  font-size: 18px;
  color: #6b7280;
  padding: 48px;
`;

const LoadMoreButton = styled.button`
  display: block;
  margin: 0 auto;
  padding: 16px 48px;
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(239, 68, 68, 0.4);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const ClearButton = styled.button`
  padding: 12px 24px;
  background: #6b7280;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  margin-bottom: 24px;
  transition: all 0.2s;

  &:hover {
    background: #4b5563;
  }
`;

const SearchResultContainer = styled.div`
  max-width: 400px;
  margin: 0 auto;
`;

const ErrorBox = styled.div`
  background: #fee2e2;
  color: #dc2626;
  padding: 16px;
  border-radius: 8px;
  text-align: center;
  margin: 24px auto;
  max-width: 600px;
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

export default PokemonDex;
