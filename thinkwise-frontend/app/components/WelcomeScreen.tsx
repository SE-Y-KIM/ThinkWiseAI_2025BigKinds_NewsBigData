'use client';

import { useState } from 'react';
import { Send } from 'lucide-react';
// MacroIndicatorWidget을 다시 import 합니다.
import MacroIndicatorWidget from './MacroIndicatorWidget';

interface WelcomeScreenProps {
  onStartChat: (message: string) => void;
}

export default function WelcomeScreen({ onStartChat }: WelcomeScreenProps) {
  const [input, setInput] = useState('');

  const handleStart = () => {
    if (input.trim()) onStartChat(input);
  };

  return (
    <div className="h-full flex flex-col justify-between items-center text-center p-8">
      {/* 상단 빈 공간 */}
      <div />

      {/* 중앙 콘텐츠 */}
      <div className="w-full max-w-2xl">
        <h1 
          className="text-5xl font-bold tracking-tight text-primary" 
          style={{ textShadow: '0 0 10px rgba(214, 167, 86, 0.5)' }}
        >
          ThinkWise AI
        </h1>
        <p className="text-text-secondary mt-4 mb-10">데이터 기반의 합리적인 투자 판단을 돕습니다.</p>
        
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleStart()}
            className="w-full p-5 pr-16 bg-surface border border-border-color rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-primary text-text-primary placeholder-text-secondary"
            placeholder="예: 삼성전자와 SK하이닉스 실적 비교"
          />
          <button
            onClick={handleStart}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-primary text-background rounded-md hover:opacity-90"
          >
            <Send size={20} />
          </button>
        </div>
      </div>

      {/* 하단 거시경제 지표 */}
      <MacroIndicatorWidget />
    </div>
  );
}
