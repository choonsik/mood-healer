import React, { useState } from 'react';
import MoodForm from './components/MoodForm';
import ResultCard from './components/ResultCard';
import Loader from './components/Loader';
import { analyzeMood } from './lib/gemini';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleMoodSubmit = async (moodText) => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await analyzeMood(moodText);
      setResult(data);
    } catch (err) {
      if (err.code === 'QUOTA_EXHAUSTED') {
        setError({ type: 'quota', message: err.message });
      } else {
        setError({ type: 'general', message: err.message || '알 수 없는 오류가 발생했습니다.' });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setError(null);
  };

  return (
    <div style={{ width: '100%', maxWidth: '850px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <header style={{ textAlign: 'center', marginBottom: '1rem', marginTop: '1rem' }} className="animate-fade-in">
        <h1 style={{ fontSize: '3.5rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.8rem', letterSpacing: '-1px' }}>
          Mood Healer
        </h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', fontWeight: 300 }}>
          당신의 마음을 깊이 이해하고 따뜻한 위로와 해결책을 제안합니다.
        </p>
      </header>

      {!result && !isLoading && error?.type !== 'quota' && (
        <MoodForm onSubmit={handleMoodSubmit} isLoading={isLoading} />
      )}

      {isLoading && <Loader />}

      {error?.type === 'general' && (
        <div className="glass-panel animate-fade-in delay-100" style={{ padding: '1.5rem', background: 'rgba(252, 129, 129, 0.2)', border: '1px solid rgba(252, 129, 129, 0.4)', color: '#c53030', display: 'flex', alignItems: 'center', gap: '1rem', justifyContent: 'center' }}>
          <p style={{ fontWeight: 600, fontSize: '1.1rem' }}>{error.message}</p>
        </div>
      )}

      {error?.type === 'quota' && (
        <div className="glass-panel animate-fade-in delay-100" style={{ padding: '3rem', width: '100%', maxWidth: '650px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem', textAlign: 'center', background: 'rgba(255, 255, 255, 0.35)', border: '2px solid rgba(255, 255, 255, 0.6)' }}>
          <div style={{ background: 'var(--text-muted)', width: '64px', height: '64px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', fontSize: '24px', fontWeight: 'bold' }}>!</div>
          <h2 style={{ color: 'var(--text-main)', fontSize: '1.8rem', fontWeight: 600 }}>오늘은 위로의 시간이 다 되었네요</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', lineHeight: 1.6 }}>
            {error.message}<br/>AI가 너무 많은 따뜻한 마음을 나누느라 조금 지쳤나봐요.<br/>충분히 휴식한 뒤에 다시 만나요 🌙
          </p>
          <button onClick={handleReset} className="btn" style={{ marginTop: '1rem' }}>처음으로 돌아가기</button>
        </div>
      )}

      {!isLoading && result && <ResultCard result={result} onReset={handleReset} />}
      
      <footer style={{ marginTop: 'auto', textAlign: 'center', padding: '2rem 0', color: 'var(--text-muted)', fontSize: '0.9rem', opacity: 0.8 }} className="animate-fade-in delay-300">
        <p>※ 이 서비스의 심리학적 분석은 AI 기반이므로 전문적인 진단과 상담을 완벽히 대체할 수 없습니다.</p>
      </footer>
    </div>
  );
}

export default App;
