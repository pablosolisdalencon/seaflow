import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Award, FileCheck, Shield, Download, Clock, AlertCircle } from 'lucide-react';

const CertificacionesList = () => {
    const [activeTab, setActiveTab] = useState('BAP');
    const [certificaciones, setCertificaciones] = useState([]);
    const [loading, setLoading] = useState(true);
    const tabs = ['ASC', 'BAP', 'Orgánico', 'APL 1', 'APL 2'];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/certificaciones`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
                setCertificaciones(res.data);
            } catch (err) {
                console.error('Error fetching certificaciones:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const filteredData = certificaciones.filter(c => c.tipo === activeTab);

    return (
        <div style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#042c4c', margin: 0 }}>
                    <Award color="#1a73e8" size={32} /> Catálogo de Certificaciones SGI
                </h1>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: '#fff', border: '1px solid #ddd', padding: '0.5rem 1rem', borderRadius: '8px', fontSize: '0.85rem', cursor: 'pointer' }}>
                        <Download size={16} /> Descargar Matriz
                    </button>
                </div>
            </div>

            {/* Cert Tabs */}
            <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '2rem' }}>
                {tabs.map(t => (
                    <button
                        key={t}
                        onClick={() => setActiveTab(t)}
                        style={{
                            padding: '0.6rem 1.5rem',
                            border: '1px solid #ddd',
                            borderRadius: '12px',
                            background: activeTab === t ? '#1a73e8' : '#fff',
                            color: activeTab === t ? '#fff' : '#5f6368',
                            fontWeight: '600',
                            cursor: 'pointer',
                            fontSize: '0.9rem',
                            boxShadow: activeTab === t ? '0 4px 12px rgba(26, 115, 232, 0.3)' : 'none',
                            transition: 'all 0.2s ease'
                        }}
                    >
                        {t}
                    </button>
                ))}
            </div>

            {/* Content Table */}
            <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #e0e0e0', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead style={{ background: '#f8f9fa' }}>
                        <tr>
                            <th style={{ padding: '1.25rem', textAlign: 'center', borderBottom: '1px solid #eee', width: '50px' }}>ID</th>
                            <th style={{ padding: '1.25rem', textAlign: 'left', borderBottom: '1px solid #eee', width: '30%' }}>Nombre Corto / Estándar</th>
                            <th style={{ padding: '1.25rem', textAlign: 'left', borderBottom: '1px solid #eee' }}>Requisitos del Sistema</th>
                            <th style={{ padding: '1.25rem', textAlign: 'right', borderBottom: '1px solid #eee' }}>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan="4" style={{ textAlign: 'center', padding: '3rem', color: '#999' }}>Cargando datos maestros...</td></tr>
                        ) : filteredData.length > 0 ? (
                            filteredData.map((cert, idx) => (
                                <tr key={cert.id} style={{ borderBottom: '1px solid #f1f3f4' }}>
                                    <td style={{ padding: '1.25rem', textAlign: 'center', color: '#999', fontWeight: 'bold' }}>{cert.id}</td>
                                    <td style={{ padding: '1.25rem', verticalAlign: 'top' }}>
                                        <div style={{ fontWeight: 'bold', fontSize: '1rem', color: '#202124', marginBottom: '0.25rem' }}>{cert.nombre_corto}</div>
                                        <div style={{ fontSize: '0.8rem', color: '#5f6368' }}>{cert.descripcion}</div>
                                    </td>
                                    <td style={{ padding: '1.25rem' }}>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                            {cert.RequisitoCertificacions?.map((req, rIdx) => (
                                                <div key={req.id} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                                                    <div style={{ background: '#e8f0fe', color: '#1a73e8', padding: '0.1rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold' }}>{req.numero}</div>
                                                    <div>
                                                        <div style={{ fontSize: '0.85rem', color: '#3c4043' }}>{req.descripcion}</div>
                                                        <div style={{ fontSize: '0.75rem', color: '#1e8e3e', marginTop: '0.2rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                                            <FileCheck size={12} /> Evidencia: {req.evidencia_requerida}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                            {(!cert.RequisitoCertificacions || cert.RequisitoCertificacions.length === 0) && (
                                                <div style={{ fontSize: '0.85rem', color: '#999', fontStyle: 'italic' }}>Sin requisitos específicos cargados.</div>
                                            )}
                                        </div>
                                    </td>
                                    <td style={{ padding: '1.25rem', textAlign: 'right', verticalAlign: 'top' }}>
                                        <span style={{ 
                                            padding: '0.4rem 0.8rem', 
                                            borderRadius: '20px', 
                                            fontSize: '0.75rem',
                                            fontWeight: 'bold',
                                            background: cert.estado === 'Vigente' ? '#e6f4ea' : '#fce8e6',
                                            color: cert.estado === 'Vigente' ? '#1e8e3e' : '#d93025',
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: '0.4rem'
                                        }}>
                                            {cert.estado === 'Vigente' ? <Shield size={14} /> : <AlertCircle size={14} />}
                                            {cert.estado.toUpperCase()}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" style={{ textAlign: 'center', padding: '4rem' }}>
                                    <div style={{ color: '#dadce0', marginBottom: '1rem' }}><Award size={48} style={{ margin: '0 auto' }} /></div>
                                    <div style={{ color: '#999', fontSize: '1rem' }}>No hay registros para {activeTab}</div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CertificacionesList;
