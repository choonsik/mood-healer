import React from 'react';
import { Heart, Activity, CheckCircle, RotateCcw } from 'lucide-react';

export default function ResultCard({ result, onReset }) {
  if (!result) return null;

  return (
    <div className="glass-panel animate-fade-in delay-100" style={{ padding: '2.5rem', width: '100%', maxWidth: '750px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Analysis Section */}
      <section>
        <h3 style={{ fontSize: '1.5rem', color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.2rem' }}>
          <Heart size={24} /> 심리학적 통찰
        </h3>
        <p style={{ lineHeight: 1.8, fontSize: '1.15rem', color: 'var(--text-main)', background: 'rgba(255,255,255,0.4)', padding: '1.5rem', borderRadius: '16px', boxShadow: 'inset 0 2px 5px rgba(0,0,0,0.02)' }}>
          {result.analysis}
        </p>
      </section>

      {/* Solutions Section */}
      <section>
        <h3 style={{ fontSize: '1.5rem', color: 'var(--info)', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.2rem' }}>
          <Activity size={24} /> 일상 속 작은 해결책
        </h3>
        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {result.solutions.map((solution, index) => (
            <li key={index} className="animate-fade-in" style={{ animationDelay: `${200 + index * 100}ms`, display: 'flex', alignItems: 'flex-start', gap: '12px', background: 'rgba(255,255,255,0.5)', padding: '1.2rem', borderRadius: '16px', fontSize: '1.1rem', lineHeight: 1.6, border: '1px solid rgba(255,255,255,0.8)' }}>
              <CheckCircle size={22} color="var(--info)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <span>{solution}</span>
            </li>
          ))}
        </ul>
      </section>

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1.5rem' }}>
        <button onClick={onReset} className="btn" style={{ background: 'var(--text-muted)' }}>
          <RotateCcw size={18} /> 다른 감정 털어놓기
        </button>
      </div>
    </div>
  );
}
