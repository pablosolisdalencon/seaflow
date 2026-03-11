import React from 'react';
import { useReportes } from '../../hooks/useAuditorias';
import { Calendar, CheckCircle, Clock, AlertCircle, Filter, Download } from 'lucide-react';

const ReportesDashboard = () => {
    const { getAll } = useReportes();

    if (getAll.isLoading) return <div style={{ padding: '2rem' }}>Cargando Panel de Reportes...</div>;

    const months = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'];
    const currentMonth = new Date().getMonth();

    const getStatusColor = (status) => {
        switch(status) {
            case 'ENVIADO': return '#1e8e3e';
            case 'PENDIENTE': return '#d93025';
            case 'EN_PROCESO': return '#f9ab00';
            default: return '#dadce0';
        }
    };

    return (
        <div style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#042c4c', margin: 0 }}>
                    <Calendar color="#1a73e8" size={32} /> Seguimiento de Reportes Externos
                </h1>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: '#fff', border: '1px solid #ddd', padding: '0.5rem 1rem', borderRadius: '8px', fontSize: '0.85rem', cursor: 'pointer' }}>
                        <Filter size={16} /> Filtros
                    </button>
                    <button style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: '#1a73e8', color: '#fff', border: 'none', padding: '0.5rem 1rem', borderRadius: '8px', fontSize: '0.85rem', cursor: 'pointer', fontWeight: '600' }}>
                        <Download size={16} /> Exportar Planilla
                    </button>
                </div>
            </div>

            {/* Gantt Chart Implementation */}
            <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #e0e0e0', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '800px' }}>
                        <thead style={{ background: '#f8f9fa' }}>
                            <tr>
                                <th style={{ padding: '1.25rem', textAlign: 'left', borderBottom: '1px solid #eee', width: '250px', background: '#f8f9fa', position: 'sticky', left: 0, zIndex: 10 }}>Sistema / Reporte</th>
                                {months.map((m, idx) => (
                                    <th key={m} style={{ 
                                        padding: '1rem', textAlign: 'center', borderBottom: '1px solid #eee', fontSize: '0.75rem', color: '#5f6368',
                                        background: idx === currentMonth ? '#e8f0fe' : 'transparent',
                                        borderLeft: '1px solid #eee'
                                    }}>
                                        {m}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {getAll.data?.map(report => (
                                <tr key={report.id} style={{ borderBottom: '1px solid #f1f3f4' }}>
                                    <td style={{ padding: '1.25rem', position: 'sticky', left: 0, background: '#fff', zIndex: 5, borderRight: '1px solid #f1f3f4' }}>
                                        <div style={{ fontWeight: 'bold', fontSize: '0.9rem', color: '#202124' }}>{report.system}</div>
                                        <div style={{ fontSize: '0.75rem', color: '#1a73e8' }}>{report.Area?.name || 'General'}</div>
                                    </td>
                                    {months.map((m, idx) => {
                                        // Mock logic for Gantt display based on current data
                                        const isReportMonth = report.period.includes(m) || (report.period === '2024-Q1' && idx < 3) || (report.period === 'ANUAL-2023' && idx === 0);
                                        return (
                                            <td key={idx} style={{ 
                                                padding: '0.5rem', borderLeft: '1px solid #f1f3f4', textAlign: 'center',
                                                background: idx === currentMonth ? '#f8fafd' : 'transparent'
                                            }}>
                                                {isReportMonth && (
                                                    <div style={{ 
                                                        height: '24px', borderRadius: '12px', background: getStatusColor(report.status),
                                                        color: '#fff', fontSize: '0.65rem', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                        fontWeight: 'bold', margin: '0 auto', width: '90%', cursor: 'pointer'
                                                    }} title={`${report.system} - ${report.status}`}>
                                                        {report.status === 'ENVIADO' ? <CheckCircle size={12} /> : report.status === 'PENDIENTE' ? <Clock size={12} /> : <AlertCircle size={12} />}
                                                    </div>
                                                )}
                                            </td>
                                        );
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div style={{ padding: '1.5rem', borderTop: '1px solid #f1f3f4', background: '#fcfcfc', display: 'flex', gap: '2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: '#5f6368' }}>
                        <div style={{ width: '12px', height: '12px', borderRadius: '3px', background: '#1e8e3e' }}></div> Enviado / Cumplido
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: '#5f6368' }}>
                        <div style={{ width: '12px', height: '12px', borderRadius: '3px', background: '#d93025' }}></div> Pendiente / Vencido
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: '#5f6368' }}>
                        <div style={{ width: '12px', height: '12px', borderRadius: '3px', background: '#f9ab00' }}></div> En Proceso / Rectificación
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReportesDashboard;
