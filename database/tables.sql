-- ThinkWise MVP Database Schema
-- Supabase/PostgreSQL에서 실행할 SQL 스크립트

-- UUID 확장 활성화
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. 사용자 정보 테이블
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    subscription_status VARCHAR(20) DEFAULT 'free' -- 'free' 또는 'premium'
);

-- 2. AI 채팅 기록 테이블
CREATE TABLE chats (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    title TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. 대화 메시지 테이블 (사용자 질문, AI 답변)
CREATE TABLE messages (
    id BIGSERIAL PRIMARY KEY,
    chat_id BIGINT REFERENCES chats(id) ON DELETE CASCADE,
    role VARCHAR(20) NOT NULL, -- 'user' 또는 'assistant'
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. 분석 리포트 테이블
CREATE TABLE reports (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    chat_id BIGINT REFERENCES chats(id), -- 어떤 대화를 기반으로 했는지 추적
    title TEXT NOT NULL,
    content JSONB, -- 리포트 내용을 JSON 형식으로 저장
    created_at TIMESTAMPTZ DEFAULT NOW(),
    share_url VARCHAR(255) UNIQUE
);

-- 5. 커뮤니티 포스트 테이블 (MVP 이후 확장)
CREATE TABLE community_posts (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    report_id BIGINT REFERENCES reports(id), -- 공유된 리포트 참조
    title TEXT NOT NULL,
    content TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 인덱스 생성 (성능 향상)
CREATE INDEX idx_chats_user_id ON chats(user_id);
CREATE INDEX idx_messages_chat_id ON messages(chat_id);
CREATE INDEX idx_reports_user_id ON reports(user_id);
CREATE INDEX idx_reports_chat_id ON reports(chat_id);
CREATE INDEX idx_community_posts_user_id ON community_posts(user_id);

-- 샘플 데이터 삽입 (테스트용)
INSERT INTO users (email, full_name, subscription_status) VALUES
('test@thinkwise.ai', '테스트 사용자', 'free'),
('demo@thinkwise.ai', '데모 사용자', 'premium');
