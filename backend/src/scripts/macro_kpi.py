#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import sys, json
try:
    import yfinance as yf
    import pandas as pd
except Exception as e:
    sys.stderr.write(str(e))
    sys.exit(2)

def spark(values, n=12):
    if not values:
        return []
    if len(values) <= n:
        return [float(v) for v in values]
    step = len(values) / n
    out = []
    i = 0.0
    while len(out) < n:
        out.append(float(values[int(i)]))
        i += step
    return out

def last_close(ticker):
    df = yf.download(ticker, period='3mo', interval='1d', progress=False)
    if df is None or df.empty:
        return None
    # yfinance가 MultiIndex 컬럼을 반환할 수 있어 안전하게 Close 선택
    try:
        if isinstance(df.columns, pd.MultiIndex):
            close_series = df['Close'].iloc[:, 0]
        else:
            close_series = df['Close']
    except Exception:
        # 예외 시 첫 컬럼 사용
        close_series = df[df.columns[0]]
    closes = close_series.dropna().tolist()
    if not closes:
        return None
    last = closes[-1]
    prev = closes[-2] if len(closes) > 1 else last
    change_pct = (last - prev) / prev * 100 if prev else 0.0
    return last, change_pct, spark(closes)

def main():
    # 심볼 매핑
    symbols = {
        'KOSPI': '^KS11',
        'US10Y': '^TNX',         # 10yr yield *10 (야후 표기), 표시 시 보정 가능
        'WTI': 'CL=F',
        'USDKRW': 'KRW=X'
    }
    items = []
    for code, sym in symbols.items():
        data = last_close(sym)
        if not data:
            continue
        last, chg, series = data
        if code == 'US10Y':
            value_str = f"{round(last/10, 2)}%"  # ^TNX 보정
        elif code == 'WTI':
            value_str = f"${round(last, 2):,.2f}"
        elif code == 'USDKRW':
            value_str = f"{round(last, 2):,.2f}"
        else:
            value_str = f"{round(last, 2):,.2f}"
        items.append({
            'label': '코스피' if code=='KOSPI' else ('미국 10년' if code=='US10Y' else ('WTI' if code=='WTI' else '환율(USD)')),
            'code': code,
            'value': value_str,
            'changePct': round(chg, 2),
            'series': [round(v, 2) for v in series[-12:]]
        })
    output = { 'ok': True, 'source': 'yfinance', 'items': items }
    sys.stdout.write(json.dumps(output, ensure_ascii=False))

if __name__ == '__main__':
    main()


