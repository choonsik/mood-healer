import React, { useState } from 'react';
import { Sparkles, Send } from 'lucide-react';

export default function MoodForm({ onSubmit, isLoading }) {
  const [mood, setMood] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mood.trim() && !isLoading) {
      onSubmit(mood);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="glass-panel animate-fade-in" style={{ padding: '2.5rem', width: '100%', maxWidth: '650px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ textAlign: 'center' }}>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
          <Sparkles size={24} color="var(--accent)" /> 지금 기분이 어떠신가요?
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem' }}>
          솔직한 내면의 이야기를 들려주세요. 당신의 감정을 마주하고 위로해 드릴게요.
        </p>
      </div>
      
      <textarea
        className="input-glass"
        placeholder="예: 오늘 하루 종일 너무 무기력하고 왠지 모르게 눈물이 날 것 같았어..."
        value={mood}
        onChange={(e) => setMood(e.target.value)}
        disabled={isLoading}
      />
      
      <button 
        type="submit" 
        className="btn" 
        disabled={!mood.trim() || isLoading}
        style={{ width: '100%', padding: '16px', fontSize: '1.2rem', marginTop: '0.5rem' }}
      >
        {isLoading ? '감정을 읽어내는 중...' : (
          <>분석하고 솔루션 받기 <Send size={20} /></>
        )}
      </button>
    </form>
  );
}
