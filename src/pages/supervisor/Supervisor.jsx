import React, { useState } from 'react';
import styles from './Supervisor.module.css';


const BASE_DATOS_LOTES = {
  'LOT-2026-001': {
    codigo: 'LOT-2026-001',
    estado: 'Rechazado',
    resultado: 'Exceso de humedad y gramaje fuera de norma (142 g/m²).'
  },
  'LOT-2026-002': {
    codigo: 'LOT-2026-002',
    estado: 'Aprobado',
    resultado: 'Dentro de los parámetros establecidos.'
  },
  'LOT-2026-003': {
    codigo: 'LOT-2026-003',
    estado: 'Pendiente',
    resultado: 'En espera de prueba de resistencia y solidez de color en laboratorio.'
  },
  'LOT-2026-004': {
    codigo: 'LOT-2026-004',
    estado: 'Aprobado con Observación',
    resultado: 'Tolerancia al límite (+2.8cm), liberado para corte y confección.'
  },
  'LOT-2026-005': {
    codigo: 'LOT-2026-005',
    estado: 'Rechazado',
    resultado: 'Defecto en tejido Jacquard (3 fallas por cada 100 metros).'
  }
};

const Supervisor = () => {
  const [codigo, setCodigo] = useState('LOT-2026-002');
  const [linea, setLinea] = useState('Línea 3');
  const [resultado, setResultado] = useState(BASE_DATOS_LOTES['LOT-2026-002']);

  const handleBuscar = (e) => {
    e.preventDefault();
    const codigoLote = codigo.trim().toUpperCase();

    if (BASE_DATOS_LOTES[codigoLote]) {
      setResultado({
        ...BASE_DATOS_LOTES[codigoLote],
        linea: linea
      });
    } else {
      setResultado({
        codigo: codigoLote || 'N/A',
        linea: linea,
        estado: 'No Encontrado',
        resultado: 'El código ingresado no registra mediciones de calidad en la base de datos.'
      });
    }
  };

  return (
    <div className={styles.container}>
      <h2>Supervisor de Línea</h2>
      <p>Consulta de resultados de calidad de lotes</p>

      <div className={styles.cardForm}>
        <h3>Buscar lote</h3>
        <form onSubmit={handleBuscar}>
          <div className={styles.formGroup}>
            <label>Código del lote:</label>
            <input 
              type="text" 
              value={codigo} 
              onChange={(e) => setCodigo(e.target.value)} 
              placeholder="Ej: LOT-2026-001"
              required 
            />
          </div>

          <div className={styles.formGroup}>
            <label>Línea de producción:</label>
            <select value={linea} onChange={(e) => setLinea(e.target.value)}>
              <option value="Línea 1">Línea 1</option>
              <option value="Línea 2">Línea 2</option>
              <option value="Línea 3">Línea 3</option>
              <option value="Línea 4">Línea 4</option>
            </select>
          </div>

          <button type="submit" className={styles.btnBuscar}>
            Buscar lote
          </button>
        </form>
      </div>

      {resultado && (
        <div className={styles.cardResultado}>
          <h3>Resultado del lote</h3>
          <p><strong>Código:</strong> {resultado.codigo}</p>
          <p><strong>Línea:</strong> {resultado.linea || linea}</p>
          <p><strong>Estado de calidad:</strong> {resultado.estado}</p>
          <p><strong>Resultado:</strong> {resultado.resultado}</p>
        </div>
      )}
    </div>
  );
};

export default Supervisor;