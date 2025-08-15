from fastapi import APIRouter, Depends, Request
from sse_starlette.sse import EventSourceResponse
from app.auth.security import get_current_user
from app.pipeline.orchestrator import PipelineOrchestrator

router = APIRouter()

@router.post("")
async def ask_question(
    request: Request
    # user: dict = Depends(get_current_user)  # JWT 인증 활성화 시 주석 해제
):
    """SSE를 통해 AI 분석 결과를 스트리밍으로 반환합니다."""
    try:
        body = await request.json()
        query = body.get("query")
        
        if not query:
            return {"error": "Query not provided"}
        
        # 파이프라인 오케스트레이터 초기화 및 실행
        orchestrator = PipelineOrchestrator(query)
        return EventSourceResponse(orchestrator.stream_response())
        
    except Exception as e:
        return {"error": f"Request processing failed: {str(e)}"}
