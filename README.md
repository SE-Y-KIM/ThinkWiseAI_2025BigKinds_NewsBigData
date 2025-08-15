# ThinkWise AI - 투자 분석 AI 에이전트 MVP

AI 기반 투자 분석 및 사고 확장을 도와주는 웹 애플리케이션입니다.

## 🚀 프로젝트 개요

ThinkWise는 사용자가 투자 관련 질문을 하면 AI가 분석하고, 추가적인 꼬리 질문을 통해 사고를 확장할 수 있도록 도와주는 플랫폼입니다.

### 주요 기능
- 🤖 AI 기반 투자 분석
- 💭 교육적 꼬리 질문 생성
- 📊 데이터 시각화 (차트)
- 💬 실시간 채팅 인터페이스
- 📱 반응형 웹 디자인

## 🏗️ 기술 스택

### Backend
- **FastAPI** - Python 웹 프레임워크
- **OpenAI GPT-4** - AI 언어 모델
- **PostgreSQL** - 데이터베이스 (Supabase)
- **Pydantic** - 데이터 검증

### Frontend
- **Next.js 14** - React 프레임워크
- **TypeScript** - 타입 안전성
- **Tailwind CSS** - 스타일링
- **Chart.js** - 데이터 시각화

## 📁 프로젝트 구조
thinkwise-mvp/
├── thinkwise-backend/          # FastAPI 백엔드
│   ├── app/
│   │   ├── api/               # API 라우터
│   │   ├── core/              # AI 에이전트 로직
│   │   └── models/            # 데이터 모델
│   ├── main.py                # 메인 애플리케이션
│   └── requirements.txt       # Python 의존성
├── thinkwise-frontend/         # Next.js 프론트엔드
│   ├── app/
│   │   ├── components/        # React 컴포넌트
│   │   ├── layout.tsx         # 레이아웃
│   │   └── page.tsx           # 메인 페이지
│   ├── package.json           # Node.js 의존성
│   └── tailwind.config.js     # Tailwind 설정
└── database/
└── tables.sql             # 데이터베이스 스키마

## 🛠️ 설치 및 실행

### 1. 환경 설정

#### Backend 환경 변수 설정
```bash
cd thinkwise-mvp/thinkwise-backend
cp .env.example .env
# .env 파일에 OpenAI API 키 등 설정
cd thinkwise-mvp/thinkwise-frontend
cp .env.local.example .env.local
# 필요한 환경 변수 설정
cd thinkwise-mvp/thinkwise-backend

# 가상환경 생성 및 활성화
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# 의존성 설치
pip install -r requirements.txt

# 서버 실행
python main.py
# 또는
uvicorn main:app --reload --host 0.0.0.0 --port 8000
cd thinkwise-mvp/thinkwise-frontend

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

4. 데이터베이스 설정
Supabase 프로젝트 생성

SQL Editor에서 database/tables.sql 실행

환경 변수에 데이터베이스 연결 정보 설정

🌐 접속 방법
Frontend: http://localhost:3000

Backend API: http://localhost:8000

API 문서: http://localhost:8000/docs

🔧 개발 가이드
API 엔드포인트
POST /api/chat - AI와 채팅

GET / - 헬스 체크

GET /health - 서비스 상태 확인

컴포넌트 구조
ChatInterface - 메인 채팅 컴포넌트

Chart - 데이터 시각화 컴포넌트

FollowUpQuestions - 꼬리 질문 표시

📋 TODO (MVP 이후)
[ ] Big KINDS 뉴스 API 연동
[ ] DART 재무제표 API 연동
[ ] KOSIS 통계 데이터 연동
[ ] 사용자 인증 시스템
[ ] 채팅 기록 저장 및 불러오기
[ ] 리포트 생성 및 공유 기능
[ ] 커뮤니티 기능

🤝 기여 방법
Fork the Project

Create your Feature Branch (git checkout -b feature/AmazingFeature)

Commit your Changes (git commit -m 'Add some AmazingFeature')

Push to the Branch (git push origin feature/AmazingFeature)

Open a Pull Request

📄 라이선스
이 프로젝트는 MIT 라이선스 하에 배포됩니다.

📞 문의
프로젝트에 대한 문의사항이 있으시면 이슈를 생성해주세요.