# ThinkiWise Backend

AI 기반 비즈니스 인사이트 플랫폼의 백엔드 API 서버입니다.

## 🚀 기술 스택

- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT
- **Validation**: Express-validator
- **Logging**: Winston
- **Security**: Helmet, CORS, Rate Limiting
- **AI Integration**: OpenAI API

## 📁 프로젝트 구조

```
backend/
├── src/
│   ├── controllers/     # 요청 처리 로직
│   ├── routes/         # API 라우트 정의
│   ├── models/         # MongoDB 스키마
│   ├── middleware/     # 미들웨어 (인증, 검증 등)
│   ├── services/       # 비즈니스 로직
│   ├── utils/          # 유틸리티 함수
│   ├── config/         # 설정 파일
│   └── app.js          # Express 앱 설정
├── logs/               # 로그 파일
├── server.js           # 서버 시작점
├── package.json        # 의존성 관리
└── env.example         # 환경 변수 예시
```

## 🛠️ 설치 및 실행

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경 변수 설정

```bash
cp env.example .env
```

`.env` 파일을 편집하여 필요한 설정을 입력하세요.

### 3. 데이터베이스 설정

MongoDB가 설치되어 있고 실행 중인지 확인하세요.

### 4. 개발 서버 실행

```bash
# 개발 모드
npm run dev

# 프로덕션 모드
npm start
```

## 📚 API 문서

### 인증 (Authentication)

- `POST /api/auth/register` - 회원가입
- `POST /api/auth/login` - 로그인
- `GET /api/auth/me` - 현재 사용자 정보
- `PUT /api/auth/profile` - 프로필 업데이트
- `PUT /api/auth/password` - 비밀번호 변경
- `POST /api/auth/logout` - 로그아웃

### 대시보드 (Dashboard)

- `GET /api/dashboard` - 대시보드 개요
- `GET /api/dashboard/kpi` - KPI 데이터
- `GET /api/dashboard/trending` - 트렌딩 토픽
- `GET /api/dashboard/categories` - 카테고리 분포
- `GET /api/dashboard/industries` - 산업 분포
- `GET /api/dashboard/recent-reports` - 최근 리포트
- `GET /api/dashboard/activity` - 사용자 활동

### 채팅 (Chat)

- `POST /api/chat/send` - AI에게 메시지 전송
- `GET /api/chat/history` - 채팅 기록 조회
- `DELETE /api/chat/history` - 채팅 기록 삭제
- `GET /api/chat/suggestions` - 채팅 제안사항
- `GET /api/chat/export` - 채팅 내보내기

### 리포트 (Report)

- `POST /api/report` - 새 리포트 생성
- `GET /api/report` - 리포트 목록 조회
- `GET /api/report/:id` - 단일 리포트 조회
- `PUT /api/report/:id` - 리포트 업데이트
- `DELETE /api/report/:id` - 리포트 삭제
- `POST /api/report/:id/generate` - 리포트 생성
- `GET /api/report/:id/status` - 리포트 상태 조회
- `GET /api/report/:id/export` - 리포트 내보내기
- `POST /api/report/:id/share` - 리포트 공유

### 설정 (Settings)

- `GET /api/settings` - 사용자 설정 조회
- `PUT /api/settings/preferences` - 선호도 업데이트
- `PUT /api/settings/plan` - 플랜 변경
- `GET /api/settings/usage` - 사용량 통계
- `GET /api/settings/billing` - 결제 정보
- `PUT /api/settings/billing` - 결제 정보 업데이트
- `GET /api/settings/notifications` - 알림 설정
- `PUT /api/settings/notifications` - 알림 설정 업데이트
- `DELETE /api/settings/account` - 계정 삭제

## 🔐 인증

API는 JWT 토큰 기반 인증을 사용합니다. 보호된 엔드포인트에 접근하려면 요청 헤더에 토큰을 포함해야 합니다:

```
Authorization: Bearer <your-jwt-token>
```

## 📊 데이터베이스 스키마

### User 모델
- 기본 정보 (이름, 이메일, 비밀번호)
- 플랜 정보 (free, basic, pro, enterprise)
- 사용량 통계
- 선호도 설정

### Report 모델
- 리포트 메타데이터
- 분석 데이터
- 시각화 설정
- 공유 설정

## 🧪 테스트

```bash
# 테스트 실행
npm test

# 테스트 감시 모드
npm run test:watch
```

## 📝 로깅

Winston을 사용하여 구조화된 로깅을 제공합니다:

- **Console**: 개발 환경에서 실시간 로그
- **File**: 프로덕션 환경에서 파일 기반 로그
- **Error Log**: 에러 전용 로그 파일

## 🔒 보안

- **Helmet**: 보안 헤더 설정
- **CORS**: Cross-Origin Resource Sharing 설정
- **Rate Limiting**: API 요청 제한
- **Input Validation**: 입력 데이터 검증
- **JWT**: 안전한 토큰 기반 인증

## 🚀 배포

### 환경 변수

프로덕션 환경에서는 다음 환경 변수를 설정해야 합니다:

- `NODE_ENV=production`
- `MONGODB_URI`: 프로덕션 MongoDB 연결 문자열
- `JWT_SECRET`: 강력한 JWT 시크릿 키
- `OPENAI_API_KEY`: OpenAI API 키
- 기타 필요한 서비스 키들

### PM2를 사용한 배포

```bash
# PM2 설치
npm install -g pm2

# 애플리케이션 시작
pm2 start server.js --name thinkiwise-backend

# 상태 확인
pm2 status

# 로그 확인
pm2 logs thinkiwise-backend
```

## 🤝 기여하기

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

## 📞 지원

문제가 있거나 질문이 있으시면 이슈를 생성해 주세요.

