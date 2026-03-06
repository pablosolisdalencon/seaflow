// IEEE Trace: [US-PROC-01]
import React from 'react';
import { FileText, Plus, Edit3, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

const ProcedimientoList = () => {
    const [page, setPage] = React.useState(1);
    const procedimientos = [
        "IN-CU-GR-001-v11 Instructivo Despacho de cosecha.",
        "IN-CU-GR-002-v07 Instructivo evaluación de riesgos ambientales.",
        "IN-CU-GR-003-v09 Instructivo Limpieza infraestructuras.",
        "IN-CU-GR-004-v06 Semilla y Captación",
        "IN-CU-GR-005-v09 Instructivo de Trazabilidad y Reclamo.",
        "IN-CU-GR-006-v07 Contingencia ambiental perdida de producto en carretera",
        "IN-CU-GR-007-v05 Instructivo para medición de cloro (sistema colorímetro)",
        "IN-CU-GR-008-v05 Instructivo de revisión y mantención de Cruces San Andrés",
        "PR-CU-GR-001-v08 Programa de limpieza de playas",
        "PR-CU-GR-002-v08 Procedimiento Preventivo de Mantenimiento de Artes de Cultivo.",
        "PR-CU-GR-003-v05 Procedimiento de Reciclaje.",
        "PR-CU-GR-004-v08 Matriz de Inocuidad Alimentaria Cultivos."
    ];

    return (
        <div style={{ padding: '2rem' }}>
            <div style={{ border: '4px solid #f1f3f4', padding: '2rem', background: '#fff', borderRadius: '4px' }}>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
                    <button style={{ background: '#042c4c', color: '#fff', border: '2px solid #000', padding: '0.4rem 1.5rem', borderRadius: '4px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
                        <Plus size={18} /> Nuevo
                    </button>
                </div>

                <div style={{ border: '2px solid #000', borderRadius: '4px', overflow: 'hidden' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                        <thead style={{ background: '#e8eaed', borderBottom: '2px solid #000' }}>
                            <tr>
                                <th style={{ padding: '0.5rem', borderRight: '1px solid #000', textAlign: 'left', width: '75%' }}>Procedimiento</th>
                                <th style={{ padding: '0.5rem', borderRight: '1px solid #000', textAlign: 'left' }}>Mes Actualización</th>
                                <th style={{ padding: '0.5rem', textAlign: 'left' }}>Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {procedimientos.map((p, idx) => (
                                <tr key={idx} style={{ borderBottom: '1px solid #ccc', background: idx % 2 === 0 ? '#fff' : '#f8f9fa' }}>
                                    <td style={{ padding: '0.75rem 1rem', borderRight: '1px solid #000', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize: '0.6rem' }}>
                                            <FileText size={18} />
                                            <span>PDF</span>
                                        </div>
                                        <span style={{ color: '#1a73e8', textDecoration: 'underline', cursor: 'pointer' }}>{p}</span>
                                    </td>
                                    <td style={{ padding: '0.75rem 1rem', borderRight: '1px solid #000' }}>Ago-Sept</td>
                                    <td style={{ padding: '0.75rem 1rem', textAlign: 'center' }}>
                                        <Edit3 size={18} style={{ color: '#5f6368', cursor: 'pointer' }} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Pagination */}
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', padding: '1rem', background: '#e8eaed', borderTop: '2px solid #000' }}>
                        <button style={{ background: '#fff', border: '1px solid #000', padding: '0.25rem' }}><ChevronsLeft size={16} /></button>
                        <button style={{ background: '#fff', border: '1px solid #000', padding: '0.25rem' }}><ChevronLeft size={16} /></button>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
                            <button key={n} style={{ background: page === n ? '#8ab4f8' : '#fff', border: '1px solid #000', padding: '0.25rem 0.6rem', fontWeight: 'bold' }}>{n}</button>
                        ))}
                        <button style={{ background: '#fff', border: '1px solid #000', padding: '0.25rem' }}><ChevronRight size={16} /></button>
                        <button style={{ background: '#fff', border: '1px solid #000', padding: '0.25rem' }}><ChevronsRight size={16} /></button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProcedimientoList;
