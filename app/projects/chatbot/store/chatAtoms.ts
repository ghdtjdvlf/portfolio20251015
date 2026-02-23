// Jotai atoms for chat state management
import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { ChatSession } from '../types/chat';

// LocalStorage key
const STORAGE_KEY = 'chatbot-sessions';

// Atoms with localStorage persistence
export const sessionsAtom = atomWithStorage<ChatSession[]>(STORAGE_KEY, []);

export const currentSessionIdAtom = atom<string | null>(null);

// Derived atom: current session
export const currentSessionAtom = atom(
  (get) => {
    const sessions = get(sessionsAtom);
    const currentId = get(currentSessionIdAtom);
    return sessions.find((session) => session.id === currentId) || null;
  }
);

// Helper atoms for session management
export const createSessionAtom = atom(
  null,
  (get, set) => {
    const newSession: ChatSession = {
      id: Date.now().toString(),
      title: '새로운 채팅',
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const sessions = get(sessionsAtom);
    set(sessionsAtom, [newSession, ...sessions]);
    set(currentSessionIdAtom, newSession.id);

    return newSession;
  }
);

export const deleteSessionAtom = atom(
  null,
  (get, set, sessionId: string) => {
    const sessions = get(sessionsAtom);
    const currentId = get(currentSessionIdAtom);

    // Filter out the session to delete
    const filtered = sessions.filter((s) => s.id !== sessionId);

    // Update sessions in storage
    set(sessionsAtom, filtered);

    // If deleted session was current, switch to first available or create new
    if (currentId === sessionId) {
      if (filtered.length > 0) {
        set(currentSessionIdAtom, filtered[0].id);
      } else {
        // No sessions left, create a new one
        const newSession: ChatSession = {
          id: Date.now().toString(),
          title: '새로운 채팅',
          messages: [],
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        set(sessionsAtom, [newSession]);
        set(currentSessionIdAtom, newSession.id);
      }
    }
  }
);

export const updateSessionAtom = atom(
  null,
  (get, set, updatedSession: ChatSession) => {
    const sessions = get(sessionsAtom);
    const updated = sessions.map((s) =>
      s.id === updatedSession.id ? { ...updatedSession, updatedAt: new Date() } : s
    );
    set(sessionsAtom, updated);
  }
);
