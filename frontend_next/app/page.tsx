import Layout from './components/Layout'
import Sparkline from './components/Sparkline'
import SearchBar from './components/SearchBar'

export default function Page(){
  return (
    <Layout>
      <section className="text-center py-16">
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">ThinkWise</h1>
        <p className="text-zinc-300 mt-3">뉴스 빅데이터를 AI로 분석하고 인사이트를 발견하세요</p>
        <div className="mt-8 max-w-3xl mx-auto">
          <SearchBar />
        </div>
      </section>

      {/* 거시경제 지표 */}
      <section className="max-w-6xl mx-auto mt-8">
        <div className="flex items-center justify-between text-zinc-400 text-sm mb-3 px-1">
          <div className="font-semibold text-zinc-200">주요 거시경제 지표</div>
          <div>마지막 업데이트: 오전 12:52:38</div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[{label:'코스피',code:'KOSPI',value:'3,173.57',change:-0.73,series:[9,8,10,7,6,7,9,8,10]},{label:'미국 10년',code:'US10Y',value:'2.84%',change:-0.33,series:[7,6,6.5,6.2,6.8,6.1,5.9,6.3,6.1]},{label:'WTI',code:'WTI',value:'$63.53',change:-2.50,series:[5,4.8,4.7,4.4,4.2,4.5,4.3,4.0,3.9]},{label:'환율(USD)',code:'USDKRW',value:'1389.35',change:+0.21,series:[8,8.2,8.4,8.3,8.5,8.6,8.4,8.7,8.9]}].map((it)=>{
            const negative = it.change < 0
            const stroke = negative? '#ef4444' : '#22c55e'
            return (
              <div key={it.code} className="tw-card">
                <div className="flex items-center justify-between text-sm text-zinc-400 mb-2">
                  <span>{it.label}</span>
                  <span className="uppercase">{it.code}</span>
                </div>
                <div className="text-2xl font-bold mb-1">{it.value}</div>
                <div className={`text-sm ${negative? 'text-red-400':'text-green-400'}`}>{negative? '▼': '▲'} {Math.abs(it.change).toFixed(2)}%</div>
                <div className="mt-2">
                  <Sparkline points={it.series} stroke={stroke} />
                </div>
              </div>
            )
          })}
        </div>
        <div className="text-center text-zinc-500 text-xs mt-2">실제 API 연동 시 실시간 데이터가 표시됩니다</div>
      </section>
    </Layout>
  )
}


