const { GoogleGenAI } = require('@google/genai');

// This file runs on Vercel's Serverless environment (CommonJS).
module.exports = async function handler(req, res) {
  // 1. CORS Headers for Hybrid/Dual Deployment
  const allowedOrigins = ['https://choonsik.github.io', 'https://mood-healer.vercel.app'];
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS,POST');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { moodText } = req.body;

    if (!moodText) {
      return res.status(400).json({ error: 'moodText is required' });
    }

    // Initialize Gemini AI securely from server-side env vars
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      console.error('GEMINI_API_KEY is missing on the server.');
      return res.status(500).json({ error: 'Server configuration error.' });
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

    // Call Gemini API
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const parsedData = JSON.parse(response.text);
    res.status(200).json(parsedData);
  } catch (error) {
    console.error('Server API Error:', error);

    // Check for Quota Exhaustion
    const errorMessage = error.message?.toLowerCase() || '';
    if (error.status === 429 || errorMessage.includes('quota') || errorMessage.includes('429')) {
      return res.status(429).json({ error: 'QUOTA_EXHAUSTED' });
    }

    // Generic server error
    res.status(500).json({ error: 'Internal Server Error', detail: error.message });
  }
};
