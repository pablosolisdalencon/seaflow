// IEEE Trace: [US-NORM-05]
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, BarChart2 } from 'lucide-react';

const NormativaCumplimiento = () => {
    const navigate = useNavigate();

    const data = [
        {
            n: 1, norma: 'Código Penal - Ley delitos económicos', evidencia: [
                'Autorizaciones y evidencias de cumplimiento',
                'Cumplimiento de la RCA'
            ], art: ['306', '308', '311', '310 bis'], cumple: ['SI', 'SI', 'SI', 'SI']
        },
        {
            n: 2, norma: 'RAMA', evidencia: [
                'RCA',
                'Infa Aeróbica'
            ], art: ['305', '3', '18', '19', '20'], cumple: ['NO', 'NO', 'SI', 'SI', 'SI']
        },
        {
            n: 3, norma: 'Reglamento desechos provenientes de la acuicultura', evidencia: [
                'Resolución para acopio de residuos no peligrosos',
                'Reportes RETC',
                'Resoluciones Sanitarias bodegas de RESPEL'
            ], art: ['10-a)', '10-d)', '5 -e)', '14', '4-a)', '4-b)'], cumple: ['NO', 'NO', 'NO', 'SI', 'SI', 'SI']
        },
        {
            n: 4, norma: 'Reglamento SUSPEL', evidencia: [
                'Plano de las instalaciones al ingreso de las bases',
                'Procedimiento de operación',
                'Sistema de control de derrame'
            ], art: ['15', '12', '21'], cumple: ['NO', 'N/E', 'N/E']
        }
    ];

    return (
        <div style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', border: '2px solid #000', padding: '0.25rem 0.75rem', fontSize: '0.9rem' }}>
                    Caucahue <ChevronDown size={14} />
                </div>
                <button
                    onClick={() => navigate('/normativa/gantt')}
                    style={{
                        background: '#042c4c',
                        color: '#fff',
                        border: '2px solid #000',
                        padding: '0.4rem 1.5rem',
                        borderRadius: '4px',
                        fontWeight: 'bold',
                        cursor: 'pointer'
                    }}>
                    Ver Carta Gantt
                </button>
            </div>

            <div style={{ border: '2px solid #000', borderRadius: '4px', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
                    <thead style={{ background: '#e8eaed', borderBottom: '2px solid #000' }}>
                        <tr>
                            <th style={{ padding: '0.5rem', borderRight: '1px solid #000', width: '30px' }}>N°</th>
                            <th style={{ padding: '0.5rem', borderRight: '1px solid #000', textAlign: 'left' }}>Norma</th>
                            <th style={{ padding: '0.5rem', borderRight: '1px solid #000', textAlign: 'left' }}>Evidencia</th>
                            <th style={{ padding: '0.5rem', borderRight: '1px solid #000', width: '60px' }}>Artículo</th>
                            <th style={{ padding: '0.5rem', width: '60px' }}>Cumple</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row, idx) => (
                            <React.Fragment key={idx}>
                                {row.evidencia.map((ev, evIdx) => (
                                    <tr key={`${idx}-${evIdx}`} style={{ borderBottom: '1px solid #ccc' }}>
                                        {evIdx === 0 && (
                                            <>
                                                <td rowSpan={row.evidencia.length} style={{ padding: '0.5rem', borderRight: '1px solid #000', textAlign: 'center', verticalAlign: 'top' }}>{row.n}</td>
                                                <td rowSpan={row.evidencia.length} style={{ padding: '0.5rem', borderRight: '1px solid #000', verticalAlign: 'top' }}>{row.norma}</td>
                                            </>
                                        )}
                                        <td style={{ padding: '0.5rem', borderRight: '1px solid #000' }}>{ev}</td>
                                        <td style={{ borderRight: '1px solid #000', padding: 0 }}>
                                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                {/* This mapping is complex as SI/NO corresponds to articles, not necessarily items. 
                                                   Simplified to match the visual of Image 5 */}
                                                <div style={{ padding: '0.25rem 0.5rem', borderBottom: '1px solid #eee' }}>{row.art[evIdx] || '-'}</div>
                                            </div>
                                        </td>
                                        <td style={{ padding: 0, textAlign: 'center' }}>
                                            <div style={{
                                                padding: '0.25rem',
                                                background: row.cumple[evIdx] === 'NO' ? '#c2e7ff' : 'transparent',
                                                border: row.cumple[evIdx] === 'NO' ? '1px solid #042c4c' : 'none',
                                                margin: '2px',
                                                fontWeight: 'bold'
                                            }}>
                                                {row.cumple[evIdx] || '-'}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>

            <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', width: '300px' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>Nivel de cumplimiento</span>
                <div style={{ width: '100%', height: '20px', background: '#e0e0e0', borderRadius: '2px', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ width: '55%', height: '100%', background: '#1a73e8', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '0.75rem', fontWeight: 'bold' }}>
                        55%
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NormativaCumplimiento;
