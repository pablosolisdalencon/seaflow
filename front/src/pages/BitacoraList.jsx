import React, { useState } from 'react';
import { useBitacora } from '../hooks/useBitacora';
import { Mail, Activity, History, Plus, FileText, User, CheckCircle, Clock } from 'lucide-react';

const BitacoraList = () => {
    const [activeTab, setActiveTab ] = useState('cartas');
    const { getCartas, getActividades, getAll, createCarta, createActividad } = useBitacora();

    const [showForm, setShowForm] = useState(false);

    const renderCartas = () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
                <button 
                    onClick={() => setShowForm(true)}
                    style={{ 
                        background: '#1a73e8', color: 'white', border: 'none', 
                        padding: '0.6rem 1.2rem', borderRadius: '8px', display: 'flex', 
                        alignItems: 'center', gap: '0.5rem', fontWeight: '500' 
                    }}
                >
                    <Plus size={18} /> Añadir nueva carta
                </button>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
                <thead style={{ background: '#f8f9fa' }}>
                    <tr>
                        <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #eee' }}>Correlativo</th>
                        <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #eee' }}>Referencia</th>
                        <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #eee' }}>Remitente/Dest.</th>
                        <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #eee' }}>Entidad</th>
                        <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #eee' }}>Estado</th>
                        <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #eee' }}>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {getCartas.data?.map(carta => (
                        <tr key={carta.id} style={{ borderBottom: '1px solid #eee' }}>
                            <td style={{ padding: '1rem', fontWeight: 'bold', color: '#1a73e8' }}>{carta.correlativo}</td>
                            <td style={{ padding: '1rem', maxWidth: '300px' }}>{carta.referencia}</td>
                            <td style={{ padding: '1rem' }}>
                                <div style={{ fontSize: '0.9rem', fontWeight: '500' }}>{carta.remitente}</div>
                                <div style={{ fontSize: '0.8rem', color: '#777' }}>→ {carta.destinatario}</div>
                            </td>
                            <td style={{ padding: '1rem' }}>{carta.entidad}</td>
                            <td style={{ padding: '1rem' }}>
                                <span style={{ 
                                    padding: '0.25rem 0.6rem', borderRadius: '12px', fontSize: '0.75rem', fontWeight: '600',
                                    background: carta.estado === 'Resuelta' ? '#e6f4ea' : '#fef7e0',
                                    color: carta.estado === 'Resuelta' ? '#1e8e3e' : '#f9ab00'
                                }}>
                                    {carta.estado}
                                </span>
                            </td>
                            <td style={{ padding: '1rem' }}>
                                <button style={{ background: 'none', border: 'none', color: '#1a73e8', cursor: 'pointer' }}>
                                    <FileText size={18} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    const renderActividades = () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
                <button 
                    style={{ 
                        background: '#1a73e8', color: 'white', border: 'none', 
                        padding: '0.6rem 1.2rem', borderRadius: '8px', display: 'flex', 
                        alignItems: 'center', gap: '0.5rem', fontWeight: '500' 
                    }}
                >
                    <Plus size={18} /> Añadir actividad
                </button>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
                <thead style={{ background: '#f8f9fa' }}>
                    <tr>
                        <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #eee' }}>N°</th>
                        <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #eee' }}>Actividad</th>
                        <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #eee' }}>Responsable</th>
                        <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #eee' }}>Categoría</th>
                    </tr>
                </thead>
                <tbody>
                    {getActividades.data?.map(act => (
                        <tr key={act.id} style={{ borderBottom: '1px solid #eee' }}>
                            <td style={{ padding: '1rem', color: '#5f6368' }}>{act.numero_actividad}</td>
                            <td style={{ padding: '1rem', fontWeight: '500' }}>{act.actividad}</td>
                            <td style={{ padding: '1rem' }}>{act.responsable}</td>
                            <td style={{ padding: '1rem' }}>
                                <span style={{ background: '#f1f3f4', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem' }}>
                                    {act.categoria}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    const renderActualizaciones = () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {getAll.data?.map(log => (
                <div key={log.id} style={{
                    background: '#fff', padding: '1rem 1.5rem', borderRadius: '10px',
                    border: '1px solid #eee', display: 'flex', alignItems: 'center', justifyContent: 'space-between'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', minWidth: '180px' }}>
                            <User size={16} color="#1a73e8" />
                            <span style={{ fontWeight: '500' }}>{log.User?.name || 'Sistema'}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#3c4043' }}>
                            <CheckCircle size={16} color="#34a853" />
                            <span>{log.action}</span>
                            <span style={{ color: '#999', fontSize: '0.85rem' }}>({log.target_entity})</span>
                        </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#999', fontSize: '0.85rem' }}>
                        <Clock size={14} /> {new Date(log.createdAt).toLocaleString()}
                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <div style={{ padding: '2rem' }}>
            <h1 style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <History color="#5f6368" /> Bitácora de Gestión SGI
            </h1>

            {/* Tabs */}
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid #e0e0e0', paddingBottom: '0.5rem' }}>
                <button 
                    onClick={() => setActiveTab('cartas')}
                    style={{ 
                        background: 'none', border: 'none', padding: '0.5rem 1rem', cursor: 'pointer',
                        color: activeTab === 'cartas' ? '#1a73e8' : '#5f6368',
                        borderBottom: activeTab === 'cartas' ? '3px solid #1a73e8' : '3px solid transparent',
                        fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.5rem'
                    }}
                >
                    <Mail size={18} /> Cartas
                </button>
                <button 
                    onClick={() => setActiveTab('actividades')}
                    style={{ 
                        background: 'none', border: 'none', padding: '0.5rem 1rem', cursor: 'pointer',
                        color: activeTab === 'actividades' ? '#1a73e8' : '#5f6368',
                        borderBottom: activeTab === 'actividades' ? '3px solid #1a73e8' : '3px solid transparent',
                        fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.5rem'
                    }}
                >
                    <Activity size={18} /> Actividades
                </button>
                <button 
                    onClick={() => setActiveTab('actualizaciones')}
                    style={{ 
                        background: 'none', border: 'none', padding: '0.5rem 1rem', cursor: 'pointer',
                        color: activeTab === 'actualizaciones' ? '#1a73e8' : '#5f6368',
                        borderBottom: activeTab === 'actualizaciones' ? '3px solid #1a73e8' : '3px solid transparent',
                        fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.5rem'
                    }}
                >
                    <History size={18} /> Actualizaciones
                </button>
            </div>

            {/* Content */}
            {activeTab === 'cartas' && renderCartas()}
            {activeTab === 'actividades' && renderActividades()}
            {activeTab === 'actualizaciones' && renderActualizaciones()}
        </div>
    );
};

export default BitacoraList;
