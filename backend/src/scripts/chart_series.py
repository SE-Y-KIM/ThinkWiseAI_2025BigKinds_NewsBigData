#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import sys, json

def main():
    try:
        import yfinance as yf
        sym = sys.argv[1]
        name = sys.argv[2] if len(sys.argv) > 2 else sym
        data = yf.download(sym, period='3mo', interval='1d', progress=False)
        if data is None or data.empty:
            print(json.dumps({"chart": None}, ensure_ascii=False))
            return
        # yfinance가 MultiIndex를 반환할 수 있어 안전하게 Close 선택
        try:
            import pandas as pd
            if isinstance(data.columns, pd.MultiIndex):
                close_series = data['Close'].iloc[:, 0]
            else:
                close_series = data['Close']
        except Exception:
            first_col = data.columns[0]
            close_series = data[first_col]
        closes = [float(v) for v in close_series.dropna().tolist()]
        idx = close_series.dropna().index[-len(closes):]
        labels = [f"{d.month}/{d.day}" for d in idx]
        length = min(len(labels), len(closes))
        chart = {
            "title": f"{name} 가격 추이",
            "subtitle": "최근 3개월 · 데이터 소스 Yahoo Finance(yfinance)",
            "updatedAt": str(idx[-1].date()) if len(idx)>0 else "",
            "labels": labels[-length:],
            "series": [{"label": "종가", "data": closes[-length:]}]
        }
        print(json.dumps({"chart": chart}, ensure_ascii=False))
    except Exception as e:
        sys.stderr.write(str(e))
        print(json.dumps({"chart": None}, ensure_ascii=False))

if __name__ == '__main__':
    main()


