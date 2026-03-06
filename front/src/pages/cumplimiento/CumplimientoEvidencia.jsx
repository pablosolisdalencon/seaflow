// IEEE Trace: [US-COMP-01]
import React from 'react';
import { Calendar as CalendarIcon, Upload, Send, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CumplimientoEvidencia = () => {
    const navigate = useNavigate();
    const [submitted, setSubmitted] = React.useState(false);

    if (submitted) {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: '1.5rem', textAlign: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#042c4c' }}>
                    <ShieldCheck size={32} />
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Cumplimiento realizado con éxito</h2>
                </div>
                <p style={{ color: '#5f6368' }}>A continuación puedes descargar el reporte de cumplimiento</p>
                <button style={{
                    background: '#042c4c',
                    color: '#fff',
                    border: '2px solid #000',
                    padding: '0.75rem 2.5rem',
                    borderRadius: '4px',
                    fontWeight: 'bold',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                }}>
                    <Upload style={{ transform: 'rotate(180deg)' }} size={20} /> Descargar
                </button>
                <button
                    onClick={() => navigate('/')}
                    style={{ background: 'none', border: 'none', color: '#1a73e8', textDecoration: 'underline', cursor: 'pointer' }}>
                    Volver al Inicio
                </button>
            </div>
        );
    }
    return (
        <div style={{ padding: '3rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3rem' }}>
                <CalendarIcon size={32} />
                <h1 style={{ fontSize: '1.4rem', fontWeight: 'bold', margin: 0 }}>
                    Cumplimiento por vencer: Pago patente
                </h1>
            </div>

            <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
                <p style={{ fontSize: '1rem', marginBottom: '1.5rem', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    Para completar el cumplimiento adjunta la evidencia correspondiente: <Info size={16} color="#1a73e8" />
                </p>

                <div style={{
                    border: '2px dashed #ccc',
                    borderRadius: '8px',
                    padding: '3rem',
                    marginBottom: '2rem',
                    background: '#f8f9fa',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '1rem',
                    color: '#666'
                }}>
                    <div style={{ background: '#1a73e8', color: '#fff', padding: '0.5rem', borderRadius: '50%' }}>
                        <Upload size={24} />
                    </div>
                    <span>Arrastra el archivo o presiona para buscar</span>
                </div>

                <div style={{ marginBottom: '2rem', textAlign: 'left' }}>
                    <textarea
                        placeholder="Observaciones (opcional)"
                        style={{
                            width: '100%',
                            minHeight: '120px',
                            padding: '1rem',
                            border: '2px solid #ccc',
                            borderRadius: '4px',
                            resize: 'vertical',
                            fontSize: '1rem'
                        }}
                    />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                    <button
                        onClick={() => setSubmitted(true)}
                        style={{
                            background: '#042c4c',
                            color: '#fff',
                            border: 'none',
                            padding: '0.75rem 3rem',
                            borderRadius: '4px',
                            fontWeight: 'bold',
                            fontSize: '1rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}>
                        <Send size={18} /> Enviar
                    </button>
                    <button
                        onClick={() => navigate('/')}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: '#1a73e8',
                            textDecoration: 'underline',
                            cursor: 'pointer',
                            fontSize: '0.9rem'
                        }}>
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CumplimientoEvidencia;
