async def analyze_intent_and_entities(query: str) -> dict:
    """사용자 질문의 의도(intent)와 핵심 개체(NER)를 분석합니다."""
    # TODO: 실제 NLU 모델(e.g., Spacy, 자체 학습 모델) 또는 
    # OpenAI Functions/Tools를 사용하여 정교한 NLU 로직 구현
    
    # MVP에서는 키워드 기반으로 간단하게 구현합니다
    intent = "기업 분석"
    entities = {"company": [], "period": "최근"}
    
    # 예시: '삼성전자' 키워드가 있으면 기업으로 인식
    if "삼성전자" in query:
        entities["company"].append("삼성전자")
    
    if "SK하이닉스" in query:
        entities["company"].append("SK하이닉스")
    
    if "LG" in query:
        entities["company"].append("LG")
    
    if "현대차" in query or "현대자동차" in query:
        entities["company"].append("현대자동차")
    
    if "기아" in query:
        entities["company"].append("기아")
    
    if "포스코" in query:
        entities["company"].append("포스코")
    
    if "NAVER" in query or "네이버" in query:
        entities["company"].append("NAVER")
    
    if "카카오" in query:
        entities["company"].append("카카오")
    
    # 기간 관련 키워드 분석
    if "최근" in query or "이번 분기" in query:
        entities["period"] = "최근"
    elif "작년" in query or "전년" in query:
        entities["period"] = "작년"
    elif "3년" in query or "장기" in query:
        entities["period"] = "장기"
    
    # 분석 유형 키워드 분석
    if "비교" in query or "대비" in query:
        intent = "기업 비교 분석"
    elif "성장" in query or "전망" in query:
        intent = "성장성 분석"
    elif "위험" in query or "리스크" in query:
        intent = "리스크 분석"
    elif "투자" in query or "매수" in query or "매도" in query:
        intent = "투자 판단"
    
    print(f"[NLU] Intent: {intent}, Entities: {entities}")
    return {"intent": intent, "entities": entities}
