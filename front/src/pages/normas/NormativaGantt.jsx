// IEEE Trace: [US-NORM-06]
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, ArrowLeft, Plus, CheckCircle2, AlertCircle } from 'lucide-react';

const NormativaGantt = () => {
    const navigate = useNavigate();
    const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

    const data = [
        { resp: 'Jefe de Área', evidence: 'Pago de la patente municipal', plazo: 'Semestral', status: [1, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0] },
        { resp: 'RRHH', evidence: 'Listado de pago de sueldos dignos', plazo: 'Mensual', status: [1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2] },
        { resp: 'RRHH', evidence: 'Detalle del personal APL', plazo: 'Mensual', status: [1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2] },
        { resp: 'Adm. y Finanzas', evidence: 'Consumos energéticos camionetas', plazo: '07/ c/mes', status: [1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2] },
        { resp: 'Control producción', evidence: 'Planilla control biomasa', plazo: 'Mensual', status: [1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2] },
        { resp: 'Asist. Administrativo', evidence: 'Guía por despacho de reciclaje', plazo: 'Por retiro', status: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
        { resp: 'Asist. Administrativo', evidence: 'Registro de bitácora de fiscalización', plazo: 'C/fiscalización', status: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
    ];

    const Marker = ({ type }) => {
        if (type === 1) return <CheckCircle2 size={16} color="#ccc" />;
        if (type === 2) return <div style={{ background: '#042c4c', color: '#fff', borderRadius: '50%', width: '16px', height: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 'bold' }}>!</div>;
        return null;
    };

    return (
        <div style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', border: '2px solid #000', padding: '0.25rem 0.75rem', fontSize: '0.9rem' }}>
                        Caucahue <ChevronDown size={14} />
                    </div>
                    <div style={{ display: 'flex', gap: '1rem', fontSize: '0.8rem', alignItems: 'center' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><CheckCircle2 size={14} color="#ccc" /> Realizado</span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><div style={{ background: '#042c4c', color: '#fff', borderRadius: '50%', width: '14px', height: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px' }}>!</div> Pendiente</span>
                    </div>
                </div>

                <button
                    onClick={() => navigate('/normativa/cumplimiento')}
                    style={{
                        background: '#042c4c',
                        color: '#fff',
                        border: '2px solid #000',
                        padding: '0.4rem 1.5rem',
                        borderRadius: '4px',
                        fontWeight: 'bold',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                    }}>
                    <ArrowLeft size={16} /> Volver
                </button>
            </div>

            <div style={{ border: '2px solid #000', borderRadius: '4px', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.75rem' }}>
                    <thead style={{ background: '#e8eaed', borderBottom: '2px solid #000' }}>
                        <tr>
                            <th style={{ padding: '0.5rem', borderRight: '1px solid #000', textAlign: 'left' }}>Responsable</th>
                            <th style={{ padding: '0.5rem', borderRight: '1px solid #000', textAlign: 'left' }}>Evidencia</th>
                            <th style={{ padding: '0.5rem', borderRight: '1px solid #000', textAlign: 'left' }}>Plazo</th>
                            {months.map(m => <th key={m} style={{ padding: '0.25rem', borderRight: '1px solid #000', width: '30px' }}>{m}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row, idx) => (
                            <tr key={idx} style={{ borderBottom: '1px solid #ccc' }}>
                                <td style={{ padding: '0.5rem', borderRight: '1px solid #000' }}>{row.resp}</td>
                                <td style={{ padding: '0.5rem', borderRight: '1px solid #000' }}>{row.evidence}</td>
                                <td style={{ padding: '0.5rem', borderRight: '1px solid #000' }}>{row.plazo}</td>
                                {row.status.map((st, sIdx) => (
                                    <td key={sIdx} style={{ borderRight: '1px solid #000', textAlign: 'center' }}>
                                        <Marker type={st} />
                                    </td>
                                ))}
                            </tr>
                        ))}
                        {/* Empty rows to match UI */}
                        {[1, 2, 3, 4, 5, 6].map(i => (
                            <tr key={`empty-${i}`} style={{ height: '30px', borderBottom: '1px solid #ccc' }}>
                                <td style={{ borderRight: '1px solid #000', padding: '0.5rem' }}>.</td>
                                <td style={{ borderRight: '1px solid #000' }}></td>
                                <td style={{ borderRight: '1px solid #000' }}></td>
                                {months.map(m => <td key={m} style={{ borderRight: '1px solid #000' }}></td>)}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <button style={{
                marginTop: '1.5rem',
                background: '#042c4c',
                color: '#fff',
                border: '2px solid #000',
                padding: '0.5rem 1.5rem',
                borderRadius: '4px',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                cursor: 'pointer'
            }}>
                <Plus size={18} /> Añadir evidencia
            </button>
        </div>
    );
};

export default NormativaGantt;
