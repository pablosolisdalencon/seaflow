// IEEE Trace: [REQ-INFA-01] | [US-301] | [US-302] | [US-303]
import React from 'react';
import { useInfas } from '../../hooks/useInfas';
import { Thermometer, Activity, Droplets, AlertCircle } from 'lucide-react';

const InfaList = () => {
    const { getAll } = useInfas();

    if (getAll.isLoading) return <div>Cargando Informes INFAS...</div>;

    return (
        <div style={{ padding: '2rem' }}>
            <h1 style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Activity color="#1a73e8" /> Monitoreo Ambiental (INFAS)
            </h1>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1.5rem' }}>
                {getAll.data?.map(infa => (
                    <div key={infa.id} style={{
                        background: '#fff',
                        borderRadius: '16px',
                        padding: '1.5rem',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                        border: '1px solid #eee',
                        position: 'relative',
                        overflow: 'hidden'
                    }}>
                        <div style={{
                            position: 'absolute',
                            top: 0,
                            right: 0,
                            padding: '0.5rem 1rem',
                            background: infa.status === 'AEROBICA' ? '#e6f4ea' : '#fce8e6',
                            color: infa.status === 'AEROBICA' ? '#1e8e3e' : '#d93025',
                            fontWeight: 'bold',
                            fontSize: '0.8rem',
                            borderBottomLeftRadius: '12px'
                        }}>
                            {infa.status}
                        </div>

                        <div style={{ marginBottom: '1rem' }}>
                            <div style={{ color: '#1a73e8', fontWeight: 'bold', fontSize: '0.9rem' }}>{infa.Area?.name}</div>
                            <div style={{ color: '#666', fontSize: '0.8rem' }}>Fecha Reporte: {infa.report_date}</div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', borderTop: '1px solid #f0f0f0', paddingTop: '1rem' }}>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ color: '#999', fontSize: '0.7rem', marginBottom: '0.25rem' }}>pH</div>
                                <div style={{ fontWeight: '600', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem' }}>
                                    <Droplets size={14} color="#007bff" /> {infa.ph}
                                </div>
                            </div>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ color: '#999', fontSize: '0.7rem', marginBottom: '0.25rem' }}>Redox (mV)</div>
                                <div style={{ fontWeight: '600', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem' }}>
                                    <Thermometer size={14} color="#ff9800" /> {infa.redox}
                                </div>
                            </div>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ color: '#999', fontSize: '0.7rem', marginBottom: '0.25rem' }}>M.O. (%)</div>
                                <div style={{ fontWeight: '600', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem' }}>
                                    <AlertCircle size={14} color="#673ab7" /> {infa.mo}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default InfaList;
