# -*- coding: utf-8 -*-
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
from datetime import datetime

# 사용자 관련 모델
class User(BaseModel):
    username: str
    email: Optional[str] = None
    full_name: Optional[str] = None
    is_active: bool = True

class UserCreate(BaseModel):
    username: str
    email: str
    password: str
    full_name: Optional[str] = None

class UserInDB(User):
    hashed_password: str

# 인증 관련 모델
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None

# 쿼리 관련 모델
class QueryRequest(BaseModel):
    query: str
    user_id: Optional[str] = None

class QueryResponse(BaseModel):
    status: str
    data: Optional[str] = None
    error: Optional[str] = None

# 채팅 관련 모델 (기존 chat.py에서 사용)
class ChatRequest(BaseModel):
    user_id: str
    message: str
    chat_id: Optional[int] = None

class Message(BaseModel):
    role: str
    content: str

class ChatResponse(BaseModel):
    chat_id: int
    assistant_message: str
    follow_up_questions: List[str]
    visualization_data: Optional[Dict[str, Any]] = None

class Report(BaseModel):
    id: Optional[int] = None
    user_id: str
    chat_id: int
    title: str
    content: Dict[str, Any]
    created_at: Optional[str] = None
    share_url: Optional[str] = None

# NLU 결과 모델
class NLUResult(BaseModel):
    intent: str
    entities: Dict[str, Any]

# 에이전트 계획 모델
class AgentPlan(BaseModel):
    tool: str
    args: List[Any]

# 거시경제 지표 모델
class MacroIndicator(BaseModel):
    name: str
    symbol: str
    value: str
    change: str
    isUp: bool
    lastUpdated: str
    rawValue: float
    chartData: List[float]

# 주식 데이터 모델
class StockData(BaseModel):
    company_name: str
    current_price: float
    change_percent: float
    volume: Optional[int] = None
    market_cap: Optional[float] = None
    timestamp: datetime

# 재무 데이터 모델
class FinancialData(BaseModel):
    company_name: str
    revenue: float
    operating_profit: float
    net_profit: float
    period: str
    timestamp: datetime
