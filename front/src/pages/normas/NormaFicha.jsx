import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, Download, Eye, CheckCircle, UserPlus } from 'lucide-react';

const NormaFicha = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [norma, setNorma] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNorma = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/normas/${id}`, {
                    withCredentials: true
                });
                setNorma(res.data);
            } catch (err) {
                console.error('Error fetching norma:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchNorma();
    }, [id]);

    if (loading) return <div style={{ padding: '2rem' }}>Cargando...</div>;
    if (!norma) return <div style={{ padding: '2rem' }}>Normativa no encontrada</div>;

    const fichaData = {
        title: norma.nombre,
        records: [
            { label: 'Normativa', value: norma.nombre },
            { label: 'Fecha de publicación', value: norma.fecha_publicacion },
            { label: 'Entidad Emisora', value: norma.organismo },
            { label: 'Materia', value: 'Medio Ambiente' }, // Fixed for now or from DB if added
            { label: 'Alcance geográfico', value: 'Nacional' },
            { label: 'Sectores', value: 'Transversal' },
            { label: 'Temática', value: norma.descripcion }
        ],
        resumen: norma.resumen || 'Sin resumen disponible',
        descripcion: norma.descripcion
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
                <div style={{ padding: '1rem', border: '2px solid #000', borderRadius: '4px', marginBottom: '1.5rem', fontSize: '0.85rem', lineHeight: '1.4' }}>
                    {fichaData.descripcion}
                </div>

                {norma.Articulos && norma.Articulos.length > 0 && (
                    <>
                        <h3 style={{ fontSize: '1rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>ARTÍCULOS RELACIONADOS</h3>
                        <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #ccc', marginBottom: '2.5rem' }}>
                            <thead style={{ background: '#f8f9fa' }}>
                                <tr>
                                    <th style={{ padding: '0.5rem', border: '1px solid #ccc', width: '80px' }}>Art.</th>
                                    <th style={{ padding: '0.5rem', border: '1px solid #ccc' }}>Descripción</th>
                                    <th style={{ padding: '0.5rem', border: '1px solid #ccc', width: '120px' }}>Estado</th>
                                </tr>
                            </thead>
                            <tbody>
                                {norma.Articulos.map(art => (
                                    <tr key={art.id}>
                                        <td style={{ padding: '0.5rem', border: '1px solid #ccc', textAlign: 'center' }}>{art.numero}</td>
                                        <td style={{ padding: '0.5rem', border: '1px solid #ccc', fontSize: '0.8rem' }}>{art.contenido}</td>
                                        <td style={{ padding: '0.5rem', border: '1px solid #ccc', textAlign: 'center' }}>
                                            <select style={{ fontSize: '0.75rem' }}>
                                                <option>No Aplica</option>
                                                <option>Pendiente</option>
                                                <option>Cumple</option>
                                            </select>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </>
                )}

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
