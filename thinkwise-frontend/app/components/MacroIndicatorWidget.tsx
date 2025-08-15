'use client';

import { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, RefreshCw } from 'lucide-react';

interface MacroIndicator {
  name: string;
  value: string;
  change: string;
  isUp: boolean;
  symbol: string;
  lastUpdated: string;
  chartData: number[]; // 차트 데이터 추가
}

// 간단한 차트 데이터 생성 함수
const generateChartData = (isUp: boolean, volatility: number = 0.1): number[] => {
  const data = [];
  let currentValue = 50; // 시작값
  
  for (let i = 0; i < 20; i++) {
    // 트렌드 방향에 따른 변화
    const trend = isUp ? 1 : -1;
    const change = (Math.random() - 0.5) * volatility * 10 * trend;
    currentValue = Math.max(10, Math.min(90, currentValue + change));
    data.push(currentValue);
  }
  
  return data;
};

// 기본 지표 데이터 (API 연동 전까지 사용)
const defaultIndicators: MacroIndicator[] = [
  { 
    name: '코스피', 
    value: '3,196.85', 
    change: '+2.85%', 
    isUp: true, 
    symbol: 'KOSPI',
    lastUpdated: new Date().toLocaleTimeString('ko-KR'),
    chartData: generateChartData(true, 0.15)
  },
  { 
    name: '미국 10년', 
    value: '2.85%', 
    change: '-0.21%', 
    isUp: false, 
    symbol: 'US10Y',
    lastUpdated: new Date().toLocaleTimeString('ko-KR'),
    chartData: generateChartData(false, 0.12)
  },
  { 
    name: 'WTI', 
    value: '$65.16', 
    change: '-0.21%', 
    isUp: false, 
    symbol: 'WTI',
    lastUpdated: new Date().toLocaleTimeString('ko-KR'),
    chartData: generateChartData(false, 0.18)
  },
  { 
    name: '환율(USD)', 
    value: '1,386.50', 
    change: '+0.15%', 
    isUp: true, 
    symbol: 'USDKRW',
    lastUpdated: new Date().toLocaleTimeString('ko-KR'),
    chartData: generateChartData(true, 0.08)
  },
];

// 간단한 SVG 차트 컴포넌트
const SimpleChart = ({ data, isUp, className = "" }: { data: number[], isUp: boolean, className?: string }) => {
  if (!data || data.length < 2) return null;
  
  const width = 80;
  const height = 30;
  const padding = 5;
  
  const chartWidth = width - (padding * 2);
  const chartHeight = height - (padding * 2);
  
  const maxValue = Math.max(...data);
  const minValue = Math.min(...data);
  const valueRange = maxValue - minValue || 1;
  
  const points = data.map((value, index) => {
    const x = padding + (index / (data.length - 1)) * chartWidth;
    const y = padding + ((maxValue - value) / valueRange) * chartHeight;
    return `${x},${y}`;
  }).join(' ');
  
  const strokeColor = isUp ? '#10B981' : '#EF4444'; // green-500 또는 red-500
  
  return (
    <svg width={width} height={height} className={className}>
      <polyline
        fill="none"
        stroke={strokeColor}
        strokeWidth="2"
        points={points}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default function MacroIndicatorWidget() {
  const [indicators, setIndicators] = useState<MacroIndicator[]>(defaultIndicators);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  // API에서 실시간 데이터를 가져오는 함수
  const fetchMacroData = async () => {
    setIsLoading(true);
    try {
      // 실제 API 엔드포인트 호출
      const response = await fetch('http://localhost:8000/api/macro-indicators');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      
      // API 응답 데이터를 컴포넌트 형식에 맞게 변환
      const formattedData = data.map((item: any) => ({
        name: item.name,
        value: item.value,
        change: item.change,
        isUp: item.isUp,
        symbol: item.symbol,
        lastUpdated: new Date(item.lastUpdated).toLocaleTimeString('ko-KR'),
        chartData: generateChartData(item.isUp, 0.1 + Math.random() * 0.1) // 랜덤 변동성
      }));
      
      setIndicators(formattedData);
      setLastUpdate(new Date());
    } catch (error) {
      console.error('거시경제 지표 데이터를 가져오는데 실패했습니다:', error);
      // API 실패 시 기본 데이터 사용
      const updatedIndicators = defaultIndicators.map(indicator => ({
        ...indicator,
        lastUpdated: new Date().toLocaleTimeString('ko-KR'),
        chartData: generateChartData(indicator.isUp, 0.1 + Math.random() * 0.1)
      }));
      setIndicators(updatedIndicators);
      setLastUpdate(new Date());
    } finally {
      setIsLoading(false);
    }
  };

  // 컴포넌트 마운트 시 데이터 로드
  useEffect(() => {
    fetchMacroData();
    
    // 5분마다 자동 업데이트 (실제 API 연동 시 조정 가능)
    const interval = setInterval(fetchMacroData, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text-primary">주요 거시경제 지표</h3>
        <div className="flex items-center space-x-2">
          <span className="text-xs text-text-secondary">
            마지막 업데이트: {lastUpdate.toLocaleTimeString('ko-KR')}
          </span>
          <button
            onClick={fetchMacroData}
            disabled={isLoading}
            className="p-2 text-text-secondary hover:text-primary transition-colors disabled:opacity-50"
            title="새로고침"
          >
            <RefreshCw size={16} className={isLoading ? 'animate-spin' : ''} />
          </button>
        </div>
      </div>

      {/* 지표 그리드 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {indicators.map((item) => (
          <div 
            key={item.symbol} 
            className="bg-surface p-4 rounded-lg border border-border-color hover:border-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
          >
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-text-secondary">{item.name}</p>
              <span className="text-xs text-text-secondary">{item.symbol}</span>
            </div>
            
            <p className="text-xl font-semibold mt-1 text-text-primary">{item.value}</p>
            
            <div className={`flex items-center text-sm mt-2 ${item.isUp ? 'text-green-400' : 'text-red-400'}`}>
              {item.isUp ? <TrendingUp size={16} className="mr-1" /> : <TrendingDown size={16} className="mr-1" />}
              {item.change}
            </div>
            
            {/* 간략한 차트 표시 */}
            <div className="mt-3 flex justify-center">
              <SimpleChart data={item.chartData} isUp={item.isUp} />
            </div>
          </div>
        ))}
      </div>

      {/* API 연동 상태 표시 */}
      <div className="mt-4 text-center">
        <p className="text-xs text-text-secondary">
          💡 실제 API 연동 시 실시간 데이터가 표시됩니다
        </p>
      </div>
    </div>
  );
}
