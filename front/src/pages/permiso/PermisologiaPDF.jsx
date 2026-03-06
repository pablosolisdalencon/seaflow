// IEEE Trace: [US-PERM-02]
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Search, Printer, Download, X, Maximize2 } from 'lucide-react';

const PermisologiaPDF = () => {
    const navigate = useNavigate();

    return (
        <div style={{ padding: '2rem' }}>
            {/* Same Area Tabs for consistency */}
            <div style={{ display: 'flex', border: '2px solid #000', borderRadius: '4px', overflow: 'hidden', marginBottom: '1rem', width: 'fit-content' }}>
                {['Caucahue', 'Chequian', 'Pullao'].map(a => (
                    <div
                        key={a}
                        style={{
                            padding: '0.4rem 2rem',
                            background: a === 'Caucahue' ? '#c2e7ff' : '#fff',
                            borderRight: '2px solid #000',
                            fontWeight: 'bold'
                        }}
                    >
                        {a}
                    </div>
                ))}
            </div>

            <h3 style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>Base Caucahue</h3>

            <div style={{ background: '#333', borderRadius: '4px', overflow: 'hidden', padding: '1rem' }}>
                {/* PDF Toolbar */}
                <div style={{ background: '#444', color: '#fff', padding: '0.5rem 1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderRadius: '4px 4px 0 0' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <ChevronLeft size={16} /> <ChevronRight size={16} />
                        </div>
                        <span style={{ fontSize: '0.8rem' }}>Pag <input type="text" value="1" readOnly style={{ width: '30px', background: '#333', border: '1px solid #666', color: '#fff', textAlign: 'center' }} /> de 2</span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', borderRight: '1px solid #666', paddingRight: '1rem' }}>
                            <div style={{ width: '12px', height: '2px', background: '#fff' }}></div>
                            <Search size={14} />
                            <div style={{ fontSize: '18px' }}>+</div>
                        </div>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <Maximize2 size={16} />
                            <Printer size={16} />
                            <Download size={16} />
                            <X size={16} onClick={() => navigate('/permisologia')} style={{ cursor: 'pointer' }} />
                        </div>
                    </div>
                </div>

                {/* PDF Content Mockup */}
                <div style={{ background: '#fff', padding: '4rem 2rem', minHeight: '500px', display: 'flex', justifyContent: 'center' }}>
                    <div style={{ border: '1px solid #ccc', padding: '3rem', width: '80%', position: 'relative' }}>
                        <div style={{ textAlign: 'right', fontSize: '0.7rem' }}>Mil doscientos veintisiete.- 1227.-</div>
                        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
                            <h4 style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>N° 1125</h4>
                            <h4 style={{ fontSize: '1.4rem', fontWeight: 'bold', marginTop: '2rem' }}>COMPRAVENTA</h4>
                            <h4 style={{ fontSize: '1.1rem', fontWeight: 'normal', marginTop: '3rem' }}>CULTIVOS MARINOS DEL PACIFICO</h4>
                            <h4 style={{ fontSize: '1rem', fontWeight: 'normal' }}>S.A.</h4>
                            <h4 style={{ fontSize: '1rem', fontWeight: 'normal', marginTop: '3rem' }}>DE</h4>
                            <h4 style={{ fontSize: '1.1rem', fontWeight: 'normal', marginTop: '3rem' }}>MANSILLA CARDENAS, MARTA</h4>
                            <h4 style={{ fontSize: '1rem', fontWeight: 'normal' }}>GEORGINA</h4>
                        </div>
                        <img src="https://upload.wikimedia.org/wikipedia/commons/3/3a/Jon_Foreman_Signature.png" style={{ position: 'absolute', right: '1rem', top: '10rem', width: '100px', opacity: 0.7 }} alt="signature" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PermisologiaPDF;
