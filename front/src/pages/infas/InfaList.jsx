import React, { useState } from 'react';
import { useInfas } from '../../hooks/useInfas';
import { Activity, Droplets, Thermometer, AlertCircle, ChevronDown, ChevronUp, FileText, Calendar } from 'lucide-react';

const InfaList = () => {
    const { getAll } = useInfas();
    const [selectedInfa, setSelectedInfa] = useState(null);

    if (getAll.isLoading) return <div>Cargando Monitoreo Ambiental...</div>;

    const toggleInfa = (id) => {
        setSelectedInfa(selectedInfa === id ? null : id);
    };

    return (
        <div style={{ padding: '2rem' }}>
            <h1 style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Activity color="#1a73e8" /> Monitoreo Ambiental (INFAS)
            </h1>

            {/* Historical Summary Table */}
            <div style={{ background: 'white', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', overflow: 'hidden', border: '1px solid #eee' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead style={{ background: '#f8f9fa' }}>
                        <tr>
                            <th style={{ padding: '1rem', textAlign: 'left' }}>Fecha / Año</th>
                            <th style={{ padding: '1rem', textAlign: 'left' }}>Área</th>
                            <th style={{ padding: '1rem', textAlign: 'left' }}>Estado</th>
                            <th style={{ padding: '1rem', textAlign: 'center' }}>pH Avg</th>
                            <th style={{ padding: '1rem', textAlign: 'center' }}>Redox Avg</th>
                            <th style={{ padding: '1rem', textAlign: 'center' }}>M.O. Avg</th>
                            <th style={{ padding: '1rem', textAlign: 'right' }}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {getAll.data?.map(infa => (
                            <React.Fragment key={infa.id}>
                                <tr style={{ borderTop: '1px solid #f0f0f0', cursor: 'pointer' }} onClick={() => toggleInfa(infa.id)}>
                                    <td style={{ padding: '1rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <Calendar size={16} color="#5f6368" />
                                            <span style={{ fontWeight: '500' }}>{new Date(infa.report_date).toLocaleDateString('es-CL', { year: 'numeric', month: 'long' })}</span>
                                        </div>
                                    </td>
                                    <td style={{ padding: '1rem', fontWeight: 'bold', color: '#1a73e8' }}>{infa.Area?.name}</td>
                                    <td style={{ padding: '1rem' }}>
                                        <span style={{ 
                                            padding: '0.25rem 0.6rem', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 'bold',
                                            background: infa.status === 'AEROBICA' ? '#e6f4ea' : '#fce8e6',
                                            color: infa.status === 'AEROBICA' ? '#1e8e3e' : '#d93025'
                                        }}>
                                            {infa.status}
                                        </span>
                                    </td>
                                    <td style={{ padding: '1rem', textAlign: 'center' }}>{infa.ph}</td>
                                    <td style={{ padding: '1rem', textAlign: 'center' }}>{infa.redox} mV</td>
                                    <td style={{ padding: '1rem', textAlign: 'center' }}>{infa.mo}%</td>
                                    <td style={{ padding: '1rem', textAlign: 'right' }}>
                                        <button style={{ background: 'none', border: 'none', color: '#1a73e8', cursor: 'pointer' }}>
                                            {selectedInfa === infa.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                        </button>
                                    </td>
                                </tr>
                                
                                {/* Station Detail View (E1-E8) */}
                                {selectedInfa === infa.id && (
                                    <tr>
                                        <td colSpan="7" style={{ padding: '0', background: '#fcfcfc' }}>
                                            <div style={{ padding: '1.5rem', borderTop: '1px dashed #ddd', borderBottom: '1px dashed #ddd' }}>
                                                <h4 style={{ marginBottom: '1rem', fontSize: '0.9rem', color: '#3c4043', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                    <FileText size={16} /> Resultados por Estación de Muestreo
                                                </h4>
                                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
                                                    {infa.EstacionInfas && infa.EstacionInfas.length > 0 ? (
                                                        infa.EstacionInfas.map(st => (
                                                            <div key={st.id} style={{ background: 'white', padding: '1rem', borderRadius: '8px', border: '1px solid #eee', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                                                                <div style={{ fontWeight: 'bold', marginBottom: '0.5rem', color: '#1a73e8', borderBottom: '1px solid #f0f0f0', paddingBottom: '0.25rem' }}>Estación {st.nombre}</div>
                                                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.2rem' }}>
                                                                    <span style={{ color: '#777' }}>pH:</span>
                                                                    <span style={{ fontWeight: '600' }}>{st.ph}</span>
                                                                </div>
                                                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.2rem' }}>
                                                                    <span style={{ color: '#777' }}>Redox:</span>
                                                                    <span style={{ fontWeight: '600' }}>{st.redox} mV</span>
                                                                </div>
                                                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                                                                    <span style={{ color: '#777' }}>M.O.:</span>
                                                                    <span style={{ fontWeight: '600' }}>{st.mo}%</span>
                                                                </div>
                                                            </div>
                                                        ))
                                                    ) : (
                                                        <div style={{ color: '#999', fontStyle: 'italic', fontSize: '0.85rem' }}>No hay detalles por estación para este registro.</div>
                                                    )}
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default InfaList;
