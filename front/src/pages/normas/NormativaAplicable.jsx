// IEEE Trace: [US-NORM-04]
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, ArrowLeft, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

const NormativaAplicable = () => {
    const navigate = useNavigate();
    const [page, setPage] = React.useState(1);

    const normativas = [
        { norm: 'Decreto Fuerza de Ley 725 - Código Sanitario. 1968 (publicación D.O.).', short: 'Código Sanitario' },
        { norm: 'Resolución 885 - Normas de carácter general sobre deberes de reporte de avisos contingencias e incidentes a través del sistema de seguimiento ambiental. 2016.', short: 'Contingencias aviso SMA' },
        { norm: 'Resolución 343 - Dicta instrucciones para la elaboración y remisión de Informes de seguimiento ambiental del componente ambiental biodiversidad para los proyectos que cuentan con resolución de calificación ambiental. 2022.', short: 'Instrucciones seguimiento SMA' },
        { norm: 'Ordinario 180127 - Imparte instrucciones sobre antecedentes legales necesarios para someter Estudio o Declaración de Impacto Ambiental al SEIA sobre el cambio de titularidad y/o Representante Legal y para efectuar presentaciones al Servicio de Evaluación Ambiental. 2017.', short: 'Instrucciones SEIA' },
        { norm: 'Ley 19300 - Ley de Bases del Medio Ambiente. 1994', short: 'Ley de bases del MA' },
        { norm: 'Ley 21410. Modifica la ley general de pesca y acuicultura con el objeto de exigir a los titulares de concesiones de acuicultura medidas para evitar o reducir el depósito de desechos inorgánicos y orgánicos. 2022.', short: 'Ley desechos inorgánicos y orgánicos CCAA' },
        { norm: 'Decreto 430 - Fija el texto refundido coordinado y sistematizado de la Ley N° 18.892 de 1989 y sus modificaciones Ley General de Pesca y Acuicultura. 1992.', short: 'Ley de Pesca' },
        { norm: 'Decreto 383 Aprueba reglamento que fija los niveles mínimos de operación por especie y área de las concesiones y autorizaciones de acuicultura. 2009.', short: 'Niveles mínimos de operación' },
        { norm: 'Decreto 320 - Reglamento ambiental para la acuicultura. 2001', short: 'RAMA' },
        { norm: 'Decreto Supremo 594 - Reglamento sobre Condiciones Sanitarias y Ambientales Básicas en los Lugares de Trabajo. 2000.', short: 'Reg. Cond. en lugares de trabajo' },
        { norm: 'Decreto 290 - Reglamento de concesiones y autorizaciones de acuicultura. 1993.', short: 'Reglamento de CCAA' }
    ];

    return (
        <div style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
                <button
                    onClick={() => navigate('/normativa')}
                    style={{
                        background: '#042c4c',
                        color: '#fff',
                        border: '2px solid #000',
                        padding: '0.4rem 1.5rem',
                        borderRadius: '4px',
                        fontWeight: 'bold',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        cursor: 'pointer'
                    }}>
                    <ArrowLeft size={16} /> Volver
                </button>
            </div>

            <div style={{
                border: '4px solid #f1f3f4',
                padding: '1.5rem',
                background: '#fff'
            }}>
                <div style={{ border: '2px solid #000', borderRadius: '4px', overflow: 'hidden' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                        <thead style={{ background: '#e8eaed', borderBottom: '2px solid #000' }}>
                            <tr>
                                <th style={{ padding: '0.5rem', textAlign: 'left', borderRight: '1px solid #000', width: '70%', paddingLeft: '3rem' }}>Normativa</th>
                                <th style={{ padding: '0.5rem', textAlign: 'left' }}>Nombre corto</th>
                            </tr>
                        </thead>
                        <tbody>
                            {normativas.map((item, idx) => (
                                <tr key={idx} style={{ borderBottom: '1px solid #ccc', background: idx % 2 === 0 ? '#fff' : '#f8f9fa' }}>
                                    <td style={{ padding: '0.75rem 1rem', display: 'flex', alignItems: 'center', gap: '1rem', borderRight: '1px solid #000' }}>
                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize: '0.6rem' }}>
                                            <FileText size={20} />
                                            <span>PDF</span>
                                        </div>
                                        {item.norm}
                                    </td>
                                    <td style={{ padding: '0.75rem 1rem' }}>{item.short}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Pagination */}
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '1rem',
                        background: '#e8eaed',
                        borderTop: '2px solid #000'
                    }}>
                        <button style={{ background: '#fff', border: '1px solid #000', padding: '0.25rem' }}><ChevronsLeft size={16} /></button>
                        <button style={{ background: '#fff', border: '1px solid #000', padding: '0.25rem' }}><ChevronLeft size={16} /></button>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
                            <button key={n} style={{
                                background: page === n ? '#8ab4f8' : '#fff',
                                border: '1px solid #000',
                                padding: '0.25rem 0.6rem',
                                fontWeight: 'bold'
                            }} onClick={() => setPage(n)}>{n}</button>
                        ))}
                        <button style={{ background: '#fff', border: '1px solid #000', padding: '0.25rem' }}><ChevronRight size={16} /></button>
                        <button style={{ background: '#fff', border: '1px solid #000', padding: '0.25rem' }}><ChevronsRight size={16} /></button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NormativaAplicable;
