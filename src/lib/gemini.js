export async function analyzeMood(moodText) {
  try {
    // Determine the base URL depending on the environment
    // In local dev, Vite proxy handles it. In production on GH pages, we must point to the Vercel app URL.
    // For now, we will use a dynamically determined path or a strict production Vercel URL.
    const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    
    // You'll need to replace this with your actual Vercel deployment URL during the final Vercel step
    const API_BASE_URL = isLocalhost ? '' : 'https://mood-healer-api.vercel.app'; 
    
    const response = await fetch(`${API_BASE_URL}/api/analyze`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ moodText })
    });

    if (!response.ok) {
      if (response.status === 429) {
        const quotaError = new Error('무료 토큰 제공량이 모두 소진되었습니다. 잠시 후 다시 시도하거나 내일 다시 찾아주세요.');
        quotaError.code = 'QUOTA_EXHAUSTED';
        throw quotaError;
      }
      throw new Error(`Server returned ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch API Error:", error);
    if (error.code === 'QUOTA_EXHAUSTED') {
      throw error;
    }
    throw new Error('기분 분석 중 서버 통신 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
  }
}
