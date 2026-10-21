import { useState } from 'react';
import './Tecnico.css';

const especificacionesProductos = {
  PR001: [
    { id: 'gramaje', nombre: 'Gramaje', min: 150, max: 200, unidad: 'g/m²' },
    { id: 'resistencia', nombre: 'Resistencia al Rasgado', min: 20, max: 50, unidad: 'N' },
  ],
  PR003: [
    { id: 'gramaje', nombre: 'Gramaje', min: 120, max: 160, unidad: 'g/m²' },
    { id: 'encogimiento', nombre: 'Encogimiento', min: 0, max: 5, unidad: '%' },
  ],
};

export default function Tecnico() {
  const [producto, setProducto] = useState('');
  const [mediciones, setMediciones] = useState({});
  const [estado, setEstado] = useState({ texto: '', colorFondo: '#fafafa', colorTexto: '#333' });

  const handleProductoChange = (e) => {
    const codProducto = e.target.value;
    setProducto(codProducto);
    setMediciones({});
    setEstado({ texto: '', colorFondo: '#fafafa', colorTexto: '#333' });
  };

  const handleMedicionChange = (paramId, valor) => {
    setMediciones({
      ...mediciones,
      [paramId]: valor,
    });
  };

  const obtenerEstadoCampo = (param) => {
    const valorStr = mediciones[param.id];
    const valorNum = parseFloat(valorStr);

    if (valorStr === undefined || valorStr === '' || isNaN(valorNum)) {
      return { borderColor: '#cbd5e1', mensaje: '' };
    }
    if (valorNum < param.min || valorNum > param.max) {
      return {
        borderColor: '#e74c3c',
        mensaje: `Fuera de rango (${param.min} - ${param.max} ${param.unidad})`,
      };
    }
    return { borderColor: '#2ecc71', mensaje: '' };
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!producto) {
      alert('Por favor, seleccione un producto antes de iniciar la inspección.');
      return;
    }

    const parametros = especificacionesProductos[producto] || [];
    let formValido = true;
    let esAprobado = true;

    parametros.forEach((param) => {
      const valorStr = mediciones[param.id];
      const valorNum = parseFloat(valorStr);

      if (!valorStr || valorStr.trim() === '' || isNaN(valorNum)) {
        formValido = false;
      } else if (valorNum < param.min || valorNum > param.max) {
        esAprobado = false;
      }
    });

    if (!formValido) {
      alert('Por favor, complete todos los parámetros con valores numéricos válidos.');
      return;
    }

    if (esAprobado) {
      setEstado({
        texto: 'Aprobado',
        colorFondo: '#d4edda',
        colorTexto: '#155724',
      });
      alert('Inspección finalizada con éxito: El producto cumple con todos los parámetros de calidad.');
    } else {
      setEstado({
        texto: 'Rechazado',
        colorFondo: '#f8d7da',
        colorTexto: '#721c24',
      });
      alert('Inspección finalizada: El producto no cumple con los rangos permitidos de calidad.');
    }
  };

  const parametrosActuales = especificacionesProductos[producto] || [];

  return (
    <main className="main-container">
      <div className="card-form">
        <h2>Inspección de Producto</h2>
        <p>Ingrese las mediciones requeridas según el producto seleccionado</p>

        <form onSubmit={handleSubmit}>
          <div className="formulario_div">
            <label htmlFor="producto">Producto:</label>
            <select id="producto" value={producto} onChange={handleProductoChange}>
              <option value="">-- Seleccione un producto --</option>
              <option value="PR001">PR001 - Tela Algodón Premium</option>
              <option value="PR003">PR003 - Mezclilla Denim</option>
            </select>
          </div>

          <div className="formulario_div">
            <label htmlFor="estado">Estado del producto:</label>
            <input
              type="text"
              id="estado"
              readOnly
              className="campo-bloqueado"
              value={estado.texto}
              style={{
                backgroundColor: estado.colorFondo,
                color: estado.colorTexto,
              }}
              placeholder="Pendiente de evaluación"
            />
          </div>

          <div className="seccion-parametros">
            {!producto ? (
              <p>Seleccione un producto válido para cargar sus parámetros.</p>
            ) : (
              parametrosActuales.map((param) => {
                const estadoCampo = obtenerEstadoCampo(param);
                return (
                  <div key={param.id} className="parametro-item">
                    <label htmlFor={param.id}>
                      {param.nombre} (Rango: {param.min} - {param.max} {param.unidad})
                    </label>
                    <input
                      type="number"
                      id={param.id}
                      step="0.01"
                      placeholder="Ingrese valor medido"
                      className="input-medicion"
                      style={{ borderColor: estadoCampo.borderColor }}
                      value={mediciones[param.id] || ''}
                      onChange={(e) => handleMedicionChange(param.id, e.target.value)}
                      required
                    />
                    {estadoCampo.mensaje && (
                      <span className="msj-error">{estadoCampo.mensaje}</span>
                    )}
                  </div>
                );
              })
            )}
          </div>

          <button type="submit" className="btn_inspeccion">
            Iniciar Inspección
          </button>
        </form>
      </div>
    </main>
  );
}