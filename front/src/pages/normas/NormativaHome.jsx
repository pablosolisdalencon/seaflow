// IEEE Trace: [US-NORM-03]
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

const NormativaHome = () => {
    const navigate = useNavigate();
    const [area, setArea] = React.useState('Caucaue');

    const areas = ['Caucahue', 'Chequian', 'Pullao'];

    const btnStyle = {
        background: '#042c4c',
        color: '#fff',
        border: '2px solid #000',
        padding: '0.5rem 1.5rem',
        borderRadius: '4px',
        fontWeight: 'bold',
        cursor: 'pointer'
    };

    return (
        <div style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ position: 'relative', width: '200px' }}>
                    <select
                        value={area}
                        onChange={(e) => setArea(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '0.5rem 1rem',
                            border: '2px solid #000',
                            borderRadius: '0',
                            appearance: 'none',
                            background: '#fff',
                            fontSize: '0.9rem'
                        }}
                    >
                        <option disabled>Seleccionar área</option>
                        {areas.map(a => <option key={a} value={a}>{a}</option>)}
                    </select>
                    <ChevronDown size={18} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />

                    <div style={{ marginTop: '0', border: '2px solid #000', borderTop: 'none' }}>
                        {areas.map(a => (
                            <div
                                key={a}
                                onClick={() => setArea(a)}
                                style={{
                                    padding: '0.25rem 1rem',
                                    fontSize: '0.9rem',
                                    background: area === a ? '#c2e7ff' : '#fff',
                                    cursor: 'pointer',
                                    borderBottom: '1px solid #ccc'
                                }}
                            >
                                {a}
                            </div>
                        ))}
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button style={btnStyle} onClick={() => navigate('/normativa/aplicable')}>
                        Ver Normativa Aplicable
                    </button>
                    <button style={btnStyle} onClick={() => navigate('/normativa/cumplimiento')}>
                        Ver Cumplimiento
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NormativaHome;
