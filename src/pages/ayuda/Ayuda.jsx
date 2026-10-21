import './Ayuda.css';

export default function Ayuda() {
  return (
    <main className="ayuda-main">
      <h2>Centro de Ayuda y Preguntas Frecuentes</h2>
      <p className="subtitulo">Guía de uso para el sistema de control de calidad y auditorías textiles.</p>

      <section className="seccion-ayuda">
        <div className="faq-item">
          <h3>1. ¿Cómo realizar una inspección?</h3>
          <p>
            Selecciona un producto en la página de <strong>Técnico</strong>. El sistema cargará
            automáticamente los parámetros requeridos. Ingresa el valor obtenido en la medición y haz
            clic en <em>"Iniciar Inspección"</em>.
          </p>
        </div>

        <div className="faq-item">
          <h3>2. Interpretación de Estados</h3>
          <p>
            <strong>Aprobado:</strong> La medición cumple con las tolerancias de calidad definidas.
            <br />
            <strong>Rechazado:</strong> Una o más mediciones superan el límite permitido para el lote.
          </p>
        </div>

        <div className="faq-item">
          <h3>3. Soporte y Contacto</h3>
          <p>
            Si la plataforma presenta fallas o requiere agregar un nuevo producto a la lista, contacta al área de TI:
          </p>
          <p><strong>Correo:</strong> soporte@textilchile.cl</p>
        </div>
      </section>
    </main>
  );
}