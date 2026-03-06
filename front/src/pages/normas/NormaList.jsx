import React from 'react';
import { useNormas } from '../../hooks/useNormativas';
import { FileText, ChevronRight } from 'lucide-react';

const NormaList = () => {
    const { data: normas, isLoading, error } = useNormas();

    if (isLoading) return <div>Cargando normativa...</div>;
    if (error) return <div>Error al cargar normativa</div>;

    return (
        <div style={{ padding: '2rem' }}>
            <h1 style={{ marginBottom: '2rem', color: '#333' }}>Repositorio Normativo</h1>
            <div style={{ display: 'grid', gap: '1rem' }}>
                {normas.map(norma => (
                    <div key={norma.id} style={{ padding: '1.5rem', background: '#fff', borderRadius: '8px', border: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <h3 style={{ margin: 0, color: '#007bff' }}>{norma.short_name || 'Sin nombre corto'}</h3>
                            <p style={{ margin: '0.5rem 0', color: '#666', fontSize: '0.9rem' }}>{norma.name}</p>
                            <div style={{ display: 'flex', gap: '1rem', fontSize: '0.8rem' }}>
                                <span style={{ padding: '0.2rem 0.5rem', background: '#e9ecef', borderRadius: '4px' }}>{norma.entity}</span>
                                <span style={{ padding: '0.2rem 0.5rem', background: '#e9ecef', borderRadius: '4px' }}>{norma.thematic}</span>
                            </div>
                        </div>
                        <ChevronRight style={{ color: '#ccc' }} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NormaList;
