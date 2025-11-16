import React, { useState } from 'react'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'

export default function Login(){
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [err, setErr] = useState('')
  const [mode, setMode] = useState('login')

  const submit = async (e)=>{
    e.preventDefault(); setErr('')
    try{
      if(mode==='signup') await createUserWithEmailAndPassword(auth, email, pass)
      else await signInWithEmailAndPassword(auth, email, pass)
    }catch(e){ setErr(e.message) }
  }

  return (
    <div style={{minHeight:'100vh',display:'grid',placeItems:'center',padding:16}}>
      <div className="card" style={{minWidth:360,maxWidth:430}}>
        <h1>EmoFinance</h1>
        <form onSubmit={submit} className="grid" style={{marginTop:14}}>
          <label>Correo<input type="email" value={email} onChange={e=>setEmail(e.target.value)} required/></label>
          <label>Contraseña<input type="password" value={pass} onChange={e=>setPass(e.target.value)} required minLength={6}/></label>
          {err && <div className="small" style={{color:'#ffb4a3'}}>{err}</div>}
          <div className="row">
            <button type="submit">{mode==='login' ? 'Entrar' : 'Crear cuenta'}</button>
            <button type="button" className="secondary" onClick={()=>setMode(mode==='login'?'signup':'login')}>
              {mode==='login'?'¿No tienes cuenta? Regístrate':'¿Ya tienes cuenta? Inicia sesión'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

