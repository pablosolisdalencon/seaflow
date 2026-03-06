// IEEE Trace: [US-CAP-01]
import React from 'react';
import { Plus, CheckCircle2 } from 'lucide-react';

const CapacitacionesMatrix = () => {
    const roles = ['Operario', 'Supervisor', 'Jefe de Área', 'Gerente', 'Mantenimiento'];
    const trainings = [
        'Inducción Hombre Nuevo',
        'Manejo de Residuos Sólidos',
        'Respuesta ante Emergencias',
        'ISO 14001:2015 Introducción',
        'Uso de EPP Específicos',
        'Seguridad en Altura Física',
        'Bloqueo y Etiquetado (LOTO)',
        'Primeros Auxilios Básicos'
    ];

    // Mock matrix: 1 = Required, 0 = Optional/Not Required
    const matrix = [
        [1, 1, 1, 1, 1],
        [1, 1, 1, 0, 1],
        [1, 1, 1, 1, 1],
        [0, 1, 1, 1, 0],
        [1, 0, 0, 0, 1],
        [1, 1, 0, 0, 1],
        [0, 0, 0, 0, 1],
        [0, 1, 1, 0, 0]
    ];

    return (
        <div style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1.5rem' }}>
                <button style={{
                    background: '#042c4c',
                    color: '#fff',
                    border: '2px solid #000',
                    padding: '0.5rem 1.5rem',
                    borderRadius: '4px',
                    fontWeight: 'bold',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    cursor: 'pointer'
                }}>
                    <Plus size={18} /> Nueva Capacitación
                </button>
            </div>

            <div style={{ border: '2px solid #000', borderRadius: '4px', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                    <thead style={{ background: '#e8eaed', borderBottom: '2px solid #000' }}>
                        <tr>
                            <th style={{ padding: '1rem', borderRight: '1px solid #000', textAlign: 'left', width: '30%' }}>Capacitación</th>
                            {roles.map(role => (
                                <th key={role} style={{ padding: '1rem', borderRight: '1px solid #000', textAlign: 'center' }}>{role}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {trainings.map((t, rowIdx) => (
                            <tr key={t} style={{ borderBottom: '1px solid #ccc', background: rowIdx % 2 === 0 ? '#fff' : '#f8f9fa' }}>
                                <td style={{ padding: '1rem', borderRight: '2px solid #000', fontWeight: '500' }}>{t}</td>
                                {roles.map((_, colIdx) => (
                                    <td key={colIdx} style={{ padding: '1rem', borderRight: '1px solid #000', textAlign: 'center' }}>
                                        {matrix[rowIdx][colIdx] === 1 && (
                                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                                <CheckCircle2 size={20} color="#1a73e8" />
                                            </div>
                                        )}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CapacitacionesMatrix;
