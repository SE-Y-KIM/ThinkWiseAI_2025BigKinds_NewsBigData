# 🚀 ThinkWise 프로젝트 실행 가이드

## 📋 필수 설치 항목

### 1. Node.js 설치

- [nodejs.org](https://nodejs.org/) 에서 LTS 버전 다운로드
- 설치 후 터미널에서 확인: `node --version`, `npm --version`
- **권장 버전**: Node.js 18+ 또는 20+

### 2. Python 설치

- [python.org](https://www.python.org/downloads/) 에서 Python 3.8+ 다운로드
- 설치 시 "Add Python to PATH" 옵션 체크
- 설치 후 터미널에서 확인: `python --version`, `pip --version`

### 3. MongoDB 설치 (선택사항)

- [mongodb.com](https://www.mongodb.com/try/download/community) 에서 다운로드
- 또는 MongoDB Atlas 클라우드 서비스 사용

## ⚙️ 프로젝트 설정

### 1. 저장소 클론

```bash
git clone [your-repository-url]
cd ThinkWise
```

### 2. 환경변수 설정 (중요!)

#### Backend 환경변수

`backend` 폴더에 `.env` 파일을 생성하고 다음 내용을 입력하세요:

```env
# Server Configuration
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:5173

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/thinkwise

# JWT Configuration
JWT_SECRET=your-secret-key-here
JWT_EXPIRES_IN=7d

# OpenAI Configuration (선택사항)
OPENAI_API_KEY=your-openai-api-key-here

# 기타 설정은 backend/env.example 참조
```

## 🎯 실행 방법

### 1. 백엔드 실행

```bash
# 백엔드 폴더로 이동
cd backend

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

### 2. 프론트엔드 실행 (Vite)

```bash
# 새 터미널에서 프론트엔드 폴더로 이동
cd frontend

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

### 3. 프론트엔드 실행 (Next.js)

```bash
# 새 터미널에서 Next.js 폴더로 이동
cd frontend_next

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

### 4. Python 스크립트 실행 (필요시)

```bash
# Python 가상환경 생성
python -m venv venv

# 가상환경 활성화 (Windows)
venv\Scripts\activate

# 가상환경 활성화 (macOS/Linux)
source venv/bin/activate

# 의존성 설치 (requirements.txt가 있는 경우)
pip install -r requirements.txt

# 스크립트 실행
python scripts/macro_kpi.py
```

## 🌐 접속 주소

- **Backend API**: http://localhost:5000
- **Frontend (Vite)**: http://localhost:5173
- **Frontend (Next.js)**: http://localhost:5174

## 📁 프로젝트 구조

```
ThinkWise/
├── backend/          # Node.js 백엔드 서버
├── frontend/         # Vite 기반 프론트엔드
├── frontend_next/    # Next.js 기반 프론트엔드
├── scripts/          # Python 스크립트
├── venv/             # Python 가상환경 (자동 생성됨)
└── SETUP-GUIDE.md    # 이 파일
```

## ⚠️ 주의사항

1. **환경변수**: `.env` 파일은 반드시 `backend` 폴더에 생성
2. **포트 충돌**: 이미 사용 중인 포트가 있다면 다른 포트 사용
3. **의존성**: 각 폴더에서 `npm install` 실행 필요
4. **Python 가상환경**: Python 스크립트 실행 시 가상환경 활성화 필요

## 🔧 문제 해결

### 일반적인 문제들

- **`npm install` 오류**: Node.js 버전 확인 (18+ 필요)
- **포트 충돌**: `netstat -ano | findstr :[PORT]`로 확인 후 프로세스 종료
- **Python 오류**: 가상환경 활성화 상태 확인
- **MongoDB 연결 오류**: MongoDB 서비스 실행 상태 확인

### 포트 충돌 해결

```bash
# Windows에서 포트 사용 중인 프로세스 확인
netstat -ano | findstr :5000

# 프로세스 종료 (PID는 위 명령어로 확인)
taskkill /PID [PROCESS_ID] /F
```

## 🚀 빠른 시작 (권장)

1. **백엔드 시작**: `cd backend && npm install && npm run dev`
2. **프론트엔드 시작**: `cd frontend && npm install && npm run dev`
3. **Next.js 시작**: `cd frontend_next && npm install && npm run dev`

각 서비스는 별도 터미널에서 실행하세요!

## 📞 지원

문제가 발생하면 다음을 확인하세요:

1. Node.js와 Python 버전
2. 환경변수 설정
3. 포트 사용 상태
4. 의존성 설치 완료 여부
