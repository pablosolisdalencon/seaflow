// IEEE Trace: [US-CERT-01]
import React from 'react';

const CertificacionesList = () => {
    const [activeTab, setActiveTab] = React.useState('BAP');
    const tabs = ['ASC', 'BAP', 'Orgánico', 'APL 1', 'APL 2'];

    const data = [
        {
            n: 1, short: 'Derechos de propiedad y cumplimiento normativo', articles: [
                '1.1. Se deberá disponer de documentos vigentes que acrediten el uso legal de la tierra el fondo marino y/o el agua cuando corresponda.',
                '1.2. Los documentos vigentes deberán estar disponibles para demostrar que se han adquirido todas las licencias comerciales y de operación.',
                '1.3. Se deberá disponer de documentos vigentes que acrediten el cumplimiento de la normativa ambiental aplicable a la construcción y funcionamiento.',
                '1.4. Cuando corresponda los documentos actuales deberán estar disponibles para demostrar el cumplimiento de las leyes que protegen los recursos de pueblos indígenas y/o acuerdos independientes que el solicitante haya celebrado con ellos.',
                '1.5. Cuando corresponda los documentos actuales deberán estar disponibles para demostrar el cumplimiento de las normas regionales propias del sitio de cultivo códigos de prácticas de la industria si existen.'
            ]
        },
        { n: 2, short: 'Relaciones comunitarias', articles: ['2.1', '2.2', '2.3'] },
        { n: 3, short: 'Seguridad laboral y relaciones laborales', articles: ['3.1.', '3.2.', '3.3.', '3.4.', '3.5.'] }
    ];

    return (
        <div style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem' }}>
                {tabs.map(t => (
                    <button
                        key={t}
                        onClick={() => setActiveTab(t)}
                        style={{
                            padding: '0.4rem 1.5rem',
                            border: '2px solid #000',
                            borderRadius: '4px',
                            background: activeTab === t ? '#c2e7ff' : '#fff',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            fontSize: '0.9rem'
                        }}
                    >
                        {t}
                    </button>
                ))}
            </div>

            <div style={{ border: '2px solid #000', borderRadius: '4px', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.75rem' }}>
                    <thead style={{ background: '#e8eaed', borderBottom: '2px solid #000' }}>
                        <tr>
                            <th style={{ padding: '0.5rem', borderRight: '1px solid #000', width: '30px' }}>N°</th>
                            <th style={{ padding: '0.5rem', borderRight: '1px solid #000', textAlign: 'left', width: '25%' }}>Nombre corto</th>
                            <th style={{ padding: '0.5rem', borderRight: '1px solid #000', textAlign: 'left' }}>Artículos</th>
                            <th style={{ padding: '0.5rem', textAlign: 'left', width: '20%' }}>Evidencia para el cumplimiento</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row, idx) => (
                            <tr key={idx} style={{ borderBottom: '1px solid #ccc' }}>
                                <td style={{ padding: '0.75rem 0.5rem', borderRight: '1px solid #000', textAlign: 'center', verticalAlign: 'top' }}>{row.n}</td>
                                <td style={{ padding: '0.75rem 0.5rem', borderRight: '1px solid #000', verticalAlign: 'top' }}>{row.short}</td>
                                <td style={{ padding: '0.75rem 0.5rem', borderRight: '1px solid #000' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                        {row.articles.map((art, aIdx) => <div key={aIdx}>{art}</div>)}
                                    </div>
                                </td>
                                <td style={{ padding: '0.75rem 0.5rem' }}></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CertificacionesList;
