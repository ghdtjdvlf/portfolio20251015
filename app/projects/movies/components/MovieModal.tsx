import { FC } from 'react';
import styled from '@emotion/styled';
import { useAtom } from 'jotai';
import { selectedMovieIdAtom } from '../store/movieAtoms';
import { useMovieDetails, useGenres } from '../hooks/useMovies';
import { movieApi } from '../api/movieApi';

const MovieModal: FC = () => {
  const [selectedMovieId, setSelectedMovieId] = useAtom(selectedMovieIdAtom);
  const { data: movie, isLoading } = useMovieDetails(selectedMovieId);
  const { data: genresData } = useGenres();

  if (!selectedMovieId) return null;

  const handleClose = () => {
    setSelectedMovieId(null);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  if (isLoading) {
    return (
      <Backdrop onClick={handleBackdropClick}>
        <ModalContent>
          <LoadingText>로딩 중...</LoadingText>
        </ModalContent>
      </Backdrop>
    );
  }

  if (!movie) return null;

  const genreMap = genresData?.genres.reduce((acc, genre) => {
    acc[genre.id] = genre.name;
    return acc;
  }, {} as Record<number, string>);

  return (
    <Backdrop onClick={handleBackdropClick}>
      <ModalContent>
        <CloseButton onClick={handleClose}>✕</CloseButton>

        <BackdropImage
          src={movieApi.getImageUrl(movie.backdrop_path, 'original')}
          alt={movie.title}
        />

        <ContentSection>
          <PosterContainer>
            <PosterImage
              src={movieApi.getImageUrl(movie.poster_path, 'w500')}
              alt={movie.title}
            />
          </PosterContainer>

          <InfoSection>
            <Title>{movie.title}</Title>
            {movie.tagline && <Tagline>{movie.tagline}</Tagline>}

            <MetaInfo>
              <MetaItem>
                <Star>⭐</Star> {movie.vote_average.toFixed(1)} / 10
              </MetaItem>
              <MetaItem>📅 {movie.release_date}</MetaItem>
              <MetaItem>⏱️ {movie.runtime}분</MetaItem>
            </MetaInfo>

            <GenreContainer>
              {movie.genres.map((genre) => (
                <GenreBadge key={genre.id}>{genre.name}</GenreBadge>
              ))}
            </GenreContainer>

            <Section>
              <SectionTitle>줄거리</SectionTitle>
              <Overview>{movie.overview || '줄거리 정보가 없습니다.'}</Overview>
            </Section>

            <StatsGrid>
              <StatItem>
                <StatLabel>제작비</StatLabel>
                <StatValue>
                  {movie.budget > 0
                    ? `$${(movie.budget / 1000000).toFixed(0)}M`
                    : 'N/A'}
                </StatValue>
              </StatItem>
              <StatItem>
                <StatLabel>수익</StatLabel>
                <StatValue>
                  {movie.revenue > 0
                    ? `$${(movie.revenue / 1000000).toFixed(0)}M`
                    : 'N/A'}
                </StatValue>
              </StatItem>
              <StatItem>
                <StatLabel>상태</StatLabel>
                <StatValue>{movie.status}</StatValue>
              </StatItem>
              <StatItem>
                <StatLabel>인기도</StatLabel>
                <StatValue>{movie.popularity.toFixed(0)}</StatValue>
              </StatItem>
            </StatsGrid>
          </InfoSection>
        </ContentSection>
      </ModalContent>
    </Backdrop>
  );
};

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
  overflow-y: auto;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 16px;
  max-width: 1000px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  border: none;
  font-size: 24px;
  cursor: pointer;
  z-index: 10;
  transition: all 0.2s;

  &:hover {
    background: rgba(0, 0, 0, 0.9);
    transform: scale(1.1);
  }
`;

const BackdropImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 16px 16px 0 0;
`;

const ContentSection = styled.div`
  display: flex;
  padding: 32px;
  gap: 32px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const PosterContainer = styled.div`
  flex-shrink: 0;
`;

const PosterImage = styled.img`
  width: 200px;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
    width: 150px;
  }
`;

const InfoSection = styled.div`
  flex: 1;
`;

const Title = styled.h2`
  font-size: 32px;
  font-weight: 700;
  color: #111827;
  margin-bottom: 8px;
`;

const Tagline = styled.p`
  font-size: 16px;
  font-style: italic;
  color: #6b7280;
  margin-bottom: 16px;
`;

const MetaInfo = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
  flex-wrap: wrap;
`;

const MetaItem = styled.span`
  font-size: 14px;
  color: #4b5563;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const Star = styled.span`
  font-size: 16px;
`;

const GenreContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 24px;
  flex-wrap: wrap;
`;

const GenreBadge = styled.span`
  padding: 6px 12px;
  background: #dbeafe;
  color: #1e40af;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 600;
`;

const Section = styled.div`
  margin-bottom: 24px;
`;

const SectionTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: #111827;
  margin-bottom: 12px;
`;

const Overview = styled.p`
  font-size: 15px;
  color: #4b5563;
  line-height: 1.6;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 16px;
`;

const StatItem = styled.div`
  background: #f9fafb;
  padding: 16px;
  border-radius: 8px;
  text-align: center;
`;

const StatLabel = styled.div`
  font-size: 12px;
  color: #6b7280;
  margin-bottom: 4px;
`;

const StatValue = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: #111827;
`;

const LoadingText = styled.div`
  padding: 48px;
  text-align: center;
  color: #6b7280;
  font-size: 18px;
`;

export default MovieModal;
