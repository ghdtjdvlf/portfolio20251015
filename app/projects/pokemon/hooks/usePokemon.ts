// TanStack Query를 활용한 Pokemon 데이터 관리
import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { pokemonApi } from '../api/pokemonApi';

// 포켓몬 목록 (무한 스크롤)
export const usePokemonList = () => {
  return useInfiniteQuery({
    queryKey: ['pokemon', 'list'],
    queryFn: ({ pageParam = 0 }) => pokemonApi.getPokemonList(20, pageParam),
    getNextPageParam: (lastPage, pages) => {
      if (!lastPage.next) return undefined;
      return pages.length * 20;
    },
    initialPageParam: 0,
  });
};

// 개별 포켓몬 상세 정보
export const usePokemon = (name: string) => {
  return useQuery({
    queryKey: ['pokemon', name],
    queryFn: () => pokemonApi.getPokemonByName(name),
    enabled: !!name,
  });
};

// ID로 포켓몬 가져오기
export const usePokemonById = (id: number | null) => {
  return useQuery({
    queryKey: ['pokemon', 'id', id],
    queryFn: () => pokemonApi.getPokemonById(id!),
    enabled: id !== null,
  });
};

// 포켓몬 검색
export const useSearchPokemon = (query: string) => {
  return useQuery({
    queryKey: ['pokemon', 'search', query],
    queryFn: () => pokemonApi.searchPokemon(query),
    enabled: query.length > 0,
    retry: false,
  });
};
