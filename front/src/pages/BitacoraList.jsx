// IEEE Trace: [REQ-LOGS-01] | [US-402]
import React from 'react';
import { useBitacora } from '../hooks/useBitacora';
import { History, User, Database, Clock } from 'lucide-react';

const BitacoraList = () => {
    const { getAll } = useBitacora();

    if (getAll.isLoading) return <div>Cargando Historial de Auditoría...</div>;

    return (
        <div style={{ padding: '2rem' }}>
            <h1 style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <History color="#5f6368" /> Bitácora de Auditoría Normativa
            </h1>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {getAll.data?.map(log => (
                    <div key={log.id} style={{
                        background: '#fff',
                        padding: '1rem 1.5rem',
                        borderRadius: '10px',
                        border: '1px solid #eee',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flex: 1 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', minWidth: '180px' }}>
                                <User size={16} color="#1a73e8" />
                                <span style={{ fontWeight: '500' }}>{log.User?.name}</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#3c4043' }}>
                                <Database size={16} color="#34a853" />
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
        </div>
    );
};

export default BitacoraList;
