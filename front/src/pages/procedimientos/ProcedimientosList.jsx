import React from 'react';
import { useProcedimientos } from '../../hooks/useProcedimientos';
import { FileText, ExternalLink, History } from 'lucide-react';

const ProcedimientosList = () => {
    const { getAll } = useProcedimientos();
    const { data: procedimientos, isLoading } = getAll;

    if (isLoading) return <div style={{ padding: '2rem' }}>Cargando procedimientos...</div>;

    return (
        <div style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#042c4c' }}>Documentación SGI: Procedimientos e Instructivos</h2>
                <button style={{ background: '#042c4c', color: '#fff', border: 'none', padding: '0.6rem 1.2rem', borderRadius: '4px', fontWeight: '600' }}>
                    Nueva Versión
                </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                {procedimientos?.map(proc => (
                    <div key={proc.id} style={{ background: '#fff', border: '1px solid #e0e0e0', borderRadius: '8px', padding: '1.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                            <div style={{ padding: '0.5rem', background: '#e8f0fe', borderRadius: '6px', color: '#1a73e8' }}>
                                <FileText size={24} />
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontSize: '0.75rem', color: '#5f6368', fontWeight: 'bold', textTransform: 'uppercase' }}>{proc.code}</div>
                                <h3 style={{ fontSize: '1rem', fontWeight: '600', color: '#202124', margin: '0.25rem 0' }}>{proc.name}</h3>
                            </div>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#5f6368', borderTop: '1px solid #f1f3f4', paddingTop: '1rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                <History size={16} />
                                <span>Versión: <strong>{proc.version}</strong></span>
                            </div>
                            <div>Act: {proc.last_update}</div>
                        </div>

                        <div style={{ display: 'flex', gap: '0.75rem', marginTop: 'auto' }}>
                            <a 
                                href={proc.file_path || '#'} 
                                target="_blank" 
                                rel="noreferrer"
                                style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.5rem', background: '#f1f3f4', color: '#3c4043', borderRadius: '4px', textDecoration: 'none', fontSize: '0.85rem', fontWeight: '500' }}
                            >
                                <ExternalLink size={16} /> Ver PDF
                            </a>
                            <button style={{ padding: '0.5rem', background: 'transparent', border: '1px solid #e0e0e0', borderRadius: '4px', color: '#5f6368' }}>
                                <History size={16} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProcedimientosList;
