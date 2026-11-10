'use client';

import { useState, useEffect } from 'react';
import styles from './page.module.css';

interface Patient {
  id: string;
  name: string;
  pathology: string;
  phone: string;
  address: string;
}

export default function Home() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    pathology: '',
    phone: '',
    address: ''
  });

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    const response = await fetch('/api/patients');
    const data = await response.json();
    setPatients(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch('/api/patients', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    if (response.ok) {
      setFormData({ name: '', pathology: '', phone: '', address: '' });
      setShowForm(false);
      fetchPatients();
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('¿Estás seguro de eliminar este paciente?')) {
      await fetch(`/api/patients/${id}`, { method: 'DELETE' });
      fetchPatients();
    }
  };

  const openWhatsApp = (phone: string, name: string) => {
    const message = encodeURIComponent(`Hola ${name}, te contacto desde la agenda de pacientes.`);
    window.open(`https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=${message}`, '_blank');
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>📋 Agenda de Pacientes</h1>
        <button 
          className={styles.addButton}
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? '✕ Cerrar' : '+ Nuevo Paciente'}
        </button>
      </header>

      {showForm && (
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>Nombre Completo</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              placeholder="Ej: María González"
            />
          </div>
          <div className={styles.formGroup}>
            <label>Patología</label>
            <input
              type="text"
              value={formData.pathology}
              onChange={(e) => setFormData({ ...formData, pathology: e.target.value })}
              required
              placeholder="Ej: Hipertensión"
            />
          </div>
          <div className={styles.formGroup}>
            <label>Teléfono (con código de país)</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
              placeholder="Ej: +34612345678"
            />
          </div>
          <div className={styles.formGroup}>
            <label>Dirección</label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              required
              placeholder="Ej: Calle Mayor 123"
            />
          </div>
          <button type="submit" className={styles.submitButton}>
            Guardar Paciente
          </button>
        </form>
      )}

      <div className={styles.patientList}>
        {patients.length === 0 ? (
          <div className={styles.emptyState}>
            <p>No hay pacientes registrados</p>
            <p className={styles.emptyHint}>Pulsa "+ Nuevo Paciente" para agregar uno</p>
          </div>
        ) : (
          patients.map((patient) => (
            <div key={patient.id} className={styles.patientCard}>
              <div className={styles.patientHeader}>
                <h2 className={styles.patientName}>{patient.name}</h2>
                <button
                  className={styles.deleteButton}
                  onClick={() => handleDelete(patient.id)}
                  aria-label="Eliminar paciente"
                >
                  🗑️
                </button>
              </div>
              <div className={styles.patientInfo}>
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>🏥 Patología:</span>
                  <span className={styles.infoValue}>{patient.pathology}</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>📱 Teléfono:</span>
                  <span className={styles.infoValue}>{patient.phone}</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>📍 Dirección:</span>
                  <span className={styles.infoValue}>{patient.address}</span>
                </div>
              </div>
              <button
                className={styles.whatsappButton}
                onClick={() => openWhatsApp(patient.phone, patient.name)}
              >
                <span className={styles.whatsappIcon}>💬</span>
                Abrir WhatsApp
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
