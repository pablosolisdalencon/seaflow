// IEEE Trace: [US-NORM-01]
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useNormativas } from '../../hooks/useNormativas';

const NormaActualizacion = () => {
    const { getAll } = useNormativas();
    const navigate = useNavigate();

    if (getAll.isLoading) return <div style={{ padding: '2rem' }}>Cargando Actualizaciones...</div>;

    const mockData = [
        { id: '001/2024', fecha: '04-01-2024', normativa: 'Dictamen O-02-ISESAT-01758-2023\nLey N° 16.744. Imparte instrucciones sobre medidas de prevención por Hantavirus de Trabajadoras y Trabajadores Expuestos', pubFecha: '02-01-2024', categoria: 'Aplicable', estado: 'Revisado', responsable: 'Encargado MA' },
        { id: '002/2024', fecha: '10-02-2024', normativa: 'Noticia\nSEA implementó nueva funcionalidad en la plataforma e-SEIA para titulares de proyectos que decidan realizar voluntariamente un proceso de Participación Ciudadana Temprana', pubFecha: '07-02-2024', categoria: 'Referencial', estado: 'Revisado', responsable: 'Encargado MA' },
        { id: '003/2024', fecha: '11-03-2024', normativa: 'Resolución 2153.-\nFija programa y subprogramas de fiscalización ambiental de planes de prevención y/o descontaminación para el año 2024', pubFecha: '20-03-2024', categoria: 'Referencial', estado: 'Sin revisión', responsable: 'Encargado MA', active: true }
    ];

    const data = getAll.data?.length > 0 ? getAll.data : mockData;

    return (
        <div style={{ padding: '2rem' }}>
            <h2 style={{ fontSize: '1.1rem', marginBottom: '1.5rem', fontWeight: 'bold' }}>Actualización Normativa</h2>

            <div style={{ border: '2px solid #000', borderRadius: '4px', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                    <thead style={{ background: '#e8eaed', borderBottom: '2px solid #000' }}>
                        <tr>
                            {['ID', 'Fecha', 'Normativa', 'Fecha Publicación', 'Categoría', 'Estado', 'Responsable'].map(h => (
                                <th key={h} style={{ padding: '0.5rem', textAlign: 'left', borderRight: '1px solid #000' }}>{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, idx) => (
                            <tr
                                key={idx}
                                onClick={() => navigate(`/normativa/${item.id}`)}
                                style={{
                                    background: item.active ? '#c2e7ff' : '#fff',
                                    borderBottom: '1px solid #000',
                                    cursor: 'pointer'
                                }}
                            >
                                <td style={{ padding: '0.75rem', borderRight: '1px solid #000', color: item.active ? '#1a73e8' : 'inherit', textDecoration: item.active ? 'underline' : 'none' }}>{item.id}</td>
                                <td style={{ padding: '0.75rem', borderRight: '1px solid #000' }}>{item.fecha || item.createdAt?.split('T')[0]}</td>
                                <td style={{ padding: '0.75rem', borderRight: '1px solid #000', whiteSpace: 'pre-wrap' }}>
                                    <strong>{item.normativa?.split('\n')[0]}</strong><br />
                                    {item.normativa?.split('\n')[1]}
                                </td>
                                <td style={{ padding: '0.75rem', borderRight: '1px solid #000' }}>{item.pubFecha || 'N/A'}</td>
                                <td style={{ padding: '0.75rem', borderRight: '1px solid #000' }}>{item.categoria || 'Aplicable'}</td>
                                <td style={{ padding: '0.75rem', borderRight: '1px solid #000' }}>{item.estado || 'Revisado'}</td>
                                <td style={{ padding: '0.75rem' }}>{item.responsable || 'Encargado MA'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default NormaActualizacion;
