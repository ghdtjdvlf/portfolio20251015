import { atom } from 'jotai';

export type FilterType = 'all' | 'active' | 'completed';

export const filterAtom = atom<FilterType>('all');
export const searchAtom = atom('');
