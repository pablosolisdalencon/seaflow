import React, { useState } from 'react';
import { useAuditorias } from '../../hooks/useAuditorias';
import { 
    ClipboardCheck, 
    AlertTriangle, 
    CheckSquare, 
    Clock, 
    Plus, 
    X, 
    ShieldCheck, 
    FileBadge, 
    Scaling,
    ArrowRight
} from 'lucide-react';

const AuditoriaList = () => {
    const { getAll, createHallazgo } = useAuditorias();
    const [selectedAudit, setSelectedAudit] = useState(null);
    const [activeTab, setActiveTab ] = useState('Normativa'); // Tabs: Interna, Certificaciones, Normativa
    
    if (getAll.isLoading) return <div style={{ padding: '2rem' }}>Cargando Auditorías SGI...</div>;

    const filteredAudits = getAll.data?.filter(a => a.sub_type === activeTab) || [];

    const getStatusStyles = (status) => {
        switch(status) {
            case 'Cumple': return { bg: '#e6f4ea', text: '#1e8e3e', label: 'CUMPLE' };
            case 'No Cumple': return { bg: '#fce8e6', text: '#d93025', label: 'NO CUMPLE' };
            case 'Cerrado': return { bg: '#f1f3f4', text: '#5f6368', label: 'CERRADO' };
            default: return { bg: '#fef7e0', text: '#b06000', label: status.toUpperCase() };
        }
    };

    return (
        <div style={{ padding: '2rem' }}>
            <h1 style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#042c4c' }}>
                <ShieldCheck color="#1a73e8" size={32} /> Ciclo de Auditoría y Cumplimiento SGI
            </h1>

            {/* Sub-module Tabs */}
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid #e0e0e0', paddingBottom: '0.5rem' }}>
                <button 
                    onClick={() => setActiveTab('Interna')}
                    style={{ 
                        background: 'none', border: 'none', padding: '0.5rem 1rem', cursor: 'pointer',
                        color: activeTab === 'Interna' ? '#1a73e8' : '#5f6368',
                        borderBottom: activeTab === 'Interna' ? '3px solid #1a73e8' : '3px solid transparent',
                        fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.5rem'
                    }}
                >
                    <ClipboardCheck size={18} /> Auditoría Interna
                </button>
                <button 
                    onClick={() => setActiveTab('Certificaciones')}
                    style={{ 
                        background: 'none', border: 'none', padding: '0.5rem 1rem', cursor: 'pointer',
                        color: activeTab === 'Certificaciones' ? '#1a73e8' : '#5f6368',
                        borderBottom: activeTab === 'Certificaciones' ? '3px solid #1a73e8' : '3px solid transparent',
                        fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.5rem'
                    }}
                >
                    <FileBadge size={18} /> Certificaciones
                </button>
                <button 
                    onClick={() => setActiveTab('Normativa')}
                    style={{ 
                        background: 'none', border: 'none', padding: '0.5rem 1rem', cursor: 'pointer',
                        color: activeTab === 'Normativa' ? '#1a73e8' : '#5f6368',
                        borderBottom: activeTab === 'Normativa' ? '3px solid #1a73e8' : '3px solid transparent',
                        fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.5rem'
                    }}
                >
                    <Scaling size={18} /> Auditoría Normativa
                </button>
            </div>

            <div style={{ display: 'grid', gap: '2rem' }}>
                {filteredAudits.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '4rem', color: '#999', background: '#f8f9fa', borderRadius: '12px', border: '1px dashed #ccc' }}>
                        No hay registros para la categoría {activeTab}
                    </div>
                )}
                
                {filteredAudits.map(audit => (
                    <div key={audit.id} style={{ background: '#fff', borderRadius: '12px', border: '1px solid #e0e0e0', overflow: 'hidden', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
                        <div style={{ padding: '1.5rem', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <div style={{ fontSize: '0.75rem', color: '#1a73e8', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '0.25rem' }}>{audit.Area?.name} - {audit.id}</div>
                                <h2 style={{ margin: 0, fontSize: '1.1rem', color: '#202124', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    {audit.auditor_name} <ArrowRight size={14} /> {audit.sub_type}
                                </h2>
                                <div style={{ fontSize: '0.8rem', color: '#5f6368', marginTop: '0.25rem' }}>Fecha: {new Date(audit.date).toLocaleDateString('es-CL')}</div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <span style={{
                                    padding: '0.3rem 0.75rem',
                                    background: audit.status === 'FINALIZADA' ? '#e6f4ea' : '#fef7e0',
                                    color: audit.status === 'FINALIZADA' ? '#1e8e3e' : '#b06000',
                                    borderRadius: '12px',
                                    fontSize: '0.75rem',
                                    fontWeight: 'bold'
                                }}>
                                    {audit.status}
                                </span>
                            </div>
                        </div>

                        <div style={{ padding: '1.5rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                <h3 style={{ fontSize: '0.9rem', margin: 0, display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#3c4043' }}>
                                    Resultados de la Inspección
                                </h3>
                                <button style={{ background: '#f8f9fa', border: '1px solid #ddd', padding: '0.4rem 0.8rem', borderRadius: '6px', fontSize: '0.75rem', cursor: 'pointer', fontWeight: '500' }}>
                                    + Añadir Hallazgo
                                </button>
                            </div>

                            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                                <thead style={{ background: '#f8f9fa', color: '#5f6368' }}>
                                    <tr>
                                        <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid #eee' }}>Descripción / Requisito</th>
                                        <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid #eee' }}>Categoría</th>
                                        <th style={{ padding: '0.75rem', textAlign: 'center', borderBottom: '1px solid #eee' }}>Gravedad</th>
                                        <th style={{ padding: '0.75rem', textAlign: 'right', borderBottom: '1px solid #eee' }}>Resultado</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {audit.Hallazgos?.map(finding => {
                                        const styles = getStatusStyles(finding.status);
                                        return (
                                            <tr key={finding.id} style={{ borderBottom: '1px solid #f8f9fa' }}>
                                                <td style={{ padding: '0.75rem', color: '#202124', fontWeight: '500' }}>{finding.description}</td>
                                                <td style={{ padding: '0.75rem', color: '#666' }}>{finding.categoria || 'General'}</td>
                                                <td style={{ padding: '0.75rem', textAlign: 'center' }}>
                                                    <span style={{ 
                                                        fontSize: '0.7rem', fontWeight: '600', padding: '0.15rem 0.4rem', borderRadius: '4px',
                                                        background: finding.severity === 'MAYOR' ? '#fce8e6' : '#f1f3f4',
                                                        color: finding.severity === 'MAYOR' ? '#d93025' : '#5f6368'
                                                    }}>
                                                        {finding.severity}
                                                    </span>
                                                </td>
                                                <td style={{ padding: '0.75rem', textAlign: 'right' }}>
                                                    <span style={{ 
                                                        padding: '0.25rem 0.6rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: '800',
                                                        background: styles.bg, color: styles.text
                                                    }}>
                                                        {styles.label}
                                                    </span>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AuditoriaList;
