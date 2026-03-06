// IEEE Trace: [REQ-REPT-01] | [US-AUD-01]
import React from 'react';
import { useAuditorias } from '../../hooks/useAuditorias';
import { ClipboardCheck, AlertTriangle, CheckSquare, Clock } from 'lucide-react';

const AuditoriaList = () => {
    const { getAll } = useAuditorias();

    if (getAll.isLoading) return <div>Cargando Auditorías y Hallazgos...</div>;

    return (
        <div style={{ padding: '2rem' }}>
            <h1 style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <ClipboardCheck color="#1a73e8" /> Ciclo de Auditoría y Cumplimiento
            </h1>

            <div style={{ display: 'grid', gap: '2rem' }}>
                {getAll.data?.map(audit => (
                    <div key={audit.id} style={{ background: '#fff', borderRadius: '12px', border: '1px solid #eee', overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                        <div style={{ padding: '1.5rem', background: '#f8f9fa', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <div style={{ fontSize: '0.8rem', color: '#1a73e8', fontWeight: 'bold' }}>{audit.Area?.name}</div>
                                <h2 style={{ margin: 0, fontSize: '1.2rem' }}>{audit.auditor_name} - {audit.type}</h2>
                                <div style={{ fontSize: '0.85rem', color: '#666' }}>Fecha: {audit.date}</div>
                            </div>
                            <span style={{
                                padding: '0.4rem 0.8rem',
                                background: audit.status === 'FINALIZADA' ? '#e6f4ea' : '#fef7e0',
                                color: audit.status === 'FINALIZADA' ? '#1e8e3e' : '#b06000',
                                borderRadius: '20px',
                                fontSize: '0.8rem',
                                fontWeight: 'bold'
                            }}>
                                {audit.status}
                            </span>
                        </div>

                        <div style={{ padding: '1.5rem' }}>
                            <h3 style={{ fontSize: '1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                <AlertTriangle size={18} color="#d93025" /> Hallazgos Detectados
                            </h3>
                            <div style={{ display: 'grid', gap: '1rem' }}>
                                {audit.Hallazgos?.map(finding => (
                                    <div key={finding.id} style={{ padding: '1rem', border: '1px solid #f1f3f4', borderRadius: '8px' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                            <div style={{ fontWeight: '500' }}>{finding.description}</div>
                                            <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: finding.severity === 'CRITICA' ? '#d93025' : '#5f6368' }}>
                                                {finding.severity}
                                            </span>
                                        </div>
                                        <div style={{ fontSize: '0.85rem', color: '#666', borderTop: '1px solid #f1f3f4', paddingTop: '0.5rem', marginTop: '0.5rem' }}>
                                            <strong>Compromisos:</strong>
                                            {finding.Compromisos?.map(comp => (
                                                <div key={comp.id} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.25rem' }}>
                                                    <CheckSquare size={14} color={comp.status === 'CUMPLIDO' ? '#34a853' : '#999'} />
                                                    <span>{comp.action_plan} (Plazo: {comp.due_date})</span>
                                                </div>
                                            ))}
                                            {finding.Compromisos?.length === 0 && <span style={{ fontStyle: 'italic', marginLeft: '0.5rem' }}>Sin compromisos asignados.</span>}
                                        </div>
                                    </div>
                                ))}
                                {audit.Hallazgos?.length === 0 && <div style={{ color: '#999', fontSize: '0.9rem' }}>No se registraron hallazgos en esta auditoría.</div>}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AuditoriaList;
