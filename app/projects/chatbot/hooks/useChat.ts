// TanStack Query hook for chat functionality
import { useMutation } from '@tanstack/react-query';
import { useAtom, useSetAtom } from 'jotai';
import { geminiApi } from '../api/geminiApi';
import {
  currentSessionAtom,
  updateSessionAtom,
  currentSessionIdAtom
} from '../store/chatAtoms';
import { Message } from '../types/chat';

export const useChat = () => {
  const [currentSession] = useAtom(currentSessionAtom);
  const [currentSessionId] = useAtom(currentSessionIdAtom);
  const updateSession = useSetAtom(updateSessionAtom);

  const sendMessageMutation = useMutation({
    mutationFn: async ({ prompt, assistantMessageId }: { prompt: string; assistantMessageId: string }) => {
      if (!currentSession) {
        throw new Error('활성 세션이 없습니다.');
      }

      // Get conversation history (excluding loading messages)
      const history = currentSession.messages.filter(msg => !msg.isLoading && msg.id !== assistantMessageId);

      // Call Gemini API (non-streaming for reliability)
      const response = await geminiApi.sendMessage({ prompt, history });

      // Simulate typing effect by gradually revealing the text
      const fullText = response.text;
      const words = fullText.split('');
      let currentIndex = 0;

      const typingInterval = setInterval(() => {
        if (currentIndex < words.length) {
          currentIndex += Math.floor(Math.random() * 3) + 1; // Type 1-3 characters at a time
          if (currentIndex > words.length) currentIndex = words.length;

          const displayText = words.slice(0, currentIndex).join('');

          const updatedMessages = currentSession.messages.map(msg =>
            msg.id === assistantMessageId
              ? { ...msg, content: displayText, isLoading: true }
              : msg
          );

          const updatedSession = {
            ...currentSession,
            messages: updatedMessages,
          };

          updateSession(updatedSession);
        } else {
          clearInterval(typingInterval);
        }
      }, 30); // Type every 30ms

      // Wait for typing to complete
      await new Promise<void>((resolve) => {
        const checkComplete = setInterval(() => {
          if (currentIndex >= words.length) {
            clearInterval(checkComplete);
            clearInterval(typingInterval);
            resolve();
          }
        }, 50);
      });

      return response.text;
    },
    onMutate: async ({ prompt, assistantMessageId }: { prompt: string; assistantMessageId: string }) => {
      if (!currentSession) return;

      const now = Date.now();

      // Create user message
      const userMessage: Message = {
        id: `user-${now}`,
        role: 'user',
        content: prompt,
        timestamp: new Date(),
      };

      // Create streaming assistant message
      const streamingMessage: Message = {
        id: assistantMessageId,
        role: 'assistant',
        content: '',
        timestamp: new Date(),
        isLoading: true,
      };

      // Update session with optimistic messages
      const updatedSession = {
        ...currentSession,
        messages: [...currentSession.messages, userMessage, streamingMessage],
        title: currentSession.messages.length === 0
          ? prompt.slice(0, 30) + (prompt.length > 30 ? '...' : '')
          : currentSession.title,
      };

      updateSession(updatedSession);

      return { userMessage, assistantMessageId };
    },
    onSuccess: (responseText, variables, context) => {
      if (!currentSession || !context) return;

      // Mark streaming as complete
      const assistantMessage: Message = {
        id: context.assistantMessageId,
        role: 'assistant',
        content: responseText,
        timestamp: new Date(),
        isLoading: false,
      };

      const updatedMessages = currentSession.messages.map(msg =>
        msg.id === context.assistantMessageId ? assistantMessage : msg
      );

      const updatedSession = {
        ...currentSession,
        messages: updatedMessages,
      };

      updateSession(updatedSession);
    },
    onError: (error, variables, context) => {
      if (!currentSession || !context) return;

      // Remove loading message and show error
      const errorMessage: Message = {
        id: context.assistantMessageId,
        role: 'assistant',
        content: `오류: ${error instanceof Error ? error.message : '알 수 없는 오류'}`,
        timestamp: new Date(),
        isLoading: false,
      };

      const updatedMessages = currentSession.messages.map(msg =>
        msg.id === context.assistantMessageId ? errorMessage : msg
      );

      const updatedSession = {
        ...currentSession,
        messages: updatedMessages,
      };

      updateSession(updatedSession);
    },
  });

  const sendMessage = (prompt: string) => {
    // Generate unique assistant message ID with random suffix to prevent collisions
    const assistantMessageId = `assistant-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    sendMessageMutation.mutate({ prompt, assistantMessageId });
  };

  return {
    currentSession,
    currentSessionId,
    sendMessage,
    isLoading: sendMessageMutation.isPending,
  };
};
