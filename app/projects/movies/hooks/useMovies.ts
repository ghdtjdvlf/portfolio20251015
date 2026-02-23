// TanStack Query를 활용한 영화 데이터 관리
import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { movieApi } from '../api/movieApi';
import { MovieCategory } from '../types/movie';

// 카테고리별 영화 목록 (무한 스크롤)
export const useMoviesByCategory = (category: MovieCategory) => {
  const apiMap = {
    popular: movieApi.getPopularMovies,
    top_rated: movieApi.getTopRatedMovies,
    upcoming: movieApi.getUpcomingMovies,
    now_playing: movieApi.getNowPlayingMovies,
  };

  return useInfiniteQuery({
    queryKey: ['movies', category],
    queryFn: ({ pageParam = 1 }) => apiMap[category](pageParam),
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
  });
};

// 영화 상세 정보
export const useMovieDetails = (movieId: number | null) => {
  return useQuery({
    queryKey: ['movie', movieId],
    queryFn: () => movieApi.getMovieDetails(movieId!),
    enabled: movieId !== null,
  });
};

// 영화 검색
export const useSearchMovies = (query: string) => {
  return useInfiniteQuery({
    queryKey: ['movies', 'search', query],
    queryFn: ({ pageParam = 1 }) => movieApi.searchMovies(query, pageParam),
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
    enabled: query.length > 0,
    initialPageParam: 1,
  });
};

// 장르 목록
export const useGenres = () => {
  return useQuery({
    queryKey: ['genres'],
    queryFn: movieApi.getGenres,
    staleTime: 1000 * 60 * 60, // 1시간
  });
};
