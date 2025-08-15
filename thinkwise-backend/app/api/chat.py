from fastapi import APIRouter, HTTPException
from ..models.models import ChatRequest, ChatResponse
from ..core.agent import ThinkWiseAgent

router = APIRouter()
agent = ThinkWiseAgent()

@router.post("/chat", response_model=ChatResponse)
async def chat_with_agent(request: ChatRequest):
    """
    사용자 메시지를 받아 AI 에이전트와 대화하는 엔드포인트
    """
    try:
        # TODO: request.chat_id를 이용해 DB에서 이전 대화 기록 불러오기
        history = []  # 현재는 빈 리스트, 향후 DB 연동 필요
        
        analysis_result = agent.get_analysis_and_questions(request.message, history)
        
        # TODO: 사용자 질문과 AI 답변을 DB에 저장
        new_chat_id = request.chat_id if request.chat_id else 1  # 임시 ID
        
        return ChatResponse(
            chat_id=new_chat_id,
            assistant_message=analysis_result["answer"],
            follow_up_questions=analysis_result["questions"],
            visualization_data=analysis_result["visualization"]
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
