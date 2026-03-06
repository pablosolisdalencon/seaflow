import React from 'react';
import { Bell, MessageSquare, User, RotateCcw } from 'lucide-react';

const Header = () => {
    return (
        <header style={{
            height: '64px',
            background: '#202124',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 2rem',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            zIndex: 100
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <img src="/logo-mini.png" alt="SGI" style={{ height: '32px' }} onError={(e) => e.target.style.display = 'none'} />
                <h1 style={{ fontSize: '1.2rem', margin: 0, fontWeight: '500' }}>SGI Medio Ambiente</h1>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                    <RotateCcw size={20} />
                    <span style={{ fontSize: '0.9rem' }}>5</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                    <MessageSquare size={20} />
                    <span style={{ fontSize: '0.9rem' }}>1</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', paddingLeft: '1rem', borderLeft: '1px solid #444' }}>
                    <span style={{ fontSize: '0.9rem' }}>Hola, admin</span>
                    <div style={{
                        width: '32px',
                        height: '32px',
                        background: '#5f6368',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <User size={20} />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
