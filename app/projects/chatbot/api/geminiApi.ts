// Gemini API integration
import { GeminiRequest, GeminiResponse, Message } from '../types/chat';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const API_URL = 'https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent';
const STREAM_API_URL = 'https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:streamGenerateContent';

// 쇼핑몰 챗봇 시스템 프롬프트
const SYSTEM_PROMPT = `[중요 역할 설정]
당신은 한국 온라인 쇼핑몰의 친절한 고객 지원 상담사입니다.

[필수 응답 규칙]
1. 반드시 100% 한국어로만 답변하세요
2. 영어나 다른 언어 설명은 절대 하지 마세요
3. 항상 존댓말(~습니다, ~해요)을 사용하세요
4. 쇼핑몰 상담사의 톤으로 친절하게 대화하세요
5. 쇼핑몰 이름은 필성몰이야 
6.  **주말 및 공휴일** 같이 양 끝에 **을 추가하는 말투는 쓰면 안돼 

[당신의 역할]
- 배송/주문/반품 등 쇼핑 관련 문의 응답
- 상품 추천 및 정보 안내
- 할인/쿠폰 정보 안내
- 고객 불편 사항 해결

[응답 스타일]
- 간단한 인사에도 쇼핑몰 상담사답게 응대
- 이모지 적절히 사용 (😊, 🛍️, 📦 등)
- 친근하면서도 전문적인 톤 유지

[예시]
고객: "안녕하세요"
상담사: "안녕하세요! 쇼핑 도우미입니다 😊 무엇을 도와드릴까요?"`;

const ROLE_REMINDER = `당신은 한국 쇼핑몰 상담사입니다. 반드시 한국어로만 답변하세요.`;

interface GeminiAPIResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string;
      }>;
    };
  }>;
}

// Convert chat history to Gemini format
const formatHistory = (messages: Message[]) => {
  return messages.map((msg) => ({
    role: msg.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: msg.content }],
  }));
};

export const geminiApi = {
  // Send message to Gemini API with streaming support
  sendMessageStream: async ({
    prompt,
    history = [],
    onChunk
  }: GeminiRequest & { onChunk?: (text: string) => void }): Promise<GeminiResponse> => {
    if (!API_KEY) {
      throw new Error('Gemini API 키가 설정되지 않았습니다. .env 파일에 VITE_GEMINI_API_KEY를 추가해주세요.');
    }

    try {
      // 첫 메시지일 경우 시스템 프롬프트를 포함
      const contents = [];

      if (history.length === 0) {
        // 첫 대화: 전체 시스템 프롬프트 포함
        contents.push({
          role: 'user',
          parts: [{ text: `${SYSTEM_PROMPT}\n\n고객: ${prompt}` }],
        });
      } else {
        // 이후 대화: 역할 리마인더와 함께 이어가기
        contents.push(
          ...formatHistory(history),
          {
            role: 'user',
            parts: [{ text: `${ROLE_REMINDER}\n\n고객: ${prompt}` }],
          }
        );
      }

      const response = await fetch(`${STREAM_API_URL}?key=${API_KEY}&alt=sse`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents,
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 2048,
          },
          safetySettings: [
            {
              category: 'HARM_CATEGORY_HARASSMENT',
              threshold: 'BLOCK_MEDIUM_AND_ABOVE',
            },
            {
              category: 'HARM_CATEGORY_HATE_SPEECH',
              threshold: 'BLOCK_MEDIUM_AND_ABOVE',
            },
            {
              category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
              threshold: 'BLOCK_MEDIUM_AND_ABOVE',
            },
            {
              category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
              threshold: 'BLOCK_MEDIUM_AND_ABOVE',
            },
          ],
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'API 요청 실패');
      }

      if (!response.body) {
        throw new Error('스트림을 받을 수 없습니다.');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let fullText = '';
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();

        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');

        // Keep the last incomplete line in the buffer
        buffer = lines.pop() || '';

        for (const line of lines) {
          const trimmedLine = line.trim();

          if (trimmedLine.startsWith('data: ')) {
            try {
              const jsonStr = trimmedLine.slice(6);
              const data: GeminiAPIResponse = JSON.parse(jsonStr);

              if (data.candidates && data.candidates.length > 0) {
                const parts = data.candidates[0].content.parts;
                if (parts && parts.length > 0 && parts[0].text) {
                  const text = parts[0].text;
                  fullText += text;

                  // Call onChunk callback with accumulated text
                  if (onChunk) {
                    onChunk(fullText);
                  }
                }
              }
            } catch (e) {
              // Skip invalid JSON lines
              console.warn('Failed to parse streaming chunk:', e);
              continue;
            }
          }
        }
      }

      if (!fullText) {
        throw new Error('응답을 받지 못했습니다.');
      }

      return { text: fullText };
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('알 수 없는 오류가 발생했습니다.');
    }
  },

  // Legacy non-streaming method (kept for backwards compatibility)
  sendMessage: async ({ prompt, history = [] }: GeminiRequest): Promise<GeminiResponse> => {
    if (!API_KEY) {
      throw new Error('Gemini API 키가 설정되지 않았습니다. .env 파일에 VITE_GEMINI_API_KEY를 추가해주세요.');
    }

    try {
      const contents = [];

      if (history.length === 0) {
        contents.push({
          role: 'user',
          parts: [{ text: `${SYSTEM_PROMPT}\n\n고객: ${prompt}` }],
        });
      } else {
        contents.push(
          ...formatHistory(history),
          {
            role: 'user',
            parts: [{ text: `${ROLE_REMINDER}\n\n고객: ${prompt}` }],
          }
        );
      }

      const response = await fetch(`${API_URL}?key=${API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents,
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 2048,
          },
          safetySettings: [
            {
              category: 'HARM_CATEGORY_HARASSMENT',
              threshold: 'BLOCK_MEDIUM_AND_ABOVE',
            },
            {
              category: 'HARM_CATEGORY_HATE_SPEECH',
              threshold: 'BLOCK_MEDIUM_AND_ABOVE',
            },
            {
              category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
              threshold: 'BLOCK_MEDIUM_AND_ABOVE',
            },
            {
              category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
              threshold: 'BLOCK_MEDIUM_AND_ABOVE',
            },
          ],
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'API 요청 실패');
      }

      const data: GeminiAPIResponse = await response.json();

      if (!data.candidates || data.candidates.length === 0) {
        throw new Error('응답을 받지 못했습니다.');
      }

      const text = data.candidates[0].content.parts[0].text;

      return { text };
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('알 수 없는 오류가 발생했습니다.');
    }
  },
};
