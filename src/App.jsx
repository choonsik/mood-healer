import React, { useState } from 'react';
import MoodForm from './components/MoodForm';
import ResultCard from './components/ResultCard';
import Loader from './components/Loader';
import { analyzeMood } from './lib/gemini';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleMoodSubmit = async (moodText) => {
    setIsLoading(true);
    setError('');
    setResult(null);

    try {
      const data = await analyzeMood(moodText);
      setResult(data);
    } catch (err) {
      setError(err.message || '알 수 없는 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setError('');
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

      {!result && !isLoading && (
        <MoodForm onSubmit={handleMoodSubmit} isLoading={isLoading} />
      )}

      {isLoading && <Loader />}

      {error && (
        <div className="glass-panel animate-fade-in delay-100" style={{ padding: '1.5rem', background: 'rgba(252, 129, 129, 0.2)', border: '1px solid rgba(252, 129, 129, 0.4)', color: '#c53030', display: 'flex', alignItems: 'center', gap: '1rem', justifyContent: 'center' }}>
          <p style={{ fontWeight: 600, fontSize: '1.1rem' }}>{error}</p>
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
