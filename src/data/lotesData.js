// src/data/lotesData.js

const INITIAL_LOTES = [
  { id: 1, code: 'LOT-2026-001', status: 'Rechazado', humedad: 18.5, gramaje: 210, resistencia: 'Baja', obs: 'Exceso de humedad' },
  { id: 2, code: 'LOT-2026-002', status: 'Aprobado', humedad: 12.0, gramaje: 200, resistencia: 'Alta', obs: 'Parámetros OK' },
  { id: 3, code: 'LOT-2026-003', status: 'Pendiente', humedad: 14.1, gramaje: 195, resistencia: 'Media', obs: 'En laboratorio' },
  { id: 4, code: 'LOT-2026-004', status: 'Observado', humedad: 15.0, gramaje: 205, resistencia: 'Media', obs: 'Tolerancia límite' },
  { id: 5, code: 'LOT-2026-005', status: 'Rechazado', humedad: 11.2, gramaje: 180, resistencia: 'Baja', obs: 'Fallo de tejido' }
];


export const getLotes = () => {
  const stored = localStorage.getItem('textil_lotes');
  if (!stored) {
    localStorage.setItem('textil_lotes', JSON.stringify(INITIAL_LOTES));
    return INITIAL_LOTES;
  }
  return JSON.parse(stored);
};


export const saveLotes = (lotes) => {
  localStorage.setItem('textil_lotes', JSON.stringify(lotes));
};

export const addLote = (newLote) => {
  const lotes = getLotes();
  const loteWithId = { ...newLote, id: Date.now() };
  const updated = [loteWithId, ...lotes];
  saveLotes(updated);
  return updated;
};

export const updateLote = (id, updatedFields) => {
  const lotes = getLotes();
  const updated = lotes.map(l => l.id === id ? { ...l, ...updatedFields } : l);
  saveLotes(updated);
  return updated;
};

export const deleteLote = (id) => {
  const lotes = getLotes();
  const updated = lotes.filter(l => l.id !== id);
  saveLotes(updated);
  return updated;
};