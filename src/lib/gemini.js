import { GoogleGenAI } from '@google/genai';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

export async function analyzeMood(moodText) {
  if (!apiKey || apiKey === 'your_api_key_here') {
    throw new Error('Gemini API 키가 설정되지 않았습니다. .env 파일에 VITE_GEMINI_API_KEY를 입력해주세요.');
  }

  const ai = new GoogleGenAI({ apiKey });

  const prompt = `You are an empathetic, insightful psychologist. The user has shared the following mood/feelings: "${moodText}".
  
Please provide a structured response in Korean with two parts:
1. "심리학적 분석" (Psychological Analysis): Explain gracefully why they might be feeling this way, validating their emotions. Keep it under 3-4 sentences.
2. "쉬운 극복 방법" (Easy Actionable Solutions): Suggest 3 highly actionable, simple, and soothing methods they can do right now to feel better. Provide them as a bulleted list.

Response strictly in JSON format matching this structure:
{
  "analysis": "...",
  "solutions": ["...", "...", "..."]
}`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error('기분 분석 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
  }
}
