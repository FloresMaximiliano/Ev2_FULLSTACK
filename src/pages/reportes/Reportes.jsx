import React from 'react';
import styles from './Reportes.module.css';

const Reportes = () => {
    const kpis = [
        { titulo: 'Lotes Conformes', valor: '88%', detalle: '44 de 50 lotes', tipo: 'exito' },
        { titulo: 'Lotes No Conformes', valor: '12%', detalle: '6 de 50 lotes', tipo: 'error' },
        { titulo: 'Devoluciones Clientes', valor: '8%', detalle: 'Meta: < 5%', tipo: 'alerta' },
        { titulo: 'Producción Mensual', valor: '50.000m', detalle: 'Telas y prendas', tipo: 'info' },
    ];

    const desviaciones = [
        { id: 'LOT-2026-001', producto: 'Tela de algodón 100%', parametro: 'Gramaje (142 g/m²)', estado: 'Rechazado' },
        { id: 'LOT-2026-004', producto: 'Pantalón jean', parametro: 'Tolerancia (±3cm)', estado: 'Corregido' },
        { id: 'LOT-2026-009', producto: 'Tela de poliéster', parametro: 'Resistencia (< 20kg)', estado: 'No conforme' },
    ];

    return (
    <div className={styles.container}>
      <h2>Dashboard de Calidad y Reportes - TextilChile</h2>
      <p>Consolidado ejecutivo para Administración y Jefatura de Calidad</p>

      <div className={styles.kpiGrid}>
        {kpis.map((kpi, index) => (
          <div key={index} className={`${styles.kpiCard} ${styles[kpi.tipo]}`}>
            <h3>{kpi.valor}</h3>
            <p className={styles.kpiTitulo}>{kpi.titulo}</p>
            <span className={styles.kpiDetalle}>{kpi.detalle}</span>
          </div>
        ))}
      </div>

      <section className={styles.seccionTabla}>
        <h3>Tendencias y Desviaciones Recientes</h3>
        <table className={styles.tabla}>
          <thead>
            <tr>
              <th>Lote</th>
              <th>Producto</th>
              <th>Desviación Detectada</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {desviaciones.map((item) => (
              <tr key={item.id}>
                <td><strong>{item.id}</strong></td>
                <td>{item.producto}</td>
                <td>{item.parametro}</td>
                <td>
                  <span className={`${styles.badge} ${styles[item.estado.toLowerCase().replace(' ', '')]}`}>
                    {item.estado}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default Reportes;
