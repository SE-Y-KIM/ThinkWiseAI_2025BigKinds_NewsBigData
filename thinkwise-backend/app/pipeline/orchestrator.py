import asyncio
from .steps import a_nlu, b_planning, e_rag_generation

class PipelineOrchestrator:
    def __init__(self, query: str):
        self.query = query
        self.context = ""

    async def execute_plan(self, plan: list):
        """계획에 따라 도구들을 비동기적으로 실행하고 컨텍스트를 구축합니다."""
        # 여러 도구를 동시에 실행하여 성능 향상
        tasks = [step["tool"](*step["args"]) for step in plan]
        results = await asyncio.gather(*tasks)
        self.context = "\n".join(results)
        print(f"[Orchestrator] 컨텍스트 구축 완료:\n{self.context}")

    async def stream_response(self):
        """전체 파이프라인을 순서대로 실행하고 결과를 스트리밍합니다."""
        try:
            # A. NLU
            nlu_result = await a_nlu.analyze_intent_and_entities(self.query)
            yield "event: status\ndata: 사용자의 의도를 분석했습니다.\n\n"

            # B. Agent Plan & Tool Execution
            plan = await b_planning.create_agent_plan(nlu_result)
            yield "event: status\ndata: 분석 계획을 수립하고 데이터 수집을 시작합니다.\n\n"
            
            if plan:
                await self.execute_plan(plan)
                yield "event: status\ndata: 데이터 수집 및 가공이 완료되었습니다.\n\n"
            else:
                yield "event: status\ndata: 분석할 수 있는 기업 정보를 찾을 수 없습니다.\n\n"
                return

            # C, D, F, G 단계는 MVP에서 생략하고 E 단계에 통합
            # TODO: Policy Gate, Context Building, Formatting, Save 로직 구현

            # E. RAG Generation
            async for chunk in e_rag_generation.generate_grounded_response(self.query, self.context):
                yield f"event: message\ndata: {chunk}\n\n"
                
            yield "event: end\ndata: التحليل اكتمل\n\n" # 종료 신호
            
        except Exception as e:
            print(f"[Orchestrator] 파이프라인 실행 중 오류 발생: {str(e)}")
            yield f"event: error\ndata: 파이프라인 실행 중 오류가 발생했습니다: {str(e)}\n\n"
            yield "event: end\ndata: 오류로 인한 종료\n\n"
