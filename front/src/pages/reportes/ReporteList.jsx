// IEEE Trace: [REQ-REPT-01] | [US-REP-01]
import React from 'react';
import { useReportes } from '../../hooks/useAuditorias';
import { FileOutput, Send, CheckCircle, Clock } from 'lucide-react';

const ReporteList = () => {
    const { getAll, updateStatus } = useReportes();

    if (getAll.isLoading) return <div>Cargando Reportes Externos...</div>;

    return (
        <div style={{ padding: '2rem' }}>
            <h1 style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <FileOutput color="#ea4335" /> Sistema de Reportes Externos
            </h1>

            <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #eee', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead style={{ background: '#f8f9fa' }}>
                        <tr>
                            <th style={{ padding: '1rem', textAlign: 'left', color: '#5f6368' }}>Área</th>
                            <th style={{ padding: '1rem', textAlign: 'left', color: '#5f6368' }}>Sistema</th>
                            <th style={{ padding: '1rem', textAlign: 'left', color: '#5f6368' }}>Período</th>
                            <th style={{ padding: '1rem', textAlign: 'left', color: '#5f6368' }}>Estado</th>
                            <th style={{ padding: '1rem', textAlign: 'left', color: '#5f6368' }}>Fecha Envío</th>
                            <th style={{ padding: '1rem', textAlign: 'center', color: '#5f6368' }}>Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {getAll.data?.map(rep => (
                            <tr key={rep.id} style={{ borderBottom: '1px solid #eee' }}>
                                <td style={{ padding: '1rem', fontWeight: '500' }}>{rep.Area?.name}</td>
                                <td style={{ padding: '1rem' }}>
                                    <span style={{ padding: '0.25rem 0.5rem', background: '#fce8e6', color: '#c5221f', borderRadius: '4px', fontSize: '0.85rem', fontWeight: 'bold' }}>
                                        {rep.system}
                                    </span>
                                </td>
                                <td style={{ padding: '1rem' }}>{rep.period}</td>
                                <td style={{ padding: '1rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: rep.status === 'ENVIADO' ? '#1e8e3e' : '#f9ab00' }}>
                                        {rep.status === 'ENVIADO' ? <CheckCircle size={16} /> : <Clock size={16} />}
                                        {rep.status}
                                    </div>
                                </td>
                                <td style={{ padding: '1rem', color: '#666' }}>{rep.submission_date || 'En trámite'}</td>
                                <td style={{ padding: '1rem', textAlign: 'center' }}>
                                    {rep.status === 'PENDIENTE' && (
                                        <button
                                            onClick={() => updateStatus.mutate({ id: rep.id, status: 'ENVIADO' })}
                                            style={{
                                                background: '#1a73e8',
                                                color: '#fff',
                                                border: 'none',
                                                padding: '0.4rem 0.8rem',
                                                borderRadius: '4px',
                                                cursor: 'pointer',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '0.4rem',
                                                fontSize: '0.85rem'
                                            }}
                                        >
                                            <Send size={14} /> Enviar Reporte
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ReporteList;
