
import React, { useState, useEffect } from 'react';
import { getLotes, addLote, updateLote, deleteLote } from '../data/lotesData';

export default function LotesAdmin() {
  const [lotes, setLotes] = useState([]);
  const [filter, setFilter] = useState('ALL');
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    code: '',
    status: 'Aprobado',
    humedad: '',
    gramaje: '',
    resistencia: 'Media',
    obs: ''
  });

  useEffect(() => {
    setLotes(getLotes());
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.code || !formData.humedad || !formData.gramaje) {
      alert('Por favor complete los campos obligatorios');
      return;
    }

    if (editingId) {
      
      const updated = updateLote(editingId, {
        ...formData,
        humedad: parseFloat(formData.humedad),
        gramaje: parseFloat(formData.gramaje)
      });
      setLotes(updated);
      setEditingId(null);
    } else {
      
      const updated = addLote({
        ...formData,
        humedad: parseFloat(formData.humedad),
        gramaje: parseFloat(formData.gramaje)
      });
      setLotes(updated);
    }

    
    setFormData({ code: '', status: 'Aprobado', humedad: '', gramaje: '', resistencia: 'Media', obs: '' });
  };

  const handleEdit = (lote) => {
    setEditingId(lote.id);
    setFormData({
      code: lote.code,
      status: lote.status,
      humedad: lote.humedad,
      gramaje: lote.gramaje,
      resistencia: lote.resistencia,
      obs: lote.obs
    });
  };

  const handleDelete = (id) => {
    if (window.confirm('¿Está seguro de eliminar este registro de inspección?')) {
      const updated = deleteLote(id);
      setLotes(updated);
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData({ code: '', status: 'Aprobado', humedad: '', gramaje: '', resistencia: 'Media', obs: '' });
  };


  const filteredLotes = lotes.filter(l => {
    if (filter === 'CRITICAL') return l.status === 'Rechazado';
    if (filter === 'APPROVED') return l.status === 'Aprobado';
    return true;
  });

  const getBadgeClass = (status) => {
    switch (status) {
      case 'Aprobado': return 'bg-success';
      case 'Rechazado': return 'bg-danger';
      case 'Pendiente': return 'bg-warning text-dark';
      case 'Observado': return 'bg-info text-dark';
      default: return 'bg-secondary';
    }
  };

  return (
    <div className="container my-4">
      <h2 className="mb-4">Panel de Administración - Control de Lotes</h2>

      {/* TARJETAS RESUMEN / DASHBOARD */}
      <div className="row mb-4">
        <div className="col-md-4">
          <div className="card text-white bg-primary mb-3">
            <div className="card-body">
              <h5 className="card-title">Total Inspecciones</h5>
              <p className="card-text fs-3">{lotes.length}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-white bg-success mb-3">
            <div className="card-body">
              <h5 className="card-title">Aprobados</h5>
              <p className="card-text fs-3">{lotes.filter(l => l.status === 'Aprobado').length}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-white bg-danger mb-3">
            <div className="card-body">
              <h5 className="card-title">Lotes Críticos (Rechazados)</h5>
              <p className="card-text fs-3">{lotes.filter(l => l.status === 'Rechazado').length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* FORMULARIO DE REGISTRO / EDICIÓN */}
      <div className="card mb-4 shadow-sm">
        <div className="card-header bg-dark text-white">
          <h5 className="mb-0">{editingId ? 'Editar Lote Textil' : 'Registrar Nuevo Lote'}</h5>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit} className="row g-3">
            <div className="col-md-3">
              <label className="form-label">Código Lote</label>
              <input
                type="text"
                className="form-control"
                name="code"
                placeholder="ej. LOT-2026-006"
                value={formData.code}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-3">
              <label className="form-label">Estado Calidad</label>
              <select className="form-select" name="status" value={formData.status} onChange={handleChange}>
                <option value="Aprobado">Aprobado</option>
                <option value="Rechazado">Rechazado</option>
                <option value="Pendiente">Pendiente</option>
                <option value="Observado">Observado</option>
              </select>
            </div>
            <div className="col-md-2">
              <label className="form-label">Humedad (%)</label>
              <input
                type="number"
                step="0.1"
                className="form-control"
                name="humedad"
                value={formData.humedad}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-2">
              <label className="form-label">Gramaje (g/m²)</label>
              <input
                type="number"
                className="form-control"
                name="gramaje"
                value={formData.gramaje}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-2">
              <label className="form-label">Resistencia</label>
              <select className="form-select" name="resistencia" value={formData.resistencia} onChange={handleChange}>
                <option value="Alta">Alta</option>
                <option value="Media">Media</option>
                <option value="Baja">Baja</option>
              </select>
            </div>
            <div className="col-md-10">
              <label className="form-label">Observaciones</label>
              <input
                type="text"
                className="form-control"
                name="obs"
                placeholder="Observaciones del ensayo de calidad..."
                value={formData.obs}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-2 d-flex align-items-end gap-2">
              <button type="submit" className={`btn ${editingId ? 'btn-warning' : 'btn-primary'} w-100`}>
                {editingId ? 'Actualizar' : 'Guardar'}
              </button>
              {editingId && (
                <button type="button" className="btn btn-secondary" onClick={handleCancelEdit}>
                  Cancelar
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* BOTONES DE FILTRADO */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Listado de Inspecciones</h4>
        <div className="btn-group" role="group">
          <button
            className={`btn ${filter === 'ALL' ? 'btn-dark' : 'btn-outline-dark'}`}
            onClick={() => setFilter('ALL')}
          >
            Todos ({lotes.length})
          </button>
          <button
            className={`btn ${filter === 'CRITICAL' ? 'btn-danger' : 'btn-outline-danger'}`}
            onClick={() => setFilter('CRITICAL')}
          >
            Ver Lotes Críticos ({lotes.filter(l => l.status === 'Rechazado').length})
          </button>
          <button
            className={`btn ${filter === 'APPROVED' ? 'btn-success' : 'btn-outline-success'}`}
            onClick={() => setFilter('APPROVED')}
          >
            Aprobados ({lotes.filter(l => l.status === 'Aprobado').length})
          </button>
        </div>
      </div>

      {/* TABLA DE LECTURA Y ACCIONES CRUD */}
      <div className="table-responsive shadow-sm">
        <table className="table table-hover table-striped align-middle border">
          <thead className="table-dark">
            <tr>
              <th>Código</th>
              <th>Estado</th>
              <th>Humedad</th>
              <th>Gramaje</th>
              <th>Resistencia</th>
              <th>Observación</th>
              <th className="text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredLotes.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-3 text-muted">
                  No hay registros disponibles en esta categoría.
                </td>
              </tr>
            ) : (
              filteredLotes.map((lote) => (
                <tr key={lote.id}>
                  <td className="fw-bold">{lote.code}</td>
                  <td>
                    <span className={`badge ${getBadgeClass(lote.status)}`}>{lote.status}</span>
                  </td>
                  <td>{lote.humedad}%</td>
                  <td>{lote.gramaje} g/m²</td>
                  <td>{lote.resistencia}</td>
                  <td className="text-truncate" style={{ maxWidth: '200px' }}>{lote.obs}</td>
                  <td className="text-center">
                    <button
                      className="btn btn-sm btn-outline-warning me-2"
                      onClick={() => handleEdit(lote)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDelete(lote.id)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}