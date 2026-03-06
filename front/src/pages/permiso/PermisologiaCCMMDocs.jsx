// IEEE Trace: [US-PERM-03]
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Folder, FileText, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Plus } from 'lucide-react';

const PermisologiaCCMMDocs = () => {
    const navigate = useNavigate();
    const [page, setPage] = React.useState(1);

    const items = [
        { type: 'folder', name: 'Renovación primera 2020' },
        { type: 'folder', name: 'Renovación segunda 06-2024' },
        { type: 'pdf', name: 'Caucahue conglomerado 34271.pdf' },
        { type: 'pdf', name: 'Plano Caucahue DS 58 31-12-2024.PD' }
    ];

    return (
        <div style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', border: '2px solid #000', borderRadius: '4px', overflow: 'hidden', marginBottom: '2rem', width: 'fit-content' }}>
                {['Caucahue', 'Chequian', 'Pullao'].map(a => (
                    <div key={a} style={{ padding: '0.4rem 2rem', background: a === 'Caucahue' ? '#c2e7ff' : '#fff', borderRight: '2px solid #000', fontWeight: 'bold' }}>{a}</div>
                ))}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.85rem' }}>
                <span style={{ color: '#1a73e8', textDecoration: 'underline', cursor: 'pointer' }} onClick={() => navigate('/permisologia')}>CC.MM.</span>
                <span> &gt; Playa, rampa de hormigon</span>
            </div>

            <div style={{ border: '4px solid #f1f3f4', padding: '1.5rem', background: '#fff' }}>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
                    <button style={{ background: '#042c4c', color: '#fff', border: '2px solid #000', padding: '0.25rem 1rem', borderRadius: '4px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.8rem' }}>
                        <Plus size={16} /> Crear
                    </button>
                </div>

                <div style={{ border: '2px solid #000', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        {items.map((item, idx) => (
                            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem 1.5rem', borderBottom: '1px solid #eee', background: idx % 2 === 0 ? '#fff' : '#f8f9fa' }}>
                                {item.type === 'folder' ? <Folder size={24} color="#5f6368" /> : (
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize: '0.6rem' }}>
                                        <FileText size={20} />
                                        <span>PDF</span>
                                    </div>
                                )}
                                <span style={{ fontSize: '0.9rem' }}>{item.name}</span>
                            </div>
                        ))}
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', padding: '1rem', background: '#e8eaed', borderTop: '2px solid #000' }}>
                        <button style={{ background: '#fff', border: '1px solid #000', padding: '0.25rem' }}><ChevronsLeft size={16} /></button>
                        <button style={{ background: '#fff', border: '1px solid #000', padding: '0.25rem' }}><ChevronLeft size={16} /></button>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
                            <button key={n} style={{ background: page === n ? '#8ab4f8' : '#fff', border: '1px solid #000', padding: '0.25rem 0.6rem', fontWeight: 'bold', fontSize: '0.8rem' }}>{n}</button>
                        ))}
                        <button style={{ background: '#fff', border: '1px solid #000', padding: '0.25rem' }}><ChevronRight size={16} /></button>
                        <button style={{ background: '#fff', border: '1px solid #000', padding: '0.25rem' }}><ChevronsRight size={16} /></button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PermisologiaCCMMDocs;
