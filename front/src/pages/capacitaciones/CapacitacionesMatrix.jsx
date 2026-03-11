import React from 'react';
import { useCapacitaciones } from '../../hooks/useCapacitaciones';
import { Check, X, Minus } from 'lucide-react';

const CapacitacionesMatrix = () => {
    const { getMatrix } = useCapacitaciones();
    const { data: matrix, isLoading } = getMatrix;

    if (isLoading) return <div style={{ padding: '2rem' }}>Cargando matriz...</div>;

    // Collect all unique training names for the header
    const allTrainings = [];
    matrix?.forEach(user => {
        user.Capacitacions?.forEach(cap => {
            if (!allTrainings.find(t => t.id === cap.id)) {
                allTrainings.push({ id: cap.id, nombre: cap.nombre });
            }
        });
    });

    return (
        <div style={{ padding: '2rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#042c4c' }}>Matriz de Capacitación</h2>
            
            <div style={{ overflowX: 'auto', border: '1px solid #e0e0e0', borderRadius: '8px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                    <thead style={{ background: '#f8f9fa', borderBottom: '2px solid #042c4c' }}>
                        <tr>
                            <th style={{ padding: '1rem', textAlign: 'left', borderRight: '1px solid #e0e0e0', minWidth: '200px' }}>Colaborador</th>
                            {allTrainings.map(t => (
                                <th key={t.id} style={{ padding: '1rem', textAlign: 'center', borderRight: '1px solid #e0e0e0', minWidth: '150px' }}>
                                    {t.nombre}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {matrix?.map((user, idx) => (
                            <tr key={user.id} style={{ borderBottom: '1px solid #eee', background: idx % 2 === 0 ? '#fff' : '#fafafa' }}>
                                <td style={{ padding: '0.75rem 1rem', fontWeight: '500', borderRight: '1px solid #e0e0e0' }}>{user.name}</td>
                                {allTrainings.map(t => {
                                    const userCap = user.Capacitacions?.find(uc => uc.id === t.id);
                                    const registro = userCap?.RegistroCapacitacion;
                                    
                                    return (
                                        <td key={t.id} style={{ padding: '0.75rem 1rem', textAlign: 'center', borderRight: '1px solid #e0e0e0' }}>
                                            {!registro ? (
                                                <Minus size={16} color="#ccc" />
                                            ) : registro.asistencia ? (
                                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
                                                    <Check size={18} color="#1e8e3e" />
                                                    {registro.nota && <span style={{ fontSize: '0.7rem', color: '#5f6368' }}>Nota: {registro.nota}</span>}
                                                </div>
                                            ) : (
                                                <X size={18} color="#d93025" />
                                            )}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div style={{ marginTop: '2rem', display: 'flex', gap: '2rem', fontSize: '0.8rem', color: '#5f6368' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Check size={14} color="#1e8e3e" /> Asistió
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <X size={14} color="#d93025" /> No Asistió
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Minus size={14} color="#ccc" /> No Programado
                </div>
            </div>
        </div>
    );
};

export default CapacitacionesMatrix;
