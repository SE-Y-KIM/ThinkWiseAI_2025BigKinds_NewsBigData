def calculate_pe_ratio(price: float, earnings_per_share: float) -> float:
    """PER(주가수익비율)를 계산합니다."""
    if earnings_per_share <= 0:
        return float('inf')
    return price / earnings_per_share

def calculate_pb_ratio(price: float, book_value_per_share: float) -> float:
    """PBR(주가순자산비율)를 계산합니다."""
    if book_value_per_share <= 0:
        return float('inf')
    return price / book_value_per_share

def calculate_roe(net_income: float, shareholders_equity: float) -> float:
    """ROE(자기자본이익률)를 계산합니다."""
    if shareholders_equity <= 0:
        return 0.0
    return (net_income / shareholders_equity) * 100

def calculate_operating_margin(operating_income: float, revenue: float) -> float:
    """영업이익률을 계산합니다."""
    if revenue <= 0:
        return 0.0
    return (operating_income / revenue) * 100

def calculate_debt_ratio(total_debt: float, total_assets: float) -> float:
    """부채비율을 계산합니다."""
    if total_assets <= 0:
        return float('inf')
    return (total_debt / total_assets) * 100

def calculate_current_ratio(current_assets: float, current_liabilities: float) -> float:
    """유동비율을 계산합니다."""
    if current_liabilities <= 0:
        return float('inf')
    return current_assets / current_liabilities

def calculate_growth_rate(current_value: float, previous_value: float) -> float:
    """성장률을 계산합니다."""
    if previous_value <= 0:
        return 0.0
    return ((current_value - previous_value) / previous_value) * 100

def calculate_compound_annual_growth_rate(final_value: float, initial_value: float, years: float) -> float:
    """연평균 성장률(CAGR)을 계산합니다."""
    if initial_value <= 0 or years <= 0:
        return 0.0
    return (pow(final_value / initial_value, 1 / years) - 1) * 100
