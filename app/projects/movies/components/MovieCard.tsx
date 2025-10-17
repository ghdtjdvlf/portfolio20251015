import { FC } from 'react';
import styled from '@emotion/styled';
import { useSetAtom } from 'jotai';
import { Movie } from '../types/movie';
import { movieApi } from '../api/movieApi';
import { selectedMovieIdAtom } from '../store/movieAtoms';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: FC<MovieCardProps> = ({ movie }) => {
  const setSelectedMovieId = useSetAtom(selectedMovieIdAtom);

  const handleClick = () => {
    setSelectedMovieId(movie.id);
  };

  return (
    <Card onClick={handleClick}>
      <PosterImage
        src={movieApi.getImageUrl(movie.poster_path, 'w500')}
        alt={movie.title}
        loading="lazy"
      />
      <Content>
        <Title>{movie.title}</Title>
        <RatingContainer>
          <Star>⭐</Star>
          <Rating>{movie.vote_average.toFixed(1)}</Rating>
          <VoteCount>({movie.vote_count.toLocaleString()})</VoteCount>
        </RatingContainer>
        <ReleaseDate>{movie.release_date}</ReleaseDate>
        <Overview>{movie.overview || '줄거리 정보가 없습니다.'}</Overview>
      </Content>
    </Card>
  );
};

const Card = styled.div`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  height: 100%;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
  }
`;

const PosterImage = styled.img`
  width: 100%;
  aspect-ratio: 2/3;
  object-fit: cover;
`;

const Content = styled.div`
  padding: 16px;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: #111827;
  margin-bottom: 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  margin-bottom: 8px;
`;

const Star = styled.span`
  font-size: 16px;
`;

const Rating = styled.span`
  font-size: 16px;
  font-weight: 700;
  color: #f59e0b;
`;

const VoteCount = styled.span`
  font-size: 12px;
  color: #6b7280;
`;

const ReleaseDate = styled.div`
  font-size: 14px;
  color: #6b7280;
  margin-bottom: 12px;
`;

const Overview = styled.p`
  font-size: 14px;
  color: #4b5563;
  line-height: 1.5;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  flex: 1;
`;

export default MovieCard;
