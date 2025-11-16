// src/App.jsx
import React, { useEffect, useState } from 'react'
import AuthProvider, { useAuth } from './auth/AuthProvider.jsx'
import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Landing from './pages/Landing.jsx'

function Gate(){
  const { user } = useAuth()
  const [stage, setStage] = useState('landing') // 'landing' | 'sim'

  if(!user) return <Login/>

  if(stage === 'landing'){
    // ⚠️ SIN envoltorio oscuro aquí
    return <Landing onGo={()=>setStage('sim')} />
  }

  // 🟣 Solo el simulador se envuelve con app-shell
  return (
    <div className="app-shell">
      <Dashboard onHome={()=>setStage('landing')} />
    </div>
  )
}

export default function App(){
  return <AuthProvider><Gate/></AuthProvider>
}
