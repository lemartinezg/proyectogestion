import React, { useState } from 'react'
import { classifyExpense } from '../lib/ai'

export default function ChatCoach(){
  const [text, setText] = useState('')
  const [history, setHistory] = useState([])

  const send = () => {
    if(!text.trim()) return
    // Simple local advice using keywords.
    const t = text.toLowerCase()
    let advice = 'Gracias por compartirlo. '
    if(/culpa|mal|me arrepiento|ansiedad|impulso/.test(t)){
      advice += 'Nota el disparador emocional. Considera una regla de 24 horas antes de compras no esenciales.'
    }else if(/feliz|orgullo|logré/.test(t)){
      advice += 'Me alegra. Si fue esencial o planeado, regístralo como positivo. Reserva un % para ahorro.'
    }else{
      advice += 'Piensa si es esencial, útil o prescindible. ¿Podías posponerlo 1 semana?'
    }
    setHistory([{ role:'user', text }, { role:'ai', text:advice }, ...history])
    setText('')
  }

  return (
    <div className="card">
      <h2>Chat (coach local)</h2>
      <div style={{height:220, overflow:'auto', border:'1px solid #1f2937', borderRadius:8, padding:8, background:'#0b1220'}}>
        {history.map((m,i)=>(
          <div key={i} className="small" style={{margin:'6px 0'}}>
            <b>{m.role==='user'?'Tú':'IA'}:</b> {m.text}
          </div>
        ))}
      </div>
      <div className="row" style={{marginTop:8}}>
        <input placeholder="Escribe cómo te sientes o qué pasó..." value={text} onChange={e=>setText(e.target.value)} />
        <button onClick={send}>Enviar</button>
      </div>
    </div>
  )
}
