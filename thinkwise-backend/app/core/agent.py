import os
import openai
from dotenv import load_dotenv
import json
import re

# .env 파일에서 환경 변수 로드
load_dotenv()
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

class ThinkWiseAgent:
    def get_analysis_and_questions(self, user_message: str, history: list = []):
        """
        사용자 질문을 분석하고, 답변 및 꼬리 질문을 생성하는 핵심 AI 에이전트
        """
        # 기획서의 PESTEL, SWOT 등 분석 프레임워크를 프롬프트에 녹여냅니다.
        system_prompt = """
        당신은 'ThinkWise AI'의 핵심 투자 분석가입니다. 당신의 목표는 단순히 정보를 제공하는 것이 아니라,
        사용자가 스스로 사고하도록 돕는 것입니다. 교육 심리학에 기반하여, 사용자의 관점을 확장할 수 있는
        '꼬리 질문'을 반드시 3개 제안해야 합니다. 답변은 구조적이고 논리적이어야 합니다.
        
        응답 형식:
        [답변]
        여기에 상세한 분석 답변을 작성하세요.
        
        [꼬리질문]
        1. 첫 번째 꼬리 질문
        2. 두 번째 꼬리 질문
        3. 세 번째 꼬리 질문
        """

        messages = [{"role": "system", "content": system_prompt}]
        messages.extend(history)
        messages.append({"role": "user", "content": user_message})

        try:
            # OpenAI 1.0.0+ 버전에 맞는 API 호출 방식
            client = openai.OpenAI(api_key=OPENAI_API_KEY)
            response = client.chat.completions.create(
                model="gpt-4.1-mini",
                messages=messages,
                temperature=0.7,
            )
            
            ai_response = response.choices[0].message.content

            # 실제 구현에서는 LLM을 통해 답변과 질문을 분리 추출해야 합니다.
            # 예시: "답변입니다. \n\n[꼬리질문]\n1. 질문1\n2. 질문2\n3. 질문3"
            # 이 부분을 파싱하는 로직이 필요합니다.
            main_answer = ai_response.split("[꼬리질문]")[0].strip()
            follow_up_questions_str = ai_response.split("[꼬리질문]")[1] if "[꼬리질문]" in ai_response else ""
            
            questions = [q.strip() for q in follow_up_questions_str.split("\n") if q.strip()]

            # TODO: 뉴스/DART 데이터 API를 호출하고 분석하여 시각화 데이터 생성
            # 예: {'type': 'line_chart', 'data': {'labels': ['2023', '2024'], 'values': [100, 120]}}
            visualization_data = self.fetch_data_and_visualize(user_message)

            return {
                "answer": main_answer,
                "questions": questions[:3], # 3개만 반환
                "visualization": visualization_data
            }
        except Exception as e:
            print(f"Error calling OpenAI: {e}")
            return {
                "answer": "죄송합니다. 분석 중 오류가 발생했습니다. 다시 시도해주세요.",
                "questions": [],
                "visualization": None
            }

    def fetch_data_and_visualize(self, query: str):
        # 이 함수는 MVP의 핵심입니다.
        # Big KINDS, DART, KOSIS 등에서 키워드(query) 관련 데이터를 가져와야 합니다.
        # 지금은 더미 데이터를 반환합니다.
        print(f"'{query}' 관련 데이터 수집 및 시각화 로직 실행...")
        return {
            "title": f"'{query}' 관련 주요 지표",
            "type": "line_chart",
            "data": {
                "labels": ["1분기", "2분기", "3분기", "4분기"],
                "datasets": [{
                    "label": "매출액 (억원)",
                    "data": [100, 120, 110, 150]
                }]
            }
        }
