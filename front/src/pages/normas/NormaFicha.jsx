// IEEE Trace: [US-NORM-02]
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, Eye, CheckCircle, UserPlus } from 'lucide-react';

const NormaFicha = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const fichaData = {
        title: 'Resolución 2153.- Fija programa y subprogramas de fiscalización ambiental de planes de prevención y/o descontaminación para el año 2024',
        records: [
            { label: 'Normativa', value: 'Resolución 2153.- Fija programa y subprogramas de fiscalización ambiental de planes de prevención y/o descontaminación para el año 2024' },
            { label: 'Fecha de publicación', value: 'miércoles 27 de diciembre 2023' },
            { label: 'Entidad Emisora', value: 'Superintendencia del medio ambiente' },
            { label: 'Materia', value: 'Medio Ambiente' },
            { label: 'Alcance geográfico', value: 'Nacional' },
            { label: 'Sectores', value: 'Transversal' },
            { label: 'Temática', value: 'Programa y subprogramas de fiscalización ambiental de planes de prevención y/o descontaminación para el año 2024' }
        ],
        resumen: 'La Superintendencia del Medio Ambiente ha estimado pertinente fijar programa y subprogramas de fiscalización ambiental de planes de prevención y/o descontaminación para el año 2024 estableciendo el número de fiscalizaciones que la Superintendencia del Medio Ambiente y los Organismos Sectoriales por medio del respectivo subprograma de fiscalización ambiental, ejecutarán durante el año 2024 respecto de las medidas de competencia de la Superintendencia que se encuentran establecidas en los Planes de Prevención y/o Descontaminación.',
        descripcion: 'El objetivo principal de esto es fortalecer la fiscalización ambiental y fortalecer la respuesta a las denuncias. A través de la programación y subprogramación ambiental se avanza en ambos objetivos, dado que en la priorización para focalizar la fiscalización se consideran criterios tales como, riesgo ambiental vinculado a los componentes ambientales relevados; denuncias ciudadanas presentadas, y comportamiento del regulado en relación a procesos ante la SMA.'
    };

    const btnStyle = {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.5rem 1.5rem',
        background: '#042c4c',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        fontWeight: 'bold',
        fontSize: '0.9rem',
        cursor: 'pointer'
    };

    return (
        <div style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                    <ArrowLeft size={24} />
                </button>
                <span style={{ fontSize: '0.9rem' }}>Se publicó la siguiente normativa que podría ser de su interés y/o afectar a alguno(s) de sus procesos:</span>
            </div>

            <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>FICHA DE LA NORMATIVA</h3>
                <table style={{ width: '100%', borderCollapse: 'collapse', border: '2px solid #000', marginBottom: '2rem' }}>
                    <tbody>
                        {fichaData.records.map((r, i) => (
                            <tr key={i} style={{ borderBottom: '1px solid #ccc' }}>
                                <td style={{ padding: '0.5rem', background: '#f8f9fa', width: '200px', borderRight: '1px solid #ccc', fontWeight: 'bold', fontSize: '0.85rem' }}>{r.label}</td>
                                <td style={{ padding: '0.5rem', fontSize: '0.85rem' }}>{r.value}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <h3 style={{ fontSize: '1rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>RESUMEN</h3>
                <div style={{ padding: '1rem', border: '2px solid #000', borderRadius: '4px', marginBottom: '1.5rem', fontSize: '0.85rem', lineHeight: '1.4' }}>
                    {fichaData.resumen}
                </div>

                <h3 style={{ fontSize: '1rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>DESCRIPCIÓN</h3>
                <div style={{ padding: '1rem', border: '2px solid #000', borderRadius: '4px', marginBottom: '2.5rem', fontSize: '0.85rem', lineHeight: '1.4' }}>
                    {fichaData.descripcion}
                </div>

                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '2rem' }}>
                    <button style={btnStyle}><Download size={18} /> Descargar</button>
                    <button style={btnStyle}><Eye size={18} /> Ver</button>
                    <button style={btnStyle}><CheckCircle size={18} /> Marcar como revisado</button>
                    <button style={btnStyle}><UserPlus size={18} /> Asignar Responsable</button>
                </div>
            </div>
        </div>
    );
};

export default NormaFicha;
