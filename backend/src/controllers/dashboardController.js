const { fetchQuotes } = require('../services/providers/yahooService');

// KRX, ECOS, DART, KOSIS 등은 이후 확장. 우선 작동 보장을 위해 야후 파이낸스 기반으로 MVP 지표를 구성합니다.

exports.getOverview = async (req, res) => {
  return res.json({ ok: true, message: 'overview' });
};

exports.getKpiData = async (req, res) => {
  try {
    // ^KS11: KOSPI, ^TNX: 미 10년물(지수 단위가 10배), CL=F: WTI 선물, USDKRW=X: 원달러
    const symbols = ['^KS11', '^TNX', 'CL=F', 'USDKRW=X'];
    const quotes = await fetchQuotes(symbols);

    const find = (s) => quotes.find(q => q.symbol === s) || {};
    const kospi = find('^KS11');
    const tnx = find('^TNX');
    const wti = find('CL=F');
    const usdkrw = find('USDKRW=X');

    const data = [
      {
        key: 'kospi',
        name: '코스피',
        value: kospi.regularMarketPrice,
        changePercent: kospi.regularMarketChangePercent,
      },
      {
        key: 'us10y',
        name: '미국 10년',
        value: tnx.regularMarketPrice ? (tnx.regularMarketPrice / 10).toFixed(2) + '%' : null,
        changePercent: tnx.regularMarketChangePercent,
      },
      {
        key: 'wti',
        name: 'WTI',
        value: wti.regularMarketPrice ? `$${wti.regularMarketPrice}` : null,
        changePercent: wti.regularMarketChangePercent,
      },
      {
        key: 'usdkrw',
        name: '환율(USD)',
        value: usdkrw.regularMarketPrice,
        changePercent: usdkrw.regularMarketChangePercent,
      },
    ];

    res.json({ ok: true, data });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
};

const axios = require('axios');
const STOPWORDS = ['그리고','그러나','하지만','대한','우리','사실','이번','최근','지난','및','등','에서','으로','에게','에서','했다','했다.','기자','사진','뉴스','대해','위해','하거나','까지','또한','재','더','곳','수','중','등의'];

exports.getTrendingTopics = async (req, res) => {
  try {
    const { q = '', size = 50, start, end, press } = req.query;
    if (!process.env.BIGKINDS_API_KEY) return res.status(400).json({ ok:false, error: 'BIGKINDS_API_KEY missing' });
    const url = process.env.BIGKINDS_BASE_URL || 'https://www.bigkinds.or.kr/api/news/search.do';
    const payload = { query: q, pageSize: Number(size) };
    if (start) payload.startDate = start; // YYYYMMDD 혹은 API 포맷에 맞게 사용
    if (end) payload.endDate = end;
    if (press) payload.provider = press; // 언론사 필터(스켈레톤)
    const { data } = await axios.post(url, payload, {
      headers: { 'Content-Type': 'application/json', 'Authorization': process.env.BIGKINDS_API_KEY }
    });
    const titles = (data?.resultList || []).map(n => n.title || n.TITLE || '').filter(Boolean);
    const counts = new Map();
    for (const t of titles) {
      const tokens = t.replace(/[^가-힣A-Za-z0-9\s]/g,' ').split(/\s+/).filter(w=>w && w.length>=2 && !STOPWORDS.includes(w));
      tokens.forEach(tok => counts.set(tok, (counts.get(tok)||0)+1));
    }
    const top = Array.from(counts.entries()).sort((a,b)=>b[1]-a[1]).slice(0,10).map(([keyword,count])=>({ keyword, count }));
    res.json({ ok:true, data: top });
  } catch (e) {
    res.status(500).json({ ok:false, error: e.message });
  }
};

exports.getCategoryDistribution = async (req, res) => {
  return res.json({ ok: true, data: [] });
};

exports.getIndustryDistribution = async (req, res) => {
  return res.json({ ok: true, data: [] });
};

exports.getSectorPerformance = async (req, res) => {
  try {
    const { codes, names, symbols } = req.query;
    // 1) KOSCOM 업종지수 우선
    if (process.env.KOSCOM_API_KEY && codes) {
      const axios = require('axios');
      const base = process.env.KOSCOM_SECTOR_BASE_URL || 'https://sandbox-apigw.koscom.co.kr/v2/market/industry/indices';
      const list = codes.split(',');
      const labels = (names || '').split(',');
      const { data } = await axios.get(base, {
        params: { codes },
        headers: { apikey: process.env.KOSCOM_API_KEY }
      });
      // 스켈레톤: 응답 포맷이 다를 수 있으므로 best-effort 변환
      const rows = data?.items || data?.indices || data?.data || [];
      const items = list.map((code, idx) => {
        const row = rows.find(r => (r.code||r.sectorCode) === code) || {};
        const changePct = Number(row.changeRate || row.changePercent || 0);
        return { sector: labels[idx] || code, perf: changePct };
      });
      return res.json({ ok:true, data: items, provider: 'koscom' });
    }

    // 2) 야후 ETF fallback (기존 방식)
    const etfs = (symbols || 'SOXX,IBB,XLK,XLF').split(',');
    const labels = (names || '반도체,바이오,IT,금융').split(',');
    const quotes = await fetchQuotes(etfs);
    const items = etfs.map((sym, idx) => {
      const q = quotes.find(x=>x.symbol===sym) || {};
      return { sector: labels[idx] || sym, perf: Number(q.regularMarketChangePercent||0) };
    });
    res.json({ ok:true, data: items, provider: 'yahoo' });
  } catch (e) {
    res.status(500).json({ ok:false, error: e.message });
  }
};

exports.getRecentReports = async (req, res) => {
  return res.json({ ok: true, data: [] });
};

exports.getUserActivity = async (req, res) => {
  return res.json({ ok: true, data: [] });
};


