import openai
from app.core.config import OPENAI_API_KEY

# OpenAI API 키 설정
openai.api_key = OPENAI_API_KEY

async def generate_grounded_response(query: str, context: str):
    """수집된 근거(context)를 바탕으로 최종 답변을 생성하고 스트리밍으로 반환합니다."""
    system_prompt = """
    당신은 'ThinkWise AI'의 투자 분석가입니다. 당신의 임무는 제공된 [근거 데이터]만을 사용하여 사용자의 질문에 대해 답변하는 것입니다.
    답변은 반드시 데이터에 기반해야 하며, 당신의 사전 지식을 사용해서는 안 됩니다.
    답변 후에는 사용자의 사고를 확장할 수 있는 날카로운 [꼬리질문] 3개를 제안해야 합니다.
    """
    
    user_prompt = f"""
    [사용자 질문]
    {query}

    [근거 데이터]
    {context}

    [요청사항]
    위 [근거 데이터]를 바탕으로 [사용자 질문]에 대한 분석과 [꼬리질문] 3개를 생성해주세요.
    """
    
    try:
        # OpenAI 1.0.0+ 버전에 맞는 API 호출 방식
        client = openai.OpenAI(api_key=OPENAI_API_KEY)
        response_stream = client.chat.completions.create(
            model="gpt-4.1-mini",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt}
            ],
            stream=True # 스트리밍 응답 활성화
        )
        
        print("[RAG] 근거 기반 답변 생성 시작...")
        for chunk in response_stream:
            if chunk.choices[0].delta.content:
                yield chunk.choices[0].delta.content
                
    except Exception as e:
        print(f"[RAG] OpenAI API 호출 중 오류 발생: {str(e)}")
        error_message = f"죄송합니다. AI 분석 중 오류가 발생했습니다: {str(e)}"
        yield error_message
