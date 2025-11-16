import React, { useState } from 'react'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase'
import { classifyExpenseAdvanced } from '../lib/ai'

const categories = ['Alimentación','Transporte','Vivienda','Servicios','Salud','Educación','Ocio','Tecnología','Otros']
const emotions = ['Felicidad','Alivio','Orgullo','Tristeza','Ansiedad','Culpa','Ira']

export default function ExpenseForm({ uid, recentRows=[] }){
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState(categories[0])
  const [emotion, setEmotion] = useState(emotions[0])
  const [intensity, setIntensity] = useState(5)
  const [description, setDescription] = useState('')
  const [ai, setAi] = useState(null)
  const [saving, setSaving] = useState(false)

  const onClassify = () => setAi(classifyExpenseAdvanced({ amount, category, emotion, intensity, description }, recentRows))

  const onSubmit = async (e) => {
    e.preventDefault(); setSaving(true)
    const res = ai ?? classifyExpenseAdvanced({ amount, category, emotion, intensity, description }, recentRows)
    await addDoc(collection(db, 'expenses'), {
      uid, amount: Number(amount), category, emotion, intensity: Number(intensity),
      description, ai: res, createdAt: serverTimestamp()
    })
    setAmount(''); setDescription(''); setAi(null); setIntensity(5)
    setSaving(false)
  }

  return (
    <div className="card fade-in">
      <div className="panel-title">Registrar gasto</div>
      <form className="grid" onSubmit={onSubmit}>
        <label>Monto ($)<input inputMode="numeric" value={amount} onChange={e=>setAmount(e.target.value)} required/></label>
        <label>Categoría
          <select value={category} onChange={e=>setCategory(e.target.value)}>
            {categories.map(c=> <option key={c}>{c}</option>)}
          </select>
        </label>
        <label>Emoción
          <select value={emotion} onChange={e=>setEmotion(e.target.value)}>
            {emotions.map(c=> <option key={c}>{c}</option>)}
          </select>
        </label>
        <label>Intensidad: {intensity}/10
          <input type="range" min="1" max="10" value={intensity} onChange={e=>setIntensity(Number(e.target.value))}/>
        </label>
        <label>Descripción (opcional)<textarea rows={2} value={description} onChange={e=>setDescription(e.target.value)}/></label>
        <div className="row">
          <button type="button" onClick={onClassify}>Evaluar con IA</button>
          <button type="submit" disabled={saving}>{saving?'Guardando...':'Agregar'}</button>
        </div>

        {ai && (
          <div className="small">
            IA: <span className={"badge "+(ai.score>0.70?'ok':ai.score>0.52?'warn':'bad')}>
              {ai.label} • {ai.score}
            </span>
            {ai.reasons?.length ? <> — {ai.reasons.join(', ')}</> : null}
            {ai.suggestions?.length ? (
              <ul style={{marginTop:8}}>
                {ai.suggestions.map((s,i)=><li key={i} className="small">• {s}</li>)}
              </ul>
            ) : null}
          </div>
        )}
      </form>
    </div>
  )
}
