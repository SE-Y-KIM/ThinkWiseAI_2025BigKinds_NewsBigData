# ThinkWise Kiro 페이지별 상세 제작 스펙
## 각 페이지의 정확한 측정값, 콘텐츠, 인터랙션 가이드

---

## 📋 목차
1. [홈페이지 (Homepage)](#홈페이지-homepage)
2. [제품 소개 (Product)](#제품-소개-product)
3. [가격 정책 (Pricing)](#가격-정책-pricing)
4. [커뮤니티 (Community)](#커뮤니티-community)
5. [샘플 리포트 (Sample Report)](#샘플-리포트-sample-report)
6. [인증 페이지 (Auth Pages)](#인증-페이지-auth-pages)
7. [앱 페이지 (App Pages)](#앱-페이지-app-pages)
8. [법적 페이지 (Legal Pages)](#법적-페이지-legal-pages)

---

## 🏠 홈페이지 (Homepage)

### Frame 설정
```
Size: 1440x1024px
Background: #1A1A1A
Grid: 12 columns, 8px gap
```

### Sidebar (280px width)
```
Background: #2C2C2C
Border Right: 1px solid #3A3A3A
Padding: 24px
```

#### Logo Section
```
Logo Container: 280x48px
├── Logo Icon: 32x32px
│   Background: 골드 그라데이션 (#FFD700 → #FFA500)
│   Border Radius: 8px
│   Text: "TW" (Montserrat Bold, 16px, White)
├── Logo Text: "ThinkWise"
│   Font: Montserrat Bold, 24px
│   Color: #FFD700
│   Margin Left: 8px
```

#### Navigation Menu
```
Menu Container: 280x200px
Margin Top: 32px

Nav Items (각각):
├── Icon: 20x20px (이모지)
├── Text: Inter Medium, 14px, #E0E0E0
├── Padding: 12px 16px
├── Border Radius: 8px
├── Hover: Background #3A3A3A
└── Active: 골드 그라데이션 배경

메뉴 항목:
1. 🏠 홈 (Active)
2. 🤖 AI 채팅
3. 📊 분석 대시보드
4. 👥 커뮤니티
```

#### Conversation History
```
Section Title: "대화기록"
Font: Inter Semibold, 12px, #BDBDBD
Text Transform: Uppercase
Letter Spacing: 0.05em
Margin Top: 32px
Margin Bottom: 12px

History Items (각각):
├── Text: Inter Regular, 14px, #E0E0E0
├── Padding: 8px 12px
├── Border Radius: 6px
└── Hover: Background #3A3A3A

대화 기록:
1. "팔란티어 기업 분석"
2. "데이터 분석 산업 동향"
```

#### User Profile
```
Container: 280x80px
Margin Top: Auto
Border Top: 1px solid #3A3A3A
Padding Top: 24px

User Info:
├── Avatar: 40x40px
│   Background: 골드 그라데이션
│   Border Radius: 50%
│   Text: "유" (Montserrat Semibold, 16px, White)
├── User Details: 200x40px
│   ├── Name: "유병욱" (Inter Semibold, 14px, #FFFFFF)
│   └── Plan: "Pro Plan" (Inter Medium, 12px, 골드 그라데이션 텍스트)

Settings Link:
├── Icon: ⚙️ (16x16px)
├── Text: "설정" (Inter Regular, 14px, #E0E0E0)
├── Padding: 8px 12px
└── Hover: Background #3A3A3A
```

### Main Content (1160px width)
```
Background: Linear gradient (#1A1A1A → #2C2C2C)
Padding: 32px
```

#### Hero Section
```
Container: 1160x300px
Text Align: Center
Margin Bottom: 64px

Brand Name:
├── Text: "ThinkWise"
├── Font: Montserrat Bold, 60px
├── Background: 골드 그라데이션 (#FFD700 → #FFA500 → #FF8C00 → #FFD700)
├── Background Size: 300% 300%
├── Webkit Background Clip: Text
├── Webkit Text Fill Color: Transparent
├── Animation: gradientShift 3s ease-in-out infinite
└── Margin Bottom: 24px

Sub Headline:
├── Text: "뉴스 빅데이터를 AI로 분석하고 인사이트를 발견하세요"
├── Font: Inter Regular, 20px
├── Color: #E0E0E0
├── Max Width: 600px
├── Margin: 0 auto
└── Line Height: 1.6
```

#### Search Section
```
Container: 800x80px
Margin: 0 auto 64px auto

Search Container:
├── Background: #2C2C2C
├── Border: 2px solid #4A4A4A
├── Border Radius: 16px
├── Padding: 16px
├── Display: Flex
├── Align Items: Center
├── Gap: 16px
├── Focus State: 골드 글로우 효과
└── Transition: 250ms ease-in-out

Search Input:
├── Flex: 1
├── Background: Transparent
├── Border: None
├── Font: Inter Medium, 18px
├── Color: #FFFFFF
├── Placeholder: "뉴스 검색 또는 AI에게 질문하기..."
└── Outline: None

Search Button:
├── Background: 골드 그라데이션 (#FFD700 → #FFA500 → #FF8C00)
├── Background Size: 200% 200%
├── Border: None
├── Border Radius: 12px
├── Padding: 12px 24px
├── Color: #1A1A1A
├── Font: Inter Semibold, 16px
├── Display: Flex
├── Align Items: Center
├── Gap: 8px
├── Animation: buttonGlow 2s ease-in-out infinite
└── Hover: 골드 글로우 + 상승 효과
```

#### Economic Indicators Section
```
Container: 1160x400px

Section Header:
├── Text Align: Center
└── Margin Bottom: 48px

Section Title:
├── Text: "실시간 거시경제 지표"
├── Font: Montserrat Bold, 36px
├── Color: #FFFFFF
└── Margin Bottom: 16px

Section Subtitle:
├── Text: "최신 데이터 기준으로 업데이트됩니다"
├── Font: Inter Regular, 18px
└── Color: #E0E0E0

Indicators Grid:
├── Display: Grid
├── Grid Template Columns: repeat(4, 1fr)
├── Gap: 24px
└── Max Width: 1200px

Indicator Cards (각각):
├── Background: #2C2C2C
├── Border: 1px solid #3A3A3A
├── Border Radius: 12px
├── Padding: 24px
├── Text Align: Center
├── Transition: 250ms ease-in-out
└── Hover: 골드 글로우 + 상승 효과

Indicator Name:
├── Font: Inter Semibold, 18px
├── Color: #FFFFFF
└── Margin Bottom: 12px

Indicator Value:
├── Font: Montserrat Bold, 30px
├── Background: 골드 그라데이션 (#FFD700 → #FFA500)
├── Webkit Background Clip: Text
├── Webkit Text Fill Color: Transparent
└── Margin Bottom: 8px

Indicator Change:
├── Display: Flex
├── Align Items: Center
├── Justify Content: Center
├── Gap: 4px
├── Font: Inter Medium, 14px
└── Color: #4CAF50 (상승) / #F44336 (하락)

지표 데이터:
1. 코스피: 3,196.85 ▲0.2%
2. 미국 10년: 2.85% ▲0.4%
3. WTI: $65.16 ▼1.3%
4. 환율: 1,386.50 ▲1.3%
```

---

## 🤖 AI 채팅 페이지 (Chat)

### Frame 설정
```
Size: 1440x1024px
Background: #1A1A1A
```

### Sidebar (280px width)
```
Background: #2C2C2C
Border Right: 1px solid #3A3A3A
Padding: 24px
```

#### Chat History Section
```
Section Title: "대화 기록"
Font: Inter Semibold, 12px, #BDBDBD
Text Transform: Uppercase
Letter Spacing: 0.05em
Margin Bottom: 16px

History Items (각각):
├── Background: #3A3A3A
├── Border Radius: 8px
├── Padding: 12px 16px
├── Margin Bottom: 8px
├── Font: Inter Regular, 14px, #E0E0E0
└── Hover: 골드 글로우

대화 기록:
1. "테슬라 주가 전망"
2. "AI 반도체 시장 분석"
3. "유럽 경기침체 가능성"
```

#### Quick Actions
```
Container: 280x120px
Margin Top: 32px

Action Buttons (각각):
├── Background: 골드 그라데이션
├── Border Radius: 8px
├── Padding: 12px 16px
├── Font: Inter Medium, 14px, #1A1A1A
├── Text Align: Center
└── Margin Bottom: 8px

액션 버튼:
1. "리포트로 저장하기"
2. "시각화 차트 생성"
3. "커뮤니티에 공유하기"
```

### Main Content (1160px width)
```
Background: #1A1A1A
Padding: 32px
```

#### Chat Interface
```
Container: 1160x600px
Background: #2C2C2C
Border Radius: 16px
Padding: 32px
Margin Bottom: 32px
```

#### AI Message Placeholder
```
Container: 1096x120px
Background: #3A3A3A
Border Radius: 12px
Padding: 20px
Margin Bottom: 24px

Text:
"분석할 뉴스 주제나 키워드를 입력하세요. 예: '전기차 시장 전망'"
Font: Inter Regular, 16px, #E0E0E0
```

#### Sample Questions
```
Container: 1096x200px
Margin Bottom: 24px

Question Items (각각):
├── Background: #3A3A3A
├── Border Radius: 8px
├── Padding: 16px 20px
├── Margin Bottom: 12px
├── Font: Inter Medium, 16px, #E0E0E0
└── Hover: 골드 글로우

샘플 질문:
1. "미국 금리 인상이 코스피에 미치는 영향은?"
2. "반도체 산업의 3분기 실적 전망 알려줘"
3. "최근 유가 변동 원인 분석"
```

#### AI Response Example
```
Container: 1096x300px
Background: #2C2C2C
Border: 1px solid #3A3A3A
Border Radius: 12px
Padding: 24px

Response Structure:
├── Summary Section
│   ├── Title: "요약" (Inter Semibold, 18px, #FFD700)
│   └── Content: "최근 발표된 금리 인상 소식은..." (Inter Regular, 16px, #E0E0E0)
├── Key Indicators Section
│   ├── Title: "핵심 지표" (Inter Semibold, 18px, #FFD700)
│   └── Indicators: 코스피 ▲0.8%, 환율 ▼0.5%
└── Analysis Points Section
    ├── Title: "분석 포인트" (Inter Semibold, 18px, #FFD700)
    └── Points: 과거 금리 인상 시점과 비교...
```

#### Message Input
```
Container: 1160x80px
Background: #2C2C2C
Border: 2px solid #4A4A4A
Border Radius: 16px
Padding: 16px 20px
Display: Flex
Align Items: Center
Gap: 16px

Input Field:
├── Flex: 1
├── Background: Transparent
├── Border: None
├── Font: Inter Regular, 16px, #FFFFFF
├── Placeholder: "메시지를 입력하세요..."
└── Outline: None

Send Button:
├── Background: 골드 그라데이션
├── Border: None
├── Border Radius: 12px
├── Padding: 12px 20px
├── Color: #1A1A1A
├── Font: Inter Semibold, 16px
├── Icon: 📤
└── Hover: 골드 글로우
```

---

## 📊 대시보드 페이지 (Dashboard)

### Frame 설정
```
Size: 1440x1024px
Background: #1A1A1A
```

### Sidebar (280px width)
```
Background: #2C2C2C
Border Right: 1px solid #3A3A3A
Padding: 24px
```

#### Navigation
```
Menu Items (각각):
├── Icon: 20x20px
├── Text: Inter Medium, 14px, #E0E0E0
├── Padding: 12px 16px
├── Border Radius: 8px
└── Hover: Background #3A3A3A

메뉴 항목:
1. 📊 뉴스 분석 대시보드 (Active)
2. 🤖 AI 채팅
3. 📈 리포트 생성
4. 👥 커뮤니티
```

#### Filters
```
Filter Section:
├── Title: "필터" (Inter Semibold, 14px, #BDBDBD)
├── Date Range: "최근 30일" (Inter Regular, 14px, #E0E0E0)
├── Category: "전체" (Inter Regular, 14px, #E0E0E0)
└── Industry: "전체" (Inter Regular, 14px, #E0E0E0)
```

### Main Content (1160px width)
```
Background: #1A1A1A
Padding: 32px
```

#### Page Header
```
Container: 1160x80px
Margin Bottom: 32px

Title:
├── Text: "뉴스 분석 대시보드"
├── Font: Montserrat Bold, 36px, #FFFFFF
└── Margin Bottom: 8px

Subtitle:
├── Text: "실시간 뉴스 데이터 분석 및 트렌드 인사이트"
├── Font: Inter Regular, 18px, #E0E0E0
└── Margin Bottom: 16px

Real-time Badge:
├── Background: #4CAF50
├── Color: White
├── Padding: 4px 12px
├── Border Radius: 16px
├── Font: Inter Medium, 12px
└── Text: "실시간 업데이트"
```

#### KPI Cards Grid
```
Container: 1160x200px
Display: Grid
Grid Template Columns: repeat(4, 1fr)
Gap: 24px
Margin Bottom: 48px

KPI Cards (각각):
├── Background: #2C2C2C
├── Border: 1px solid #3A3A3A
├── Border Radius: 12px
├── Padding: 24px
├── Text Align: Center
└── Hover: 골드 글로우

KPI Data:
1. 총 뉴스 기사: 8,146
2. 분석된 토픽: 245
3. 분석 정확도: 89%
4. 실시간 업데이트: 활성

각 KPI 카드 구조:
├── Value: Montserrat Bold, 36px, #FFD700
├── Label: Inter Medium, 16px, #E0E0E0
└── Description: Inter Regular, 14px, #BDBDBD
```

#### Trending Topics Section
```
Container: 1160x400px
Margin Bottom: 48px

Section Title:
├── Text: "트렌딩 토픽"
├── Font: Montserrat Bold, 24px, #FFFFFF
└── Margin Bottom: 24px

Topics List:
├── Display: Flex
├── Flex Direction: Column
└── Gap: 16px

Topic Items (각각):
├── Background: #3A3A3A
├── Border Radius: 8px
├── Padding: 20px 24px
├── Display: Flex
├── Justify Content: Space Between
├── Align Items: Center
└── Hover: 골드 글로우

Topic Data:
├── Title: Inter Semibold, 16px, #FFFFFF
├── Article Count: Inter Regular, 14px, #E0E0E0
├── Change: Inter Medium, 14px, #4CAF50 (상승) / #F44336 (하락)
└── Description: Inter Regular, 14px, #BDBDBD

트렌딩 토픽:
1. 인공지능 혁신 — 1,247 기사 ▲23.5%
2. 빅데이터 분석 — 892 기사 ▲15.1%
3. 해커톤 문화 — 634 기사 ▲45.8%
4. 클라우드 컴퓨팅 — 523 기사 ▼5.3%
5. 사이버보안 — 486 기사 ▼12.7%
```

#### Category Distribution
```
Container: 560x300px
Background: #2C2C2C
Border: 1px solid #3A3A3A
Border Radius: 12px
Padding: 24px

Section Title:
├── Text: "카테고리별 분포"
├── Font: Montserrat Bold, 20px, #FFFFFF
└── Margin Bottom: 20px

Category Items (각각):
├── Display: Flex
├── Justify Content: Space Between
├── Align Items: Center
├── Padding: 12px 0
└── Border Bottom: 1px solid #3A3A3A

Category Data:
├── Name: Inter Medium, 16px, #E0E0E0
├── Count: Inter Semibold, 16px, #FFD700
└── Percentage: Inter Regular, 14px, #BDBDBD

카테고리:
1. 기술: 2,847건 (35%)
2. 경제: 2,284건 (28%)
3. 사회: 1,792건 (22%)
4. 국제: 1,223건 (15%)
```

#### AI Recommendations
```
Container: 560x300px
Background: #2C2C2C
Border: 1px solid #3A3A3A
Border Radius: 12px
Padding: 24px

Section Title:
├── Text: "AI 맞춤형 성장 제안"
├── Font: Montserrat Bold, 20px, #FFFFFF
└── Margin Bottom: 20px

Recommendation Text:
├── Text: "최근 '인공지능 혁신' 산업에 관한 분석이 60% 증가했습니다..."
├── Font: Inter Regular, 16px, #E0E0E0
├── Line Height: 1.6
└── Margin Bottom: 20px

Action Button:
├── Background: 골드 그라데이션
├── Color: #1A1A1A
├── Padding: 12px 24px
├── Border Radius: 8px
├── Font: Inter Semibold, 16px
└── Text: "'인공지능 혁신' 관련 뉴스 분석하기"
```

---

## 👥 커뮤니티 페이지 (Community)

### Frame 설정
```
Size: 1440x1024px
Background: #1A1A1A
```

### Sidebar (280px width)
```
Background: #2C2C2C
Border Right: 1px solid #3A3A3A
Padding: 24px
```

#### Categories
```
Section Title: "카테고리"
Font: Inter Semibold, 14px, #BDBDBD
Margin Bottom: 16px

Category Items (각각):
├── Background: #3A3A3A
├── Border Radius: 8px
├── Padding: 12px 16px
├── Font: Inter Regular, 14px, #E0E0E0
└── Hover: 골드 글로우

카테고리:
1. 전체
2. 투자 전략
3. 시장 분석
4. 기술 트렌드
5. 경제 동향
```

#### Popular Tags
```
Section Title: "인기 태그"
Font: Inter Semibold, 14px, #BDBDBD
Margin Top: 32px
Margin Bottom: 16px

Tag Items (각각):
├── Background: 골드 그라데이션
├── Color: #1A1A1A
├── Padding: 6px 12px
├── Border Radius: 16px
├── Font: Inter Medium, 12px
└── Margin: 4px

태그:
1. #AI분석
2. #투자전략
3. #시장동향
4. #기술트렌드
5. #경제분석
```

### Main Content (1160px width)
```
Background: #1A1A1A
Padding: 32px
```

#### Page Header
```
Container: 1160x80px
Margin Bottom: 32px

Title:
├── Text: "커뮤니티"
├── Font: Montserrat Bold, 36px, #FFFFFF
└── Margin Bottom: 8px

Subtitle:
├── Text: "투자자들과 인사이트를 공유하세요"
├── Font: Inter Regular, 18px, #E0E0E0
└── Margin Bottom: 16px

Create Post Button:
├── Background: 골드 그라데이션
├── Color: #1A1A1A
├── Padding: 12px 24px
├── Border Radius: 8px
├── Font: Inter Semibold, 16px
└── Text: "새 글 작성"
```

#### Forum Posts
```
Container: 1160x800px
Display: Flex
Flex Direction: Column
Gap: 24px

Post Cards (각각):
├── Background: #2C2C2C
├── Border: 1px solid #3A3A3A
├── Border Radius: 12px
├── Padding: 24px
└── Hover: 골드 글로우

Post Structure:
├── Header
│   ├── Category Tag: 골드 그라데이션 배경, #1A1A1A 텍스트
│   ├── Title: Montserrat Bold, 20px, #FFFFFF
│   └── Meta Info: Inter Regular, 14px, #BDBDBD
├── Content Preview: Inter Regular, 16px, #E0E0E0
├── Tags: 골드 그라데이션 배경, #1A1A1A 텍스트
└── Footer
    ├── Author: Inter Medium, 14px, #E0E0E0
    ├── Date: Inter Regular, 14px, #BDBDBD
    ├── Views: Inter Regular, 14px, #BDBDBD
    └── Likes: Inter Regular, 14px, #BDBDBD

샘플 게시글:
1. "최신 AI 트렌드 분석" - 김분석가 - 2024.01.15 - 조회 1,234 - 좋아요 56
2. "반도체 시장 전망" - 이투자자 - 2024.01.14 - 조회 892 - 좋아요 34
3. "금리 인상 영향 분석" - 박전문가 - 2024.01.13 - 조회 1,567 - 좋아요 78
```

---

## ⚙️ 설정 페이지 (Settings)

### Frame 설정
```
Size: 1440x1024px
Background: #1A1A1A
```

### Sidebar (280px width)
```
Background: #2C2C2C
Border Right: 1px solid #3A3A3A
Padding: 24px
```

#### Settings Navigation
```
Menu Items (각각):
├── Icon: 20x20px
├── Text: Inter Medium, 14px, #E0E0E0
├── Padding: 12px 16px
├── Border Radius: 8px
└── Hover: Background #3A3A3A

설정 메뉴:
1. 👤 프로필 (Active)
2. 💳 플랜 변경
3. 🧾 결제 및 영수증
4. 🔔 알림
5. 🛡️ 보안
```

### Main Content (1160px width)
```
Background: #1A1A1A
Padding: 32px
```

#### Profile Settings
```
Container: 1160x600px

Section Title:
├── Text: "프로필 설정"
├── Font: Montserrat Bold, 24px, #FFFFFF
└── Margin Bottom: 32px

Profile Info:
├── Avatar: 80x80px 골드 그라데이션 원형
├── Name: "유병욱" (Montserrat Bold, 24px, #FFFFFF)
├── Email: "user@example.com" (Inter Regular, 16px, #E0E0E0)
└── Plan: "Pro Plan" (Inter Medium, 16px, 골드 그라데이션 텍스트)

Settings Form:
├── Display: Grid
├── Grid Template Columns: 1fr 1fr
├── Gap: 24px
└── Margin Top: 32px

Form Fields (각각):
├── Label: Inter Medium, 14px, #E0E0E0
├── Input: Background #2C2C2C, Border #3A3A3A, Padding 12px 16px
├── Border Radius: 8px
└── Focus: 골드 글로우

폼 필드:
1. 이름
2. 이메일
3. 회사
4. 직책
5. 전화번호
6. 생년월일

Save Button:
├── Background: 골드 그라데이션
├── Color: #1A1A1A
├── Padding: 12px 32px
├── Border Radius: 8px
├── Font: Inter Semibold, 16px
└── Text: "저장하기"
```

---

## 🔐 인증 페이지 (Auth Pages)

### 로그인 페이지
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
Title: "로그인" (Montserrat Bold, 24px, #FFFFFF)

Form Fields:
├── Email Input: Background #3A3A3A, Border #4A4A4A
├── Password Input: Background #3A3A3A, Border #4A4A4A
└── Focus: 골드 글로우

Login Button: 골드 그라데이션 배경
Links: "회원가입", "비밀번호 찾기" (골드 컬러)
```

### 회원가입 페이지
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
Title: "회원가입" (Montserrat Bold, 24px, #FFFFFF)

Form Fields:
├── Name Input
├── Email Input
├── Password Input
├── Confirm Password Input
└── Terms Checkbox

Signup Button: 골드 그라데이션 배경
Login Link: "이미 계정이 있으신가요?" (골드 컬러)
```

---

## 📄 법적 페이지 (Legal Pages)

### 이용약관 페이지
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
Content: Inter Regular, 16px, #E0E0E0
Line Height: 1.6
```

### 개인정보처리방침 페이지
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
Content: Inter Regular, 16px, #E0E0E0
Line Height: 1.6
```

---

## 🎨 공통 컴포넌트 스펙

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

### 상승 효과
```css
transform: translateY(-4px);
transition: transform 250ms ease-in-out;
```

### 로딩 스피너
```css
border: 2px solid #FFD700;
border-top: 2px solid transparent;
border-radius: 50%;
animation: spin 1s linear infinite;
```

---

*이 스펙을 따라 Kiro에서 정확한 측정값과 디자인으로 각 페이지를 제작하세요.*
*모든 페이지는 design_PRD.md의 요구사항과 design.json의 디자인 토큰을 엄격히 준수해야 합니다.*
