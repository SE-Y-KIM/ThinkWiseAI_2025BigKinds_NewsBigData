# ThinkWise Kiro 완전 제작 가이드
## 모든 페이지별 상세 제작 지침

---

## 📋 목차
1. [Kiro 프로젝트 설정](#kiro-프로젝트-설정)
2. [디자인 시스템 구축](#디자인-시스템-구축)
3. [페이지별 제작 가이드](#페이지별-제작-가이드)
4. [컴포넌트 라이브러리](#컴포넌트-라이브러리)
5. [인터랙션 프로토타이핑](#인터랙션-프로토타이핑)

---

## 🎨 Kiro 프로젝트 설정

### 1. 프로젝트 생성
```
프로젝트명: ThinkWise Design System
팀: ThinkWise Design Team
설정: 
- Auto Layout: ON
- Smart Animate: ON
- Constraints: ON
- Variants: ON
```

### 2. 파일 구조 설정
```
📁 ThinkWise Design System
├── 📁 Design System
│   ├── 📁 Colors
│   ├── 📁 Typography
│   ├── 📁 Components
│   └── 📁 Layouts
├── 📁 Pages
│   ├── 📄 Homepage
│   ├── 📄 Product
│   ├── 📄 Pricing
│   ├── 📄 Community
│   ├── 📄 Sample Report
│   ├── 📄 Auth Pages
│   ├── 📄 App Pages
│   └── 📄 Legal Pages
└── 📁 Prototypes
    ├── 📄 User Flows
    └── 📄 Interactions
```

---

## 🎨 디자인 시스템 구축

### 1. Color Styles 설정

#### Primary Colors (골드 테마)
```
Primary 50: #FFF8E1
Primary 100: #FFF1C4
Primary 200: #FFE082
Primary 300: #FFD54F
Primary 400: #FFCA28
Primary 500: #FFD700 (메인 골드)
Primary 600: #FFC107
Primary 700: #FFB300
Primary 800: #FFA000
Primary 900: #FF8F00
```

#### Background Colors (다크 테마)
```
Background Primary: #1A1A1A
Background Secondary: #2C2C2C
Background Tertiary: #3A3A3A
```

#### Text Colors
```
Text Primary: #FFFFFF
Text Secondary: #E0E0E0
Text Tertiary: #BDBDBD
```

#### Status Colors
```
Success: #4CAF50
Warning: #FFC107
Error: #F44336
Info: #2196F3
```

### 2. Typography Styles 설정

#### Font Family
```
Primary: Montserrat
Secondary: Inter
Mono: JetBrains Mono
```

#### Font Sizes
```
XS: 12px (0.75rem)
SM: 14px (0.875rem)
BASE: 16px (1rem)
LG: 18px (1.125rem)
XL: 20px (1.25rem)
2XL: 24px (1.5rem)
3XL: 30px (1.875rem)
4XL: 36px (2.25rem)
5XL: 48px (3rem)
6XL: 60px (3.75rem)
```

#### Font Weights
```
Light: 300
Normal: 400
Medium: 500
Semibold: 600
Bold: 700
```

### 3. Spacing System
```
4px: 0.25rem
8px: 0.5rem
12px: 0.75rem
16px: 1rem
24px: 1.5rem
32px: 2rem
48px: 3rem
64px: 4rem
```

---

## 📄 페이지별 제작 가이드

### 1. 홈페이지 (Homepage)

#### 레이아웃 구조
```
Frame: 1440x1024px (Desktop)
├── Sidebar (280px width)
│   ├── Logo: TW (골드 그라데이션)
│   ├── Navigation Menu
│   ├── Conversation History
│   └── User Profile
└── Main Content
    ├── Hero Section
    ├── Search Section
    └── Economic Indicators
```

#### Hero Section 제작
1. **브랜드명**: ThinkWise
   - Font: Montserrat Bold, 60px
   - Color: 골드 그라데이션 (Primary 500 → Primary 700)
   - Animation: Gradient Shift (3s ease-in-out infinite)

2. **서브헤드라인**: "뉴스 빅데이터를 AI로 분석하고 인사이트를 발견하세요"
   - Font: Inter Regular, 20px
   - Color: Text Secondary (#E0E0E0)
   - Max Width: 600px

#### Search Section 제작
1. **검색 컨테이너**
   - Background: Background Secondary (#2C2C2C)
   - Border: 2px solid Border Medium (#4A4A4A)
   - Border Radius: 16px
   - Padding: 16px
   - Focus State: 골드 글로우 효과

2. **검색 입력창**
   - Placeholder: "뉴스 검색 또는 AI에게 질문하기..."
   - Font: Inter Medium, 18px
   - Color: Text Primary (#FFFFFF)

3. **전송 버튼**
   - Background: 골드 그라데이션
   - Icon: 🚀
   - Hover: 골드 글로우 + 상승 효과

#### Economic Indicators 제작
1. **섹션 헤더**
   - Title: "실시간 거시경제 지표"
   - Subtitle: "최신 데이터 기준으로 업데이트됩니다"

2. **지표 카드 (4개)**
   - 코스피: 3,196.85 ▲0.2%
   - 미국 10년: 2.85% ▲0.4%
   - WTI: $65.16 ▼1.3%
   - 환율: 1,386.50 ▲1.3%

   각 카드:
   - Background: Background Secondary
   - Border: 1px solid Border Light
   - Border Radius: 12px
   - Hover: 골드 글로우 + 상승 효과

### 2. 제품 소개 페이지 (Product)

#### 레이아웃 구조
```
Frame: 1440x1024px
├── Header Navigation
└── Main Content
    ├── Hero Section
    ├── Core Features (3컬럼)
    ├── Use Scenarios
    ├── Differentiation Points
    └── Trust Message
```

#### Hero Section 제작
1. **헤드라인**: "데이터에서 결론까지, 한 번에"
   - Font: Montserrat Bold, 48px
   - Color: #FFFFFF

2. **서브헤드라인**: "ThinkWise AI는 뉴스·정량 데이터·AI 분석을 결합해, 객관적이고 구조화된 투자 인사이트를 제공합니다."
   - Font: Inter Regular, 20px
   - Color: Text Secondary

3. **CTA 버튼**
   - "샘플 리포트 보기" (Secondary Button)
   - "무료로 시작하기" (Primary Button)

#### Core Features 제작
1. **AI 대화형 분석**
   - Title: "AI 대화형 분석"
   - Description: "자연스러운 대화를 통해 원하는 관점과 질문을 반영, 생각의 깊이를 확장합니다."

2. **구조화 리포트 자동 생성**
   - Title: "구조화 리포트 자동 생성"
   - Description: "뉴스·데이터·시각화를 결합해 한 번에 완성된 보고서를 제공합니다."

3. **다각도 시각화**
   - Title: "다각도 시각화"
   - Description: "차트, 그래프, 지표 비교로 변화를 한눈에 파악합니다."

### 3. 가격 정책 페이지 (Pricing)

#### 레이아웃 구조
```
Frame: 1440x1024px
├── Header Navigation
└── Main Content
    ├── Hero Section
    ├── Pricing Cards (3개)
    ├── Payment Policy
    └── Trust Message
```

#### Hero Section 제작
1. **헤드라인**: "당신의 투자 스타일에 맞는 요금제를 선택하세요"
   - Font: Montserrat Bold, 48px
   - Color: #FFFFFF

2. **서브헤드라인**: "무료 체험부터 전문가용 플랜까지, ThinkWise AI의 모든 기능을 합리적으로 제공합니다."
   - Font: Inter Regular, 20px
   - Color: Text Secondary

#### Pricing Cards 제작
1. **Free Plan**
   - Price: ₩0 / 월
   - Features: 월 5회 AI 분석, 기본 뉴스 검색, 실시간 거시경제 지표 확인
   - CTA: "무료로 시작하기"

2. **Pro Plan**
   - Price: ₩19,900 / 월
   - Features: 무제한 AI 분석, 전체 뉴스·데이터 통합 검색, 리포트 저장·공유, 커뮤니티 프리미엄 토론 참여
   - CTA: "Pro Plan 구독하기"

3. **Enterprise Plan**
   - Price: 맞춤형 견적
   - Features: 팀 단위 계정 관리, API 연동 및 커스터마이징, 데이터 보안 및 전용 서버 옵션
   - CTA: "영업팀에 문의하기"

### 4. 커뮤니티 페이지 (Community)

#### 레이아웃 구조
```
Frame: 1440x1024px
├── Header Navigation
└── Main Content
    ├── Hero Section
    ├── Tab Menu
    ├── Main Feed
    ├── Participation Banner
    └── Trust Message
```

#### Hero Section 제작
1. **헤드라인**: "투자 관점을 나누고, 함께 성장하세요"
   - Font: Montserrat Bold, 48px
   - Color: #FFFFFF

2. **서브헤드라인**: "ThinkWise AI 커뮤니티에서 분석 리포트를 공유하고, 다양한 시각을 만나보세요."
   - Font: Inter Regular, 20px
   - Color: Text Secondary

#### Tab Menu 제작
- 최신 토론
- 인기 리포트
- 내가 참여한 토론

#### Main Feed 제작
1. **토론 예시 1**
   - 제목: "테슬라 주가, AI 시장 확대에 따라 어떻게 될까?"
   - 미리보기: "최근 발표된 AI 투자 계획과 주가 변동 추세 분석"
   - 참여자 수: 56명
   - 버튼: "토론 참여하기"

2. **토론 예시 2**
   - 제목: "한국 금리 인상, 주식 시장 영향은?"
   - 미리보기: "최근 한국은행 금리 정책과 코스피 지수 상관 분석"
   - 참여자 수: 34명
   - 버튼: "의견 남기기"

### 5. 샘플 리포트 페이지 (Sample Report)

#### 레이아웃 구조
```
Frame: 1440x1024px
├── Header Navigation
└── Main Content
    ├── Hero Section
    ├── Report Summary
    ├── Key Indicators
    ├── Charts & Visualizations
    ├── AI Analysis Points
    └── CTA Banner
```

#### Hero Section 제작
1. **헤드라인**: "AI가 만든 리포트를 직접 확인하세요"
   - Font: Montserrat Bold, 48px
   - Color: #FFFFFF

2. **서브헤드라인**: "뉴스·데이터·시각화를 결합한 ThinkWise AI 리포트 예시를 살펴보고, 분석의 깊이를 경험해보세요."
   - Font: Inter Regular, 20px
   - Color: Text Secondary

#### Report Summary 제작
1. **제목**: "2024년 3분기 반도체 시장 전망"
2. **요약문**: "글로벌 반도체 수요 회복과 AI 데이터센터 투자 확대에 따라 주요 기업의 실적이 개선될 것으로 전망됩니다. 하지만 공급 과잉 가능성과 지정학적 리스크는 여전히 변수로 남아 있습니다."

#### Key Indicators 제작
- 시장 성장률: +8.4% (YoY)
- 주요 기업 주가 평균: +5.2%
- 원자재 가격 변동: +1.1%

### 6. 인증 페이지들 (Auth Pages)

#### 로그인 페이지
```
Frame: 1440x1024px
Background: Linear gradient (#1A1A1A → #2C2C2C)

Login Container: 400x500px
Background: #2C2C2C
Border: 1px solid #3A3A3A
Border Radius: 16px
Padding: 48px
Position: Center

Logo: ThinkWise (골드 그라데이션)
Title: "ThinkWise AI 로그인" (Montserrat Bold, 24px, #FFFFFF)
Subtitle: "데이터 기반 인사이트, 지금 바로 시작하세요." (Inter Regular, 16px, #E0E0E0)

Form Fields:
├── Email Input: Background #3A3A3A, Border #4A4A4A
├── Password Input: Background #3A3A3A, Border #4A4A4A
└── Focus: 골드 글로우

Login Button: 골드 그라데이션 배경
Links: "비밀번호를 잊으셨나요?", "무료로 가입하기" (골드 컬러)

Social Login:
├── Google로 로그인
├── Naver로 로그인
└── Kakao로 로그인
```

#### 회원가입 페이지
```
Frame: 1440x1024px
Background: Linear gradient (#1A1A1A → #2C2C2C)

Signup Container: 450x600px
Background: #2C2C2C
Border: 1px solid #3A3A3A
Border Radius: 16px
Padding: 48px
Position: Center

Logo: ThinkWise (골드 그라데이션)
Title: "ThinkWise AI 무료 가입" (Montserrat Bold, 24px, #FFFFFF)
Subtitle: "데이터 기반 AI 분석, 지금 시작하세요." (Inter Regular, 16px, #E0E0E0)

Form Fields:
├── Name Input
├── Email Input
├── Password Input
├── Confirm Password Input
└── Terms Checkbox

Signup Button: 골드 그라데이션 배경
Login Link: "이미 계정이 있으신가요? 로그인" (골드 컬러)

Social Signup:
├── Google로 가입
├── Naver로 가입
└── Kakao로 가입
```

#### 비밀번호 재설정 페이지
```
Frame: 1440x1024px
Background: Linear gradient (#1A1A1A → #2C2C2C)

Reset Container: 400x400px
Background: #2C2C2C
Border: 1px solid #3A3A3A
Border Radius: 16px
Padding: 48px
Position: Center

Title: "비밀번호 재설정" (Montserrat Bold, 24px, #FFFFFF)
Subtitle: "가입하신 이메일로 비밀번호 재설정 링크를 보내드립니다." (Inter Regular, 16px, #E0E0E0)

Form Fields:
└── Email Input: Background #3A3A3A, Border #4A4A4A

Reset Button: 골드 그라데이션 배경
Back Link: "로그인 페이지로 돌아가기" (골드 컬러)
```

### 7. 앱 페이지들 (App Pages)

#### AI 채팅 페이지
```
Frame: 1440x1024px
├── Sidebar (280px)
│   ├── Chat History
│   └── Quick Actions
└── Main Content
    ├── Chat Interface
    ├── Message Input
    └── AI Suggestions
```

#### 대시보드 페이지
```
Frame: 1440x1024px
├── Sidebar (280px)
│   ├── Navigation
│   └── Filters
└── Main Content
    ├── KPI Cards (Grid)
    ├── Trending Topics
    ├── Category Distribution
    └── AI Recommendations
```

#### 다각도 뉴스 요약 페이지
```
Frame: 1440x1024px
├── Header
└── Main Content
    ├── Search & Selection
    ├── News Comparison (찬성/반대)
    ├── Key Indicators
    ├── AI Insights
    └── Quick Actions
```

#### 리포트 생성 페이지들 (4단계)
```
Step 1 - Keywords: 키워드 입력
Step 2 - Setup: 주제/소주제 설정
Step 3 - Compose: 시각화·본문 작성
Step 4 - Complete: 완료
```

#### 설정 페이지들
```
Profile: 프로필 정보 관리
Plan: 플랜 변경
Billing: 결제 및 영수증
Notifications: 알림 설정
```

### 8. 법적 페이지들 (Legal Pages)

#### 이용약관 페이지
```
Frame: 1440x1024px
Background: #1A1A1A

Content Container: 800x800px
Background: #2C2C2C
Border: 1px solid #3A3A3A
Border Radius: 16px
Padding: 48px
Position: Center

Title: "이용약관" (Montserrat Bold, 28px, #FFFFFF)
Subtitle: "ThinkWise AI 서비스 이용과 관련된 조건과 규정을 안내합니다." (Inter Regular, 16px, #E0E0E0)

Content: Inter Regular, 16px, #E0E0E0
Line Height: 1.6
```

#### 개인정보처리방침 페이지
```
Frame: 1440x1024px
Background: #1A1A1A

Content Container: 800x800px
Background: #2C2C2C
Border: 1px solid #3A3A3A
Border Radius: 16px
Padding: 48px
Position: Center

Title: "개인정보처리방침" (Montserrat Bold, 28px, #FFFFFF)
Subtitle: "ThinkWise AI 서비스 이용 시 수집·이용되는 개인정보의 항목, 목적, 보관 기간을 안내합니다." (Inter Regular, 16px, #E0E0E0)

Content: Inter Regular, 16px, #E0E0E0
Line Height: 1.6
```

---

## 🧩 컴포넌트 라이브러리

### 1. Button Components

#### Primary Button
```
Background: 골드 그라데이션 (Primary 500 → Primary 700)
Text: White
Border Radius: 8px
Padding: 12px 24px
Font: Inter Medium, 16px
Hover: 골드 글로우 + 상승 효과
```

#### Secondary Button
```
Background: Transparent
Border: 2px solid Primary 500
Text: Primary 500
Border Radius: 8px
Padding: 12px 24px
Hover: Background Primary 900
```

#### Ghost Button
```
Background: Transparent
Text: Text Primary
Border: None
Padding: 12px 24px
Hover: Background Tertiary
```

### 2. Input Components

#### Text Input
```
Background: Background Secondary
Border: 1px solid Border Light
Border Radius: 8px
Padding: 12px 16px
Font: Inter Regular, 16px
Focus: 2px solid Primary 500 + 골드 글로우
```

#### Search Input
```
Background: Background Secondary
Border: 2px solid Border Medium
Border Radius: 16px
Padding: 16px 20px
Icon: 🔍 (골드 컬러)
Focus: 골드 글로우
```

### 3. Card Components

#### Data Card
```
Background: Background Secondary
Border: 1px solid Border Light
Border Radius: 12px
Padding: 24px
Shadow: Shadow Base
Hover: 골드 글로우 + 상승 효과
```

#### Chart Card
```
Background: Background Secondary
Border: 1px solid Border Light
Border Radius: 12px
Padding: 20px
Chart Area: Background Tertiary
```

### 4. Navigation Components

#### Sidebar Navigation
```
Background: Background Secondary
Width: 280px
Border Right: 1px solid Border Light
Padding: 24px
```

#### Nav Item
```
Padding: 12px 16px
Border Radius: 8px
Font: Inter Medium, 14px
Hover: Background Tertiary
Active: 골드 그라데이션 배경
```

---

## 🎭 인터랙션 프로토타이핑

### 1. Hover Effects

#### 골드 글로우 효과
```
Box Shadow: 0 0 20px rgba(255, 215, 0, 0.3)
Transition: 250ms ease-in-out
```

#### 상승 효과
```
Transform: translateY(-4px)
Transition: 250ms ease-in-out
```

### 2. Loading States

#### 스피너 애니메이션
```
Border: 2px solid Primary 500
Border Top: 2px solid transparent
Animation: spin 1s linear infinite
```

#### 스켈레톤 로딩
```
Background: Background Tertiary
Animation: pulse 2s infinite
```

### 3. Micro Interactions

#### 버튼 클릭
```
Scale: 0.95
Duration: 150ms
```

#### 카드 호버
```
Scale: 1.02
Shadow: Shadow Large
Duration: 250ms
```

---

## 🎨 특별 효과 가이드

### 골드 그라데이션 애니메이션
```css
background: linear-gradient(135deg, #FFD700, #FFA500, #FF8C00, #FFD700);
background-size: 300% 300%;
animation: gradientShift 3s ease-in-out infinite;
```

### 글로우 효과
```css
box-shadow: 0 0 20px rgba(255, 215, 0, 0.3);
transition: box-shadow 250ms ease-in-out;
```

### 부드러운 전환
```css
transition: all 250ms ease-in-out;
```

---

## 📱 반응형 브레이크포인트

### Desktop (1440px)
- 사이드바: 280px 고정
- 메인 콘텐츠: 유동적
- 그리드: 12 컬럼

### Tablet (768px)
- 사이드바: 토글 메뉴
- 메인 콘텐츠: 전체 너비
- 그리드: 8 컬럼

### Mobile (375px)
- 사이드바: 오버레이
- 메인 콘텐츠: 전체 너비
- 그리드: 4 컬럼

---

## ✅ 품질 검증 체크리스트

### 디자인 일관성
- [ ] 브랜드 컬러 일관성 (골드 테마)
- [ ] 타이포그래피 계층 구조
- [ ] 스페이싱 시스템 준수
- [ ] 컴포넌트 재사용성

### 반응형 디자인
- [ ] Desktop (1440px) 레이아웃
- [ ] Tablet (768px) 레이아웃
- [ ] Mobile (375px) 레이아웃
- [ ] 브레이크포인트 설정

### 인터랙션 품질
- [ ] Hover 효과 일관성
- [ ] 로딩 상태 구현
- [ ] 애니메이션 부드러움
- [ ] 피드백 명확성

### 접근성
- [ ] 색상 대비 4.5:1 이상
- [ ] 포커스 표시 명확성
- [ ] 터치 타겟 44px 이상
- [ ] 스크린 리더 호환성

---

*이 가이드를 따라 ThinkWise의 모든 프론트엔드 페이지를 Kiro에서 체계적으로 제작하세요.*
*각 페이지는 design_PRD.md의 요구사항과 design.json의 디자인 토큰을 엄격히 준수해야 합니다.*
