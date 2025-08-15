from app.tools import api_tools

async def create_agent_plan(nlu_result: dict) -> list:
    """NLU 결과를 바탕으로 어떤 도구를 어떤 순서로 사용할지 계획을 세웁니다."""
    plan = []
    intent = nlu_result.get("intent")
    entities = nlu_result.get("entities", {})
    
    if intent == "기업 분석" and entities.get("company"):
        for company in entities["company"]:
            # 계획: 각 회사에 대해 주가 검색과 재무 정보 검색을 순차적으로 실행
            plan.append({"tool": api_tools.search_realtime_stock_price, "args": [company]})
            plan.append({"tool": api_tools.search_financial_reports, "args": [company]})
            plan.append({"tool": api_tools.search_market_data, "args": [company]})
    
    elif intent == "기업 비교 분석" and len(entities.get("company", [])) > 1:
        # 기업 비교 분석의 경우 추가 도구 사용
        for company in entities["company"]:
            plan.append({"tool": api_tools.search_realtime_stock_price, "args": [company]})
            plan.append({"tool": api_tools.search_financial_reports, "args": [company]})
            plan.append({"tool": api_tools.search_market_data, "args": [company]})
        
        # 비교 분석을 위한 추가 도구
        if len(entities["company"]) >= 2:
            plan.append({"tool": api_tools.search_industry_comparison, "args": [entities["company"][0]]})
    
    elif intent == "성장성 분석" and entities.get("company"):
        for company in entities["company"]:
            plan.append({"tool": api_tools.search_financial_reports, "args": [company]})
            plan.append({"tool": api_tools.search_market_data, "args": [company]})
    
    elif intent == "리스크 분석" and entities.get("company"):
        for company in entities["company"]:
            plan.append({"tool": api_tools.search_financial_reports, "args": [company]})
            plan.append({"tool": api_tools.search_market_data, "args": [company]})
    
    elif intent == "투자 판단" and entities.get("company"):
        for company in entities["company"]:
            plan.append({"tool": api_tools.search_realtime_stock_price, "args": [company]})
            plan.append({"tool": api_tools.search_financial_reports, "args": [company]})
            plan.append({"tool": api_tools.search_market_data, "args": [company]})
            plan.append({"tool": api_tools.search_industry_comparison, "args": [company]})

    print(f"[Planner] 생성된 계획: {len(plan)} 단계")
    return plan
