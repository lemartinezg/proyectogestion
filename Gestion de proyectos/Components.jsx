import React, { useMemo, useState } from 'react'
import { collection, deleteDoc, doc, orderBy, query, where } from 'firebase/firestore'
import { db } from '../firebase'
import { useSnapshot } from '../hooks/useSnapshot'

export default function Records({ uid }){
  const q = useMemo(()=> query(collection(db,'expenses'), where('uid','==',uid), orderBy('createdAt','desc')), [uid])
  const { rows } = useSnapshot(q)
  const [search, setSearch] = useState('')
  const [cat, setCat] = useState('')

  const filtered = rows.filter(r=> {
    const text = `${r.category||''} ${r.emotion||''} ${r.description||''}`.toLowerCase()
    return (!cat || r.category===cat) && (!search || text.includes(search.toLowerCase()))
  })

  const remove = async (id)=>{
    if(confirm('¿Eliminar este registro?')) await deleteDoc(doc(db,'expenses',id))
  }

  const exportCSV = ()=>{
    const headers = ['fecha','monto','categoria','emocion','intensidad','clasificacion','score','descripcion']
    const lines = filtered.map(r=>[
      r.createdAt?.toDate?.().toISOString?.() || '',
      r.amount || 0,
      r.category || '',
      r.emotion || '',
      r.intensity || 0,
      r.ai?.label || '',
      r.ai?.score || '',
      (r.description||'').replace(/\n/g,' ')
    ])
    const csv = [headers, ...lines].map(a=>a.map(v=>`"${String(v).replaceAll('"','""')}"`).join(',')).join('\n')
    const blob = new Blob([csv], {type:'text/csv;charset=utf-8;'})
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a'); a.href=url; a.download='emofinance-registros.csv'; a.click()
    URL.revokeObjectURL(url)
  }

  const categories = Array.from(new Set(rows.map(r=>r.category).filter(Boolean)))

  return (
    <div className="card fade-in">
      <div className="panel-title" style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <span>Registros</span>
        <div className="row" style={{alignItems:'center'}}>
          <input placeholder="Buscar texto..." value={search} onChange={e=>setSearch(e.target.value)} style={{maxWidth:220}}/>
          <select value={cat} onChange={e=>setCat(e.target.value)} style={{maxWidth:180}}>
            <option value="">Todas las categorías</option>
            {categories.map(c=> <option key={c} value={c}>{c}</option>)}
          </select>
          <button onClick={exportCSV}>Exportar CSV</button>
        </div>
      </div>
      <table className="table">
        <thead>
          <tr><th>Fecha</th><th>Monto</th><th>Categoría</th><th>Emoción</th><th>Int.</th><th>IA</th><th></th></tr>
        </thead>
        <tbody>
          {filtered.map(r=>(
            <tr key={r.id}>
              <td>{r.createdAt?.toDate?.().toLocaleString?.() || '—'}</td>
              <td>${(r.amount||0).toLocaleString()}</td>
              <td>{r.category}</td>
              <td>{r.emotion}</td>
              <td>{r.intensity}/10</td>
              <td><span className={"badge "+(r.ai?.score>0.68?'ok':r.ai?.score>0.5?'warn':'bad')}>{r.ai?.label||'—'} {r.ai?.score?`• ${r.ai.score}`:''}</span></td>
              <td><button className="secondary" onClick={()=>remove(r.id)}>Eliminar</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      {filtered.length===0 && <div className="small" style={{marginTop:8}}>Sin resultados…</div>}
    </div>
  )
}
