// IEEE Trace: [US-DASH-01]
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar as CalendarIcon, Clock, ChevronRight } from 'lucide-react';

const Dashboard = () => {
    const navigate = useNavigate();
    const expirations = [
        { date: 'Viernes 02 de agosto', title: 'Capacitación manejo de residuos', color: '#c2e7ff' },
        { date: 'Lunes 05 de agosto', title: 'Consumo energético de la base', color: '#c2e7ff' },
        { date: 'Jueves 08 de agosto', title: 'Declaración SINADER', color: '#c2e7ff' }
    ];

    return (
        <div style={{ padding: '2rem', height: '100%', position: 'relative', display: 'flex' }}>
            {/* Left Column: Sticky Notes & Modal */}
            <div style={{ flex: 1, paddingRight: '2rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '300px' }}>
                    <div className="sticky-note yellow-note">
                        Botón de actualización que alerta de cualquier norma, ley, etc. que pueda afectar los procesos de CCS
                    </div>
                    <div className="sticky-note orange-note">
                        Botón de notificación que alerta de cualquier actividad hecha en la plataforma a quien tenga perfil de administrador
                    </div>
                </div>

                {/* Attention Modal Mockup */}
                <div style={{
                    marginTop: '4rem',
                    background: '#fff',
                    borderRadius: '16px',
                    padding: '2rem',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                    border: '2px solid #000',
                    maxWidth: '450px',
                    textAlign: 'center'
                }}>
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>¡Atención!</h2>
                    <p style={{ fontSize: '1.1rem', marginBottom: '2rem' }}>Tienes un cumplimiento próximo a vencer</p>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                        <button style={{
                            padding: '0.75rem 2rem',
                            background: '#fff',
                            border: '2px solid #000',
                            borderRadius: '4px',
                            fontWeight: 'bold'
                        }}>Posponer</button>
                        <button
                            onClick={() => navigate('/cumplimiento')}
                            style={{
                                padding: '0.75rem 2rem',
                                background: '#1a73e8',
                                color: '#fff',
                                border: '2px solid #000',
                                borderRadius: '4px',
                                fontWeight: 'bold',
                                cursor: 'pointer'
                            }}>IR</button>
                    </div>
                </div>
            </div>

            {/* Right Column: Calendar & Expirations */}
            <div style={{ width: '320px', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {/* Calendar Mockup */}
                <div style={{ border: '2px solid #000', borderRadius: '4px', background: '#fff' }}>
                    <div style={{
                        padding: '0.5rem',
                        borderBottom: '2px solid #000',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        fontWeight: 'bold',
                        fontSize: '0.9rem'
                    }}>
                        <ChevronRight style={{ transform: 'rotate(180deg)' }} size={16} />
                        AUGUST 2024
                        <ChevronRight size={16} />
                    </div>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center', fontSize: '0.85rem' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid #000' }}>
                                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => <th key={d} style={{ padding: '0.25rem' }}>{d}</th>)}
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                [28, 29, 30, 31, 1, 2, 3],
                                [4, 5, 6, 7, 8, 9, 10],
                                [11, 12, 13, 14, 15, 16, 17],
                                [18, 19, 20, 21, 22, 23, 24],
                                [25, 26, 27, 28, 29, 30, 31]
                            ].map((week, i) => (
                                <tr key={i}>
                                    {week.map((day, j) => (
                                        <td key={j} style={{ padding: '0.5rem', position: 'relative' }}>
                                            {day === 30 || day === 2 || day === 5 ? (
                                                <div style={{
                                                    width: '24px',
                                                    height: '24px',
                                                    border: day === 30 ? '2px solid red' : '2px solid red',
                                                    borderRadius: '50%',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    margin: '0 auto'
                                                }}>
                                                    {day}
                                                </div>
                                            ) : day}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Next Expirations */}
                <div>
                    <h3 style={{ fontSize: '1rem', marginBottom: '1rem', fontWeight: 'bold' }}>Próximos vencimientos</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {expirations.map((exp, idx) => (
                            <div key={idx} style={{
                                border: '2px solid #000',
                                borderRadius: '4px',
                                overflow: 'hidden'
                            }}>
                                <div style={{ background: exp.color, padding: '0.25rem 0.75rem', fontWeight: 'bold', fontSize: '0.85rem', borderBottom: '1px solid #000' }}>
                                    {exp.date}
                                </div>
                                <div style={{ padding: '0.5rem 0.75rem', fontSize: '0.85rem', background: '#fff' }}>
                                    {exp.title}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
