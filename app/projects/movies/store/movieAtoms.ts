// Jotai - 영화 앱 전역 상태
import { atom } from 'jotai';
import { MovieCategory } from '../types/movie';

// 선택된 카테고리
export const selectedCategoryAtom = atom<MovieCategory>('popular');

// 검색어
export const searchQueryAtom = atom<string>('');

// 선택된 영화 ID (모달용)
export const selectedMovieIdAtom = atom<number | null>(null);
