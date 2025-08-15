from fastapi import APIRouter, HTTPException
from typing import List, Dict, Any
import asyncio
from datetime import datetime
import random

router = APIRouter()

# 간단한 차트 데이터 생성 함수
def generate_chart_data(is_up: bool, volatility: float = 0.1) -> List[float]:
    """트렌드 방향에 따른 간단한 차트 데이터를 생성합니다."""
    data = []
    current_value = 50.0  # 시작값
    
    for i in range(20):
        # 트렌드 방향에 따른 변화
        trend = 1 if is_up else -1
        change = (random.random() - 0.5) * volatility * 10 * trend
        current_value = max(10.0, min(90.0, current_value + change))
        data.append(round(current_value, 2))
    
    return data

# 거시경제 지표 데이터 모델
class MacroIndicator:
    def __init__(self, name: str, symbol: str, base_value: float, volatility: float):
        self.name = name
        self.symbol = symbol
        self.base_value = base_value
        self.volatility = volatility
    
    def get_current_value(self) -> Dict[str, Any]:
        # 실제 API 연동 시 여기에 실제 데이터를 가져오는 로직 구현
        # 현재는 시뮬레이션된 데이터를 반환
        
        # 기본값에 약간의 변동성 추가 (실제 시장 데이터 시뮬레이션)
        variation = random.uniform(-self.volatility, self.volatility)
        current_value = self.base_value * (1 + variation)
        
        # 변화율 계산
        change_percent = (variation * 100)
        is_up = change_percent >= 0
        
        # 값 포맷팅
        if self.symbol == "KOSPI":
            formatted_value = f"{current_value:,.2f}"
        elif self.symbol == "US10Y":
            formatted_value = f"{current_value:.2f}%"
        elif self.symbol == "WTI":
            formatted_value = f"${current_value:.2f}"
        elif self.symbol == "USDKRW":
            formatted_value = f"{current_value:.2f}"
        else:
            formatted_value = f"{current_value:.2f}"
        
        # 변화율 포맷팅
        change_text = f"{'+' if is_up else ''}{change_percent:.2f}%"
        
        # 차트 데이터 생성
        chart_data = generate_chart_data(is_up, self.volatility)
        
        return {
            "name": self.name,
            "symbol": self.symbol,
            "value": formatted_value,
            "change": change_text,
            "isUp": is_up,
            "lastUpdated": datetime.now().isoformat(),
            "rawValue": current_value,
            "chartData": chart_data  # 차트 데이터 추가
        }

# 거시경제 지표 정의
indicators = [
    MacroIndicator("코스피", "KOSPI", 3196.85, 0.02),  # 2% 변동성
    MacroIndicator("미국 10년", "US10Y", 2.85, 0.01),  # 1% 변동성
    MacroIndicator("WTI", "WTI", 65.16, 0.03),         # 3% 변동성
    MacroIndicator("환율(USD)", "USDKRW", 1386.50, 0.005), # 0.5% 변동성
]

@router.get("/macro-indicators", response_model=List[Dict[str, Any]])
async def get_macro_indicators():
    """
    주요 거시경제 지표 데이터를 반환합니다.
    실제 API 연동 시 이 부분을 실제 데이터 소스로 교체하세요.
    """
    try:
        # 각 지표의 현재 값을 계산
        current_data = []
        for indicator in indicators:
            data = indicator.get_current_value()
            current_data.append(data)
        
        return current_data
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"거시경제 지표 데이터를 가져오는데 실패했습니다: {str(e)}")

@router.get("/macro-indicators/{symbol}")
async def get_macro_indicator_by_symbol(symbol: str):
    """
    특정 심볼의 거시경제 지표 데이터를 반환합니다.
    """
    try:
        for indicator in indicators:
            if indicator.symbol.upper() == symbol.upper():
                return indicator.get_current_value()
        
        raise HTTPException(status_code=404, detail=f"심볼 '{symbol}'을 찾을 수 없습니다.")
    
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"지표 데이터를 가져오는데 실패했습니다: {str(e)}")

@router.post("/macro-indicators/refresh")
async def refresh_macro_indicators():
    """
    거시경제 지표 데이터를 새로고침합니다.
    """
    try:
        # 실제 구현에서는 외부 API를 호출하여 최신 데이터를 가져옵니다
        current_data = []
        for indicator in indicators:
            data = indicator.get_current_value()
            current_data.append(data)
        
        return {
            "message": "거시경제 지표 데이터가 새로고침되었습니다.",
            "data": current_data,
            "timestamp": datetime.now().isoformat()
        }
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"데이터 새로고침에 실패했습니다: {str(e)}")
