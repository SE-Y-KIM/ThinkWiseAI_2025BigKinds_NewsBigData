# ThinkWise Kiro 디자인 제작 가이드
## 프론트엔드 페이지별 상세 제작 지침

---

## 📋 목차
1. [Kiro 프로젝트 설정](#kiro-프로젝트-설정)
2. [디자인 시스템 구축](#디자인-시스템-구축)
3. [페이지별 제작 가이드](#페이지별-제작-가이드)
4. [컴포넌트 라이브러리](#컴포넌트-라이브러리)
5. [인터랙션 프로토타이핑](#인터랙션-프로토타이핑)
6. [품질 검증 체크리스트](#품질-검증-체크리스트)

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

### 2. AI 채팅 페이지 (Chat)

#### 레이아웃 구조
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

#### Chat Interface 제작
1. **AI 메시지 플레이스홀더**
   - Text: "분석할 뉴스 주제나 키워드를 입력하세요. 예: '전기차 시장 전망'"
   - Background: Background Tertiary
   - Border Radius: 12px
   - Padding: 20px

2. **샘플 질문 제안**
   - "미국 금리 인상이 코스피에 미치는 영향은?"
   - "반도체 산업의 3분기 실적 전망 알려줘"
   - "최근 유가 변동 원인 분석"

3. **AI 응답 예시 블록**
   - 요약, 핵심 지표, 분석 포인트 구조
   - Background: Background Secondary
   - Border: 1px solid Border Light

#### Message Input 제작
1. **입력창**
   - Placeholder: "메시지를 입력하세요..."
   - Background: Background Secondary
   - Border: 2px solid Border Medium
   - Focus: 골드 글로우

2. **전송 버튼**
   - 골드 그라데이션 배경
   - Icon: 📤
   - Loading State: 스피너 애니메이션

### 3. 대시보드 페이지 (Dashboard)

#### 레이아웃 구조
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

#### KPI Cards 제작
1. **총 뉴스 기사**: 8,146
2. **분석된 토픽**: 245
3. **분석 정확도**: 89%
4. **실시간 업데이트**: 활성 상태

각 카드:
- Background: Background Secondary
- Border Radius: 12px
- Shadow: Shadow Base
- Hover: 골드 글로우

#### Trending Topics 제작
1. **인공지능 혁신**: 1,247 기사 ▲23.5%
2. **빅데이터 분석**: 892 기사 ▲15.1%
3. **해커톤 문화**: 634 기사 ▲45.8%
4. **클라우드 컴퓨팅**: 523 기사 ▼5.3%
5. **사이버보안**: 486 기사 ▼12.7%

각 항목:
- Background: Background Tertiary
- Border Radius: 8px
- Hover: 골드 글로우

### 4. 커뮤니티 페이지 (Community)

#### 레이아웃 구조
```
Frame: 1440x1024px
├── Sidebar (280px)
│   ├── Categories
│   └── Popular Tags
└── Main Content
    ├── Forum Posts
    ├── User Profiles
    └── Content Sharing
```

#### Forum Posts 제작
1. **게시글 카드**
   - Title: "최신 AI 트렌드 분석"
   - Author: "김분석가"
   - Date: "2024.01.15"
   - Views: "1,234"
   - Likes: "56"

2. **카테고리 태그**
   - Background: Primary 500
   - Text: White
   - Border Radius: 16px

### 5. 설정 페이지 (Settings)

#### 레이아웃 구조
```
Frame: 1440x1024px
├── Sidebar (280px)
│   └── Settings Navigation
└── Main Content
    ├── Profile Settings
    ├── Plan Settings
    ├── Billing Settings
    └── Notification Settings
```

#### Profile Settings 제작
1. **프로필 정보**
   - Avatar: 골드 그라데이션 원형
   - Name: "유병욱"
   - Email: "user@example.com"
   - Plan: "Pro Plan" (골드 텍스트)

2. **설정 폼**
   - Input Fields: Background Secondary
   - Labels: Text Secondary
   - Save Button: 골드 그라데이션

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

### 성능 최적화
- [ ] 이미지 최적화
- [ ] 애니메이션 성능
- [ ] 컴포넌트 최적화
- [ ] 로딩 속도

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

## 📋 페이지별 체크리스트

### 홈페이지 (ui_1.html)
- [ ] 사이드바 로고 및 네비게이션
- [ ] 히어로 섹션 브랜드명
- [ ] 검색 인터페이스
- [ ] 경제 지표 카드
- [ ] 반응형 레이아웃

### AI 채팅 (ui_2.html)
- [ ] 채팅 인터페이스
- [ ] 메시지 입력창
- [ ] AI 제안 기능
- [ ] 대화 기록 사이드바
- [ ] 빠른 액션 버튼

### 대시보드 (ui_3.html)
- [ ] KPI 카드 그리드
- [ ] 트렌딩 토픽 리스트
- [ ] 카테고리 분포 차트
- [ ] AI 맞춤 제안
- [ ] 실시간 업데이트

### 커뮤니티 (ui_4.html)
- [ ] 포럼 게시글 목록
- [ ] 사용자 프로필
- [ ] 카테고리 필터
- [ ] 콘텐츠 공유 기능
- [ ] 인기 태그

### 설정 (ui_5.html)
- [ ] 프로필 설정 폼
- [ ] 플랜 변경 옵션
- [ ] 결제 정보 관리
- [ ] 알림 설정
- [ ] 계정 관리

---

## 🚀 최종 제출 가이드

### 1. 파일 정리
- [ ] 모든 페이지 완성
- [ ] 컴포넌트 라이브러리 정리
- [ ] 프로토타입 연결
- [ ] 반응형 버전 완성

### 2. 품질 검증
- [ ] 디자인 일관성 확인
- [ ] 인터랙션 테스트
- [ ] 접근성 검증
- [ ] 성능 최적화

### 3. 문서화
- [ ] 컴포넌트 스펙 문서
- [ ] 인터랙션 가이드
- [ ] 개발자 핸드오프 문서
- [ ] 사용자 가이드

---

*이 가이드를 따라 ThinkWise의 모든 프론트엔드 페이지를 Kiro에서 체계적으로 제작하세요.*
*각 페이지는 design_PRD.md의 요구사항과 design.json의 디자인 토큰을 엄격히 준수해야 합니다.*
