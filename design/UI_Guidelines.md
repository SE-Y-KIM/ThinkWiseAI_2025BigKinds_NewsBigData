# ThinkiWise UI 가이드라인

## 🎨 디자인 시스템

### 색상 팔레트

#### Primary Colors
- **Primary Blue**: `#00CFFF` - 메인 브랜드 컬러
- **Primary Green**: `#00B37A` - 성공/긍정적 액션
- **Secondary Blue**: `#0066CC` - 호버/강조 상태
- **Accent Orange**: `#FF6B35` - 경고/주의

#### Neutral Colors
- **White**: `#FFFFFF`
- **Light Gray**: `#F8F9FA`
- **Gray 100**: `#F1F3F4`
- **Gray 200**: `#E8EAED`
- **Gray 300**: `#DADCE0`
- **Gray 400**: `#BDC1C6`
- **Gray 500**: `#9AA0A6`
- **Gray 600**: `#80868B`
- **Gray 700**: `#5F6368`
- **Gray 800**: `#3C4043`
- **Gray 900**: `#202124`
- **Black**: `#000000`

#### Status Colors
- **Success**: `#34A853`
- **Warning**: `#FBBC04`
- **Error**: `#EA4335`
- **Info**: `#4285F4`

### 타이포그래피

#### Font Family
- **Primary**: 'Pretendard', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif
- **Mono**: 'JetBrains Mono', 'Fira Code', monospace

#### Font Sizes
- **XS**: 0.75rem (12px)
- **SM**: 0.875rem (14px)
- **Base**: 1rem (16px)
- **LG**: 1.125rem (18px)
- **XL**: 1.25rem (20px)
- **2XL**: 1.5rem (24px)
- **3XL**: 1.875rem (30px)
- **4XL**: 2.25rem (36px)
- **5XL**: 3rem (48px)

#### Font Weights
- **Light**: 300
- **Normal**: 400
- **Medium**: 500
- **Semibold**: 600
- **Bold**: 700
- **Extrabold**: 800

### 간격 시스템

#### Spacing Scale
- **1**: 0.25rem (4px)
- **2**: 0.5rem (8px)
- **3**: 0.75rem (12px)
- **4**: 1rem (16px)
- **5**: 1.25rem (20px)
- **6**: 1.5rem (24px)
- **8**: 2rem (32px)
- **10**: 2.5rem (40px)
- **12**: 3rem (48px)
- **16**: 4rem (64px)
- **20**: 5rem (80px)
- **24**: 6rem (96px)

### Border Radius

- **SM**: 0.25rem (4px)
- **MD**: 0.375rem (6px)
- **LG**: 0.5rem (8px)
- **XL**: 0.75rem (12px)
- **2XL**: 1rem (16px)
- **Full**: 9999px

### 그림자

- **SM**: 0 1px 2px 0 rgba(0, 0, 0, 0.05)
- **MD**: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)
- **LG**: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)
- **XL**: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)

## 📱 반응형 디자인

### Breakpoints
- **SM**: 640px
- **MD**: 768px
- **LG**: 1024px
- **XL**: 1280px
- **2XL**: 1536px

### Grid System
- **Desktop**: 12 컬럼
- **Tablet**: 8 컬럼
- **Mobile**: 4 컬럼

## 🧩 컴포넌트 가이드라인

### 버튼 (Button)

#### Variants
- **Primary**: 파란색 배경, 흰색 텍스트
- **Secondary**: 회색 배경, 검은색 텍스트
- **Outline**: 투명 배경, 파란색 테두리
- **Ghost**: 투명 배경, 회색 텍스트
- **Success**: 초록색 배경
- **Warning**: 노란색 배경
- **Error**: 빨간색 배경

#### Sizes
- **Small**: 32px 높이
- **Medium**: 40px 높이
- **Large**: 48px 높이
- **XLarge**: 56px 높이

### 입력 필드 (Input)

#### States
- **Default**: 회색 테두리
- **Focus**: 파란색 테두리, 파란색 그림자
- **Error**: 빨간색 테두리, 빨간색 그림자
- **Disabled**: 회색 배경, 비활성화

#### Sizes
- **Small**: 32px 높이
- **Medium**: 40px 높이
- **Large**: 48px 높이

### 카드 (Card)

#### 스타일
- 흰색 배경
- 둥근 모서리 (XL)
- 그림자 (SM)
- 호버 시 그림자 증가 (MD)

### 차트 카드 (ChartCard)

#### 구성 요소
- 제목 및 부제목
- 값 표시
- 변화율 표시
- 차트 영역
- 로딩 상태

## 🎯 접근성 (Accessibility)

### 색상 대비
- 모든 텍스트는 최소 4.5:1 대비 비율 유지
- 중요 정보는 색상만으로 전달하지 않음

### 키보드 네비게이션
- 모든 인터랙티브 요소는 키보드로 접근 가능
- 포커스 표시가 명확하게 보임

### 스크린 리더
- 의미있는 alt 텍스트 제공
- 적절한 ARIA 라벨 사용
- 시맨틱 HTML 구조

## 📐 레이아웃 원칙

### 컨테이너
- 최대 너비: 1200px
- 좌우 패딩: 16px (모바일), 32px (데스크톱)

### 그리드
- 12컬럼 그리드 시스템
- 반응형 브레이크포인트에 따라 컬럼 수 조정
- 일관된 간격 사용

### 여백
- 섹션 간 여백: 80px (데스크톱), 48px (모바일)
- 컴포넌트 간 여백: 24px (데스크톱), 16px (모바일)

## 🎨 애니메이션

### 전환 효과
- **Fast**: 150ms ease-in-out
- **Normal**: 250ms ease-in-out
- **Slow**: 350ms ease-in-out

### 호버 효과
- 버튼: translateY(-1px)
- 카드: translateY(-2px)
- 링크: 색상 변화

## 📱 모바일 최적화

### 터치 타겟
- 최소 44px x 44px
- 충분한 간격으로 터치 오류 방지

### 제스처
- 스와이프 제스처 지원
- 터치 피드백 제공

### 성능
- 이미지 최적화
- 지연 로딩 적용
- 번들 크기 최소화

