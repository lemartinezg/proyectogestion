// IA v3: señales combinadas + explicaciones + sugerencias
export function classifyExpenseAdvanced(input, recentRows = []) {
  const { amount = 0, category = '', emotion = '', intensity = 5, description = '' } = input;
  const amt = Number(amount) || 0;
  let score = 0.5;

  const essentials = ['Alimentación','Transporte','Vivienda','Servicios','Salud'];
  const discretionary = ['Ocio','Tecnología','Otros','Educación'];
  const positive = ['Felicidad','Alivio','Orgullo'];
  const negative = ['Culpa','Ansiedad','Tristeza','Ira'];

  // 1) Heurística base
  if (essentials.includes(category)) score += 0.18;
  if (discretionary.includes(category) && amt > 150000) score -= 0.08;

  if (amt > 300000) score -= 0.25;
  if (amt > 600000) score -= 0.35;
  if (amt < 30000)  score += 0.05;

  if (positive.includes(emotion)) score += 0.06;
  if (negative.includes(emotion)) score -= 0.10;

  // premiar moderación (pico en 5)
  const inten = Number(intensity);
  if (!Number.isNaN(inten)) score += (5 - Math.abs(inten - 5)) * 0.02;

  // 2) Texto (palabras clave)
  const desc = String(description || '').toLowerCase();
  if (/impulso|antojo|caprich|borrach|apuestas|deuda impaga/.test(desc)) score -= 0.25;
  if (/medic|arriendo|universidad|colegi|trabajo|herramient|ahorro|inversi|útil|util|necesario/.test(desc)) score += 0.18;
  if (/promo|descuento|oferta/.test(desc)) score += 0.03; // pequeña mejora si hay ahorro explícito
  if (/crédito|tarjeta|interés|cuota/.test(desc)) score -= 0.05; // penaliza coste financiero

  // Normalizar historial
  const rows = Array.isArray(recentRows) ? recentRows.slice(0, 180) : [];
  const getMillis = (r) => {
    const ts = r && r.createdAt;
    return ts && typeof ts.toMillis === 'function' ? ts.toMillis() : null;
  };

  // 3) Z-score por categoría (si hay suficientes datos)
  const catRows = rows.filter(r => r && r.category === category && typeof r.amount === 'number');
  if (catRows.length >= 5) {
    const avg = catRows.reduce((s, r) => s + (Number(r.amount) || 0), 0) / catRows.length;
    const variance = catRows.reduce((s, r) => {
      const x = (Number(r.amount) || 0) - avg;
      return s + x * x;
    }, 0) / catRows.length;
    const sd = Math.sqrt(variance) || 1;
    const z = (amt - avg) / sd;
    if (z > 1.0)  score -= Math.min(0.35, z * 0.08); // muy por encima de tu media
    if (z < -1.2) score += Math.min(0.22, Math.abs(z) * 0.06); // bastante por debajo (ahorro)
  }

  // 4) Frecuencia semanal (discrecional)
  const now = Date.now();
  const recentWeek = rows.filter(r => {
    const ms = getMillis(r);
    return ms !== null && (now - ms) < 1000*60*60*24*7;
  });
  const countSameCat = recentWeek.filter(r => r.category === category).length;
  if (discretionary.includes(category) && countSameCat >= 3) score -= 0.12;

  // 5) Concentración últimos 30 días por categoría
  const last30 = rows.filter(r => {
    const ms = getMillis(r);
    return ms !== null && (now - ms) < 1000*60*60*24*30;
  });
  const total30 = last30.reduce((s,r)=> s + (Number(r.amount)||0), 0) || 1;
  const byCat30 = last30.reduce((acc,r)=>{
    const a = Number(r.amount)||0;
    if(!acc[r.category]) acc[r.category]=0;
    acc[r.category]+=a;
    return acc;
  },{});
  const catShare = byCat30[category] ? byCat30[category]/total30 : 0;
  if (discretionary.includes(category) && catShare > 0.4 && total30 > 300000) { // mucha concentración discrecional
    score -= 0.10;
  }

  // 6) Afinaciones por categoría
  if (category === 'Tecnología' && amt > 800000) score -= 0.1;
  if (category === 'Salud' && /medic|odont|terap|exam|laborat/.test(desc)) score += 0.08;
  if (category === 'Transporte' && /trabajo|oficina|cliente/.test(desc)) score += 0.05;

  // Clamp y etiqueta
  score = Math.max(0, Math.min(1, score));
  const label =
    score > 0.85 ? 'Muy bueno' :
    score > 0.70 ? 'Bueno' :
    score > 0.52 ? 'Útil/Neutral' :
    score > 0.34 ? 'Prescindible' :
                   'Malo';

  // Razones legibles
  const reasons = [];
  if (essentials.includes(category)) reasons.push('categoría esencial');
  if (discretionary.includes(category)) reasons.push('gasto discrecional');
  if (negative.includes(emotion))    reasons.push('emoción negativa');
  if (positive.includes(emotion))    reasons.push('emoción positiva');
  if (amt > 600000)                  reasons.push('monto muy alto');
  else if (amt > 300000)             reasons.push('monto alto');
  if (amt < 30000)                   reasons.push('monto bajo');
  if (countSameCat >= 3 && discretionary.includes(category)) reasons.push('frecuencia alta esta semana');
  if (catShare > 0.4 && discretionary.includes(category))    reasons.push('alta concentración 30d');
  if (desc)                           reasons.push('análisis de texto');

  // Sugerencias accionables
  const suggestions = [];
  if (discretionary.includes(category) && (countSameCat >= 3 || amt > 300000)) {
    suggestions.push('Define un tope semanal para esta categoría.');
  }
  if (/impulso|antojo|caprich|apuestas/.test(desc)) {
    suggestions.push('Aplica “regla de las 24 horas” antes de compras por impulso.');
  }
  if (/crédito|tarjeta|interés|cuota/.test(desc)) {
    suggestions.push('Evita financiamiento costoso: prioriza pago al contado o tasas bajas.');
  }
  if (label === 'Prescindible' || label === 'Malo') {
    suggestions.push('Mueve 10–20% de este monto a ahorro como contrapeso.');
  }
  if (label === 'Muy bueno' && essentials.includes(category)) {
    suggestions.push('Mantén este patrón y registra notas de valor percibido.');
  }

  return { label, score: Number(score.toFixed(2)), reasons, suggestions };
}

