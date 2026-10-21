import { useState } from 'react';
import './Supervisor.css';

export default function Supervisor() {
  const [lote, setLote] = useState('');
  const [linea, setLinea] = useState('');

  const [errorLote, setErrorLote] = useState('');
  const [errorLinea, setErrorLinea] = useState('');

  const [resultado, setResultado] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    setErrorLote('');
    setErrorLinea('');
    let formularioValido = true;

    // Validación Código de Lote
    if (lote === '') {
      setErrorLote('Debe ingresar el código del lote');
      formularioValido = false;
    } else if (!lote.toUpperCase().startsWith('LOT-')) {
      setErrorLote('El código debe comenzar con LOT-');
      formularioValido = false;
    }

    // Validación Línea
    if (linea === '') {
      setErrorLinea('Debe seleccionar una línea de producción');
      formularioValido = false;
    }

    if (formularioValido) {
      const nombresLinea = {
        linea1: 'Línea 1',
        linea2: 'Línea 2',
        linea3: 'Línea 3',
      };

      setResultado({
        codigo: lote,
        lineaTexto: nombresLinea[linea] || linea,
      });
    } else {
      setResultado(null);
    }
  };

  return (
    <main className="supervisor-main">
      <h1>Supervisor de Línea</h1>
      <p>Consulta de resultados de calidad de lotes</p>

      <section className="sup-consulta">
        <h2>Buscar lote</h2>

        <form onSubmit={handleSubmit}>
          <div className="sup-campo">
            <label htmlFor="sup-lote">Código del lote:</label>
            <input
              type="text"
              id="sup-lote"
              placeholder="Ej: LOT-001"
              value={lote}
              onChange={(e) => setLote(e.target.value)}
            />
            {errorLote && <small id="sup-error-lote">{errorLote}</small>}
          </div>

          <div className="sup-campo">
            <label htmlFor="sup-linea">Línea de producción:</label>
            <select
              id="sup-linea"
              value={linea}
              onChange={(e) => setLinea(e.target.value)}
            >
              <option value="">Seleccione una línea</option>
              <option value="linea1">Línea 1</option>
              <option value="linea2">Línea 2</option>
              <option value="linea3">Línea 3</option>
            </select>
            {errorLinea && <small id="sup-error-linea">{errorLinea}</small>}
          </div>

          <button type="submit" id="sup-boton-buscar">
            Buscar lote
          </button>
        </form>
      </section>

      {resultado && (
        <section className="sup-resultado">
          <h2>Resultado del lote</h2>
          <p>
            <strong>Código:</strong> {resultado.codigo}
          </p>
          <p>
            <strong>Línea:</strong> {resultado.lineaTexto}
          </p>
          <p>
            <strong>Estado de calidad:</strong> Aprobado
          </p>
          <p>
            <strong>Resultado:</strong> Dentro de los parámetros establecidos
          </p>
        </section>
      )}
    </main>
  );
}