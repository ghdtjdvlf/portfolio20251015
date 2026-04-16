// Chat types for Gemini chatbot

export type MessageRole = 'user' | 'assistant';

export interface Message {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: Date;
  isLoading?: boolean;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

export interface GeminiRequest {
  prompt: string;
  history?: Message[];
}

export interface GeminiResponse {
  text: string;
}
