import React, { useMemo, useState } from 'react'
import ExpenseForm from '../components/ExpenseForm.jsx'
import Stats from '../components/Stats.jsx'
import Records from '../components/Records.jsx'
import { useAuth } from '../auth/AuthProvider.jsx'
import { collection, orderBy, query, where } from 'firebase/firestore'
import { db } from '../firebase'
import { useSnapshot } from '../hooks/useSnapshot'

export default function Dashboard({ onHome }){
  const { user, signOut } = useAuth()

  const q = useMemo(()=> query(
    collection(db,'expenses'),
    where('uid','==',user.uid),
    orderBy('createdAt','desc')
  ), [user.uid])

  const { rows } = useSnapshot(q)
  const [tab, setTab] = useState('panel') // panel | registros

  return (
    <div style={{padding:18}}>
      <div className="row" style={{justifyContent:'space-between',alignItems:'center',marginBottom:10}}>
        <div>
          <h1 style={{letterSpacing:.3}}>Simulador emocional de gastos</h1>
          <div className="small">Sesión: {user.email}</div>
        </div>
        <div className="row">
          <button className="secondary" onClick={onHome}>Inicio</button>
          <button className={tab==='panel'?'':'secondary'} onClick={()=>setTab('panel')}>Panel</button>
          <button className={tab==='registros'?'':'secondary'} onClick={()=>setTab('registros')}>Registros</button>
          <button className="secondary" onClick={signOut}>Salir</button>
        </div>
      </div>

      {tab==='panel' ? (
        <div className="grid" style={{gridTemplateColumns:'1.1fr 1fr'}}>
          <div><ExpenseForm uid={user.uid} recentRows={rows}/></div>
          <div><Stats rows={rows}/></div>
        </div>
      ) : (
        // 👇 Pasamos las filas ya consultadas para que Records solo renderice
        <Records rows={rows}/>
      )}
    </div>
  )
}

