import React, { createContext, useContext, useEffect, useState } from 'react'
import { auth } from '../firebase'
import { onAuthStateChanged, signOut } from 'firebase/auth'

const AuthCtx = createContext(null)
export const useAuth = () => useContext(AuthCtx)

export default function AuthProvider({ children }){
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  useEffect(()=> onAuthStateChanged(auth, (u)=>{ setUser(u); setLoading(false) }),[])
  const value = { user, signOut: ()=>signOut(auth) }
  if(loading) return <div style={{minHeight:'70vh',display:'flex',alignItems:'center',justifyContent:'center'}}>Cargando...</div>
  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>
}
