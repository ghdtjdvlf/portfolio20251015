// TMDB API 연동
import { Movie, MovieDetails, MovieListResponse, Genre } from '../types/movie';

// TMDB API Key (공개 키 - 데모용)
const API_KEY = '8265bd1679663a7ea12ac168da84d2e8';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

export const movieApi = {
  // 인기 영화
  getPopularMovies: async (page: number = 1): Promise<MovieListResponse> => {
    const response = await fetch(
      `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=ko-KR&page=${page}`
    );
    if (!response.ok) throw new Error('Failed to fetch popular movies');
    return response.json();
  },

  // 평점 높은 영화
  getTopRatedMovies: async (page: number = 1): Promise<MovieListResponse> => {
    const response = await fetch(
      `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=ko-KR&page=${page}`
    );
    if (!response.ok) throw new Error('Failed to fetch top rated movies');
    return response.json();
  },

  // 개봉 예정 영화
  getUpcomingMovies: async (page: number = 1): Promise<MovieListResponse> => {
    const response = await fetch(
      `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=ko-KR&page=${page}`
    );
    if (!response.ok) throw new Error('Failed to fetch upcoming movies');
    return response.json();
  },

  // 현재 상영중
  getNowPlayingMovies: async (page: number = 1): Promise<MovieListResponse> => {
    const response = await fetch(
      `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=ko-KR&page=${page}`
    );
    if (!response.ok) throw new Error('Failed to fetch now playing movies');
    return response.json();
  },

  // 영화 상세 정보
  getMovieDetails: async (movieId: number): Promise<MovieDetails> => {
    const response = await fetch(
      `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=ko-KR`
    );
    if (!response.ok) throw new Error('Failed to fetch movie details');
    return response.json();
  },

  // 영화 검색
  searchMovies: async (query: string, page: number = 1): Promise<MovieListResponse> => {
    const response = await fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&language=ko-KR&query=${encodeURIComponent(query)}&page=${page}`
    );
    if (!response.ok) throw new Error('Failed to search movies');
    return response.json();
  },

  // 장르 목록
  getGenres: async (): Promise<{ genres: Genre[] }> => {
    const response = await fetch(
      `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=ko-KR`
    );
    if (!response.ok) throw new Error('Failed to fetch genres');
    return response.json();
  },

  // 이미지 URL 생성
  getImageUrl: (path: string | null, size: 'w200' | 'w500' | 'original' = 'w500'): string => {
    if (!path) return 'https://via.placeholder.com/500x750?text=No+Image';
    return `${IMAGE_BASE_URL}/${size}${path}`;
  },
};
