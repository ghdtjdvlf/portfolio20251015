// PokeAPI 연동
import { Pokemon, PokemonListResponse } from '../types/pokemon';

const BASE_URL = 'https://pokeapi.co/api/v2';

export const pokemonApi = {
  // 포켓몬 목록 가져오기
  getPokemonList: async (limit: number = 20, offset: number = 0): Promise<PokemonListResponse> => {
    const response = await fetch(`${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`);
    if (!response.ok) throw new Error('Failed to fetch Pokemon list');
    return response.json();
  },

  // 개별 포켓몬 상세 정보
  getPokemonByName: async (name: string): Promise<Pokemon> => {
    const response = await fetch(`${BASE_URL}/pokemon/${name}`);
    if (!response.ok) throw new Error(`Failed to fetch Pokemon: ${name}`);
    return response.json();
  },

  // ID로 포켓몬 가져오기
  getPokemonById: async (id: number): Promise<Pokemon> => {
    const response = await fetch(`${BASE_URL}/pokemon/${id}`);
    if (!response.ok) throw new Error(`Failed to fetch Pokemon with ID: ${id}`);
    return response.json();
  },

  // 포켓몬 검색
  searchPokemon: async (query: string): Promise<Pokemon> => {
    const response = await fetch(`${BASE_URL}/pokemon/${query.toLowerCase()}`);
    if (!response.ok) throw new Error('Pokemon not found');
    return response.json();
  }
};
