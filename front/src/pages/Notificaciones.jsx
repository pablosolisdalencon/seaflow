// IEEE Trace: [REQ-LOGS-01] | [US-102]
import React from 'react';
import { useNotificaciones } from '../hooks/useNotificaciones';
import { Bell, CheckCircle } from 'lucide-react';

const NotificationList = () => {
    const { getAll, markAsRead } = useNotificaciones();

    if (getAll.isLoading) return <div>Cargando notificaciones...</div>;

    return (
        <div style={{ padding: '2rem' }}>
            <h1 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
                <Bell /> Centro de Alertas
            </h1>
            <div style={{ display: 'grid', gap: '1rem' }}>
                {getAll.data?.map(n => (
                    <div key={n.id} style={{
                        padding: '1.5rem',
                        background: n.read ? '#f8f9fa' : '#fff',
                        borderRadius: '12px',
                        border: '1px solid #eee',
                        borderLeft: n.read ? '4px solid #ccc' : '4px solid #007bff',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <div>
                            <p style={{ margin: 0, color: n.read ? '#666' : '#333', fontWeight: n.read ? 'normal' : '500' }}>{n.message}</p>
                            <span style={{ fontSize: '0.8rem', color: '#999' }}>{new Date(n.createdAt).toLocaleString()}</span>
                        </div>
                        {!n.read && (
                            <button
                                onClick={() => markAsRead.mutate(n.id)}
                                style={{ background: 'none', border: 'none', color: '#007bff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                            >
                                <CheckCircle size={18} /> Marcar como leída
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NotificationList;
