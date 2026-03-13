import React from 'react';
import { Loader2 } from 'lucide-react';

export default function Loader() {
  return (
    <div className="glass-panel animate-fade-in" style={{ padding: '3rem', margin: '2rem auto 0', maxWidth: '650px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem', width: '100%' }}>
      <Loader2 className="animate-pulse" size={56} color="var(--accent)" style={{ animation: 'spin 2s linear infinite' }} />
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
      <p style={{ color: 'var(--text-main)', fontSize: '1.2rem', fontWeight: 500 }}>
        마음을 읽고 심리학적 분석을 진행 중입니다...<br />잠시만 기다려주세요.
      </p>
    </div>
  );
}
