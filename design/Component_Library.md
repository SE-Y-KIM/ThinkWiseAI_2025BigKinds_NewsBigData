# ThinkiWise 컴포넌트 라이브러리

## 📚 개요

ThinkiWise 컴포넌트 라이브러리는 일관된 사용자 경험을 제공하기 위한 재사용 가능한 UI 컴포넌트들의 모음입니다.

## 🧩 컴포넌트 목록

### 1. Button (버튼)

**위치**: `frontend/src/components/common/Button.jsx`

**기능**:
- 다양한 스타일 변형 지원
- 크기 옵션
- 로딩 상태
- 아이콘 지원

**Props**:
```jsx
{
  variant: 'primary' | 'secondary' | 'outline' | 'ghost' | 'success' | 'warning' | 'error',
  size: 'small' | 'medium' | 'large' | 'xlarge',
  disabled: boolean,
  loading: boolean,
  onClick: function,
  children: ReactNode
}
```

**사용 예시**:
```jsx
<Button variant="primary" size="large" onClick={handleClick}>
  시작하기
</Button>
```

### 2. Input (입력 필드)

**위치**: `frontend/src/components/common/Input.jsx`

**기능**:
- 라벨 지원
- 에러 상태 표시
- 아이콘 지원
- 다양한 크기

**Props**:
```jsx
{
  type: string,
  label: string,
  placeholder: string,
  value: string,
  onChange: function,
  error: string,
  disabled: boolean,
  required: boolean,
  size: 'small' | 'medium' | 'large',
  icon: ReactNode
}
```

**사용 예시**:
```jsx
<Input
  label="이메일"
  type="email"
  placeholder="이메일을 입력하세요"
  value={email}
  onChange={setEmail}
  error={emailError}
  required
/>
```

### 3. ChartCard (차트 카드)

**위치**: `frontend/src/components/common/ChartCard.jsx`

**기능**:
- 제목 및 부제목
- 값 표시
- 변화율 표시
- 차트 영역
- 로딩 상태

**Props**:
```jsx
{
  title: string,
  subtitle: string,
  value: ReactNode,
  change: string,
  changeType: 'positive' | 'negative' | 'neutral',
  chart: ReactNode,
  loading: boolean,
  onClick: function
}
```

**사용 예시**:
```jsx
<ChartCard
  title="총 매출"
  subtitle="이번 달"
  value="₩12,345,678"
  change="+15.3%"
  changeType="positive"
  chart={<LineChart data={salesData} />}
/>
```

### 4. Header (헤더)

**위치**: `frontend/src/components/layout/Header.jsx`

**기능**:
- 로고
- 네비게이션 메뉴
- 사용자 메뉴
- 반응형 모바일 메뉴

**Props**:
```jsx
{
  user: UserObject | null,
  onLogout: function
}
```

**사용 예시**:
```jsx
<Header user={currentUser} onLogout={handleLogout} />
```

## 🎨 스타일 가이드

### CSS 변수 사용

모든 컴포넌트는 CSS 변수를 사용하여 일관된 스타일을 유지합니다:

```css
/* 색상 */
color: var(--primary-blue);
background-color: var(--gray-100);

/* 간격 */
padding: var(--space-4);
margin: var(--space-6);

/* 타이포그래피 */
font-size: var(--text-lg);
font-weight: var(--font-semibold);

/* 그림자 */
box-shadow: var(--shadow-md);
```

### 반응형 디자인

모든 컴포넌트는 모바일 우선 접근법을 사용합니다:

```css
/* 기본 스타일 (모바일) */
.component {
  padding: var(--space-3);
  font-size: var(--text-base);
}

/* 태블릿 */
@media (min-width: 768px) {
  .component {
    padding: var(--space-4);
    font-size: var(--text-lg);
  }
}

/* 데스크톱 */
@media (min-width: 1024px) {
  .component {
    padding: var(--space-6);
    font-size: var(--text-xl);
  }
}
```

## 🔧 컴포넌트 개발 가이드라인

### 1. 파일 구조

```
components/
├── common/           # 범용 컴포넌트
│   ├── Button.jsx
│   ├── Button.css
│   ├── Input.jsx
│   └── Input.css
├── layout/           # 레이아웃 컴포넌트
│   ├── Header.jsx
│   └── Header.css
└── specific/         # 특정 페이지용 컴포넌트
    ├── HeroSection.jsx
    └── HeroSection.css
```

### 2. 네이밍 컨벤션

- **파일명**: PascalCase (예: `Button.jsx`)
- **CSS 클래스**: BEM 방법론 사용 (예: `button--primary`)
- **Props**: camelCase (예: `onClick`, `isLoading`)

### 3. Props 설계 원칙

- **필수 props**: 최소한으로 유지
- **기본값**: 적절한 기본값 제공
- **타입**: PropTypes 또는 TypeScript 사용
- **문서화**: JSDoc 주석 작성

### 4. 접근성 고려사항

```jsx
// 키보드 접근성
<button
  onClick={handleClick}
  onKeyDown={handleKeyDown}
  tabIndex={0}
  aria-label="버튼 설명"
>
  버튼 텍스트
</button>

// 스크린 리더 지원
<div role="status" aria-live="polite">
  {loading ? '로딩 중...' : '완료'}
</div>
```

## 📱 반응형 컴포넌트

### Grid System 활용

```jsx
// 12컬럼 그리드
<div className="grid-12">
  <div className="col-span-12 md:col-span-6 lg:col-span-4">
    <ChartCard />
  </div>
</div>
```

### Flexbox 활용

```jsx
// 반응형 레이아웃
<div className="flex flex-col md:flex-row gap-4">
  <div className="flex-1">
    <Input />
  </div>
  <div className="flex-shrink-0">
    <Button />
  </div>
</div>
```

## 🎯 성능 최적화

### 1. 메모이제이션

```jsx
import React, { memo } from 'react';

const Button = memo(({ children, onClick, ...props }) => {
  return (
    <button onClick={onClick} {...props}>
      {children}
    </button>
  );
});
```

### 2. 지연 로딩

```jsx
import { lazy, Suspense } from 'react';

const HeavyComponent = lazy(() => import('./HeavyComponent'));

function App() {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <HeavyComponent />
    </Suspense>
  );
}
```

### 3. CSS 최적화

```css
/* GPU 가속 활용 */
.component {
  transform: translateZ(0);
  will-change: transform;
}

/* 불필요한 리플로우 방지 */
.component {
  transform: translateX(100px);
  /* width, height 변경 대신 transform 사용 */
}
```

## 🧪 테스트 가이드라인

### 1. 단위 테스트

```jsx
import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

test('버튼 클릭 시 onClick 호출', () => {
  const handleClick = jest.fn();
  render(<Button onClick={handleClick}>클릭</Button>);
  
  fireEvent.click(screen.getByText('클릭'));
  expect(handleClick).toHaveBeenCalledTimes(1);
});
```

### 2. 시각적 테스트

```jsx
test('로딩 상태 표시', () => {
  render(<Button loading>버튼</Button>);
  
  expect(screen.getByRole('button')).toHaveClass('btn--loading');
});
```

## 📚 문서화

### JSDoc 주석

```jsx
/**
 * 재사용 가능한 버튼 컴포넌트
 * @param {Object} props - 컴포넌트 props
 * @param {string} props.variant - 버튼 스타일 변형
 * @param {string} props.size - 버튼 크기
 * @param {boolean} props.disabled - 비활성화 상태
 * @param {Function} props.onClick - 클릭 핸들러
 * @param {ReactNode} props.children - 버튼 내용
 * @returns {JSX.Element} 버튼 컴포넌트
 */
const Button = ({ variant = 'primary', size = 'medium', ...props }) => {
  // 컴포넌트 구현
};
```

### Storybook 활용

```jsx
// Button.stories.js
export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'outline']
    }
  }
};

export const Primary = {
  args: {
    variant: 'primary',
    children: '버튼'
  }
};
```

