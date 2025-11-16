import React, { useMemo } from 'react'

export default function Stats({ rows=[] }){
  const fmt = (n)=> (Number(n)||0).toLocaleString()

  const getMillis = (r) => {
    const ts = r && r.createdAt
    return ts && typeof ts.toMillis === 'function' ? ts.toMillis() : null
  }

  const now = Date.now()
  const last7  = now - 1000*60*60*24*7
  const prev14 = now - 1000*60*60*24*14
  const last30 = now - 1000*60*60*24*30

  const totals = useMemo(()=> {
    const t = rows.reduce((s,r)=>s+(r.amount||0),0)
    const intensAvg = rows.length ? (rows.reduce((s,r)=>s+(r.intensity||0),0)/rows.length) : 0

    const s7  = rows.filter(r=>{ const ms=getMillis(r); return ms && ms>=last7}).reduce((s,r)=>s+(r.amount||0),0)
    const p7  = rows.filter(r=>{ const ms=getMillis(r); return ms && ms<last7 && ms>=prev14}).reduce((s,r)=>s+(r.amount||0),0)
    const trend = p7 ? ((s7 - p7)/p7)*100 : (s7 ? 100 : 0)

    const last30Rows = rows.filter(r=>{ const ms=getMillis(r); return ms && ms>=last30 })
    const byCat = last30Rows.reduce((acc,r)=>{
      const a = Number(r.amount)||0
      if(!acc[r.category]) acc[r.category]=0
      acc[r.category]+=a
      return acc
    },{})
    const topCats = Object.entries(byCat).sort((a,b)=>b[1]-a[1]).slice(0,5)

    const byLabel = rows.reduce((acc,r)=>{
      const lbl = r.ai?.label || '—'
      acc[lbl] = (acc[lbl]||0) + 1
      return acc
    },{})

    return { total:t, intensAvg: Number(intensAvg.toFixed(1)), s7, p7, trend, topCats, byLabel }
  }, [rows])

  const last = rows.slice(0,6)

  return (
    <div className="card fade-in">
      <div className="panel-title">Estadísticas</div>

      <div className="row">
        <div className="col card kpi">
          <div className="small">Total registrado</div>
          <div className="value">${fmt(totals.total)}</div>
        </div>
        <div className="col card kpi">
          <div className="small">Intensidad media</div>
          <div className="value">{totals.intensAvg}/10</div>
        </div>
        <div className="col card kpi">
          <div className="small">Tendencia 7d</div>
          <div className="value">{ (totals.trend>=0?'+':'') + Math.round(totals.trend) }%</div>
        </div>
      </div>

      <h3 style={{marginTop:12}}>Top categorías (30 días)</h3>
      <table className="table">
        <thead><tr><th>Categoría</th><th>Monto</th></tr></thead>
        <tbody>
          {totals.topCats.length ? totals.topCats.map(([cat, val])=>(
            <tr key={cat}><td>{cat}</td><td>${fmt(val)}</td></tr>
          )) : <tr><td colSpan={2}>Sin datos recientes…</td></tr>}
        </tbody>
      </table>

      <h3 style={{marginTop:12}}>Distribución por evaluación IA</h3>
      <div className="row">
        {Object.keys(totals.byLabel).length ? Object.entries(totals.byLabel).map(([lbl, n])=>(
          <div className="col card" key={lbl}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <b>{lbl}</b>
              <span className={"badge "+(lbl==='Muy bueno' || lbl==='Bueno' ? 'ok' : lbl==='Útil/Neutral' ? 'warn' : 'bad')}>
                {n}
              </span>
            </div>
          </div>
        )) : <div className="small" style={{padding:10}}>Aún no hay clasificaciones…</div>}
      </div>

      <h3 style={{marginTop:12}}>Últimos gastos</h3>
      <div className="grid">
        {last.map(r=>(
          <div className="card" key={r.id}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <div><b>${(r.amount||0).toLocaleString()}</b> • {r.category}</div>
              <div className={"badge "+(r.ai?.score>0.70?'ok':r.ai?.score>0.52?'warn':'bad')}>{r.ai?.label||'—'}</div>
            </div>
            <div className="small">{r.emotion} • intens {r.intensity}/10</div>
            {r.description && <div className="small" style={{opacity:.9}}>{r.description}</div>}
          </div>
        ))}
      </div>
    </div>
  )
}
