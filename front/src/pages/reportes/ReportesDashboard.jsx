// IEEE Trace: [US-REP-01]
import React from 'react';
import { Download, Filter } from 'lucide-react';

const ReportesDashboard = () => {
    const reports = [
        { title: 'Cumplimiento Legal Gastos', value: '92%', color: '#1a73e8', sub: '+2.4% vs mes anterior' },
        { title: 'Capacitaciones Realizadas', value: '78%', color: '#34a853', sub: 'Pendientes: 12 colaboradores' },
        { title: 'Efectividad de Medidas', value: '85%', color: '#fbbc05', sub: 'Auditoría interna Feb' },
        { title: 'Gestión de Residuos', value: '64%', color: '#ea4335', sub: 'Meta anual: 90%' },
        { title: 'Permisos Vigentes', value: '100%', color: '#1a73e8', sub: 'Sin vencimientos próximos' },
        { title: 'Resoluciones CC.MM.', value: '55%', color: '#042c4c', sub: '3 en trámite' }
    ];

    const MiniChart = ({ color, value }) => {
        const percent = parseInt(value);
        return (
            <div style={{ width: '100%', height: '8px', background: '#e8eaed', borderRadius: '4px', marginTop: '1rem', overflow: 'hidden' }}>
                <div style={{ width: `${percent}%`, height: '100%', background: color }}></div>
            </div>
        );
    };

    return (
        <div style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', alignItems: 'center' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>Dashboard de Reportes Globales</h3>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button style={{ border: '2px solid #000', padding: '0.4rem 1rem', borderRadius: '4px', background: '#fff', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 'bold', fontSize: '0.85rem' }}>
                        <Filter size={16} /> Filtrar
                    </button>
                    <button style={{ background: '#042c4c', color: '#fff', border: '2px solid #000', padding: '0.4rem 1.5rem', borderRadius: '4px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
                        <Download size={16} /> Exportar PDF
                    </button>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                {reports.map((rep, idx) => (
                    <div key={idx} style={{ border: '2px solid #000', padding: '1.5rem', borderRadius: '8px', background: '#fff', boxShadow: '4px 4px 0px rgba(0,0,0,0.05)' }}>
                        <div style={{ fontSize: '0.8rem', color: '#5f6368', marginBottom: '0.5rem', fontWeight: 'bold', textTransform: 'uppercase' }}>{rep.title}</div>
                        <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#3c4043', display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
                            {rep.value}
                            <span style={{ fontSize: '0.75rem', fontWeight: 'normal', color: rep.sub.includes('+') ? '#34a853' : '#5f6368' }}>{rep.sub}</span>
                        </div>
                        <MiniChart color={rep.color} value={rep.value} />
                    </div>
                ))}
            </div>

            {/* Bottom Graphic Mockup */}
            <div style={{ marginTop: '2rem', border: '2px solid #000', padding: '2rem', borderRadius: '8px', background: '#f8f9fa' }}>
                <div style={{ fontSize: '0.9rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Progresión Trimestral de Cumplimiento</div>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: '2rem', height: '200px', paddingBottom: '2rem', borderBottom: '2px solid #000' }}>
                    {[65, 80, 75, 92, 85, 98].map((h, i) => (
                        <div key={i} style={{ flex: 1, background: '#1a73e8', height: `${h}%`, borderRadius: '4px 4px 0 0', position: 'relative' }}>
                            <div style={{ position: 'absolute', bottom: '-25px', width: '100%', textAlign: 'center', fontSize: '0.7rem' }}>Mes {i + 1}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ReportesDashboard;
