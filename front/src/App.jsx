import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import NormaList from './pages/normas/NormaList';
import PermisologiaHome from './pages/permiso/PermisologiaHome';
import NotificationList from './pages/Notificaciones';
import InfaList from './pages/infas/InfaList';
import ProcedimientoList from './pages/procedimientos/ProcedimientosList';
import BitacoraList from './pages/BitacoraList';
import AuditoriaList from './pages/auditoria/AuditoriaList';
import ReporteList from './pages/reportes/ReporteList';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import NormaActualizacion from './pages/normas/NormaActualizacion';
import NormaFicha from './pages/normas/NormaFicha';
import NormativaHome from './pages/normas/NormativaHome';
import NormativaAplicable from './pages/normas/NormativaAplicable';
import NormativaCumplimiento from './pages/normas/NormativaCumplimiento';
import NormativaGantt from './pages/normas/NormativaGantt';
import CertificacionesList from './pages/certificaciones/CertificacionesList';
import PermisologiaPDF from './pages/permiso/PermisologiaPDF';
import PermisologiaCCMMDocs from './pages/permiso/PermisologiaCCMMDocs';
import CapacitacionesMatrix from './pages/capacitaciones/CapacitacionesMatrix';
import ReportesDashboard from './pages/reportes/ReportesDashboard';
import CumplimientoEvidencia from './pages/cumplimiento/CumplimientoEvidencia';
import { Home, FileText, Map, Bell, ShieldCheck, Activity, BookOpen, History, ClipboardCheck, FileOutput, Award, GraduationCap, HelpCircle, LogOut } from 'lucide-react';

const queryClient = new QueryClient();

const Sidebar = () => {
    const path = window.location.pathname;

    const menuItemStyle = (targetPath) => ({
        display: 'flex',
        alignItems: 'center',
        gap: '0.85rem',
        padding: '0.75rem 1rem',
        color: '#e8eaed',
        textDecoration: 'none',
        borderRadius: '0 24px 24px 0',
        marginRight: '1rem',
        fontSize: '0.95rem',
        background: path.startsWith(targetPath) && targetPath !== '/' ? '#1a73e8' : (path === targetPath ? '#1a73e8' : 'transparent'),
        transition: 'all 0.2s ease'
    });

    return (
        <aside style={{ width: '260px', background: '#3c4043', color: '#fff', padding: '1.5rem 0', display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', flex: 1 }}>
                <Link to="/" style={menuItemStyle('/')}>
                    <Home size={18} /> Inicio
                </Link>
                <Link to="/normativa/gestion" style={menuItemStyle('/normativa')}>
                    <FileText size={18} /> Normativo
                </Link>
                <Link to="/certificaciones" style={menuItemStyle('/certificaciones')}>
                    <Award size={18} /> Certificaciones
                </Link>
                <Link to="/permisologia" style={menuItemStyle('/permisologia')}>
                    <Map size={18} /> Permisología
                </Link>
                <Link to="/procedimientos" style={menuItemStyle('/procedimientos')}>
                    <BookOpen size={18} /> Procedimientos
                </Link>
                <Link to="/capacitaciones" style={menuItemStyle('/capacitaciones')}>
                    <GraduationCap size={18} /> Capacitaciones
                </Link>
                <Link to="/reportes" style={menuItemStyle('/reportes')}>
                    <FileOutput size={18} /> Reportes
                </Link>
                <Link to="/bitacora" style={menuItemStyle('/bitacora')}>
                    <History size={18} /> Bitácora
                </Link>
                <Link to="/infas" style={menuItemStyle('/infas')}>
                    <Activity size={18} /> INFAS
                </Link>
                <Link to="/auditorias" style={menuItemStyle('/auditorias')}>
                    <ClipboardCheck size={18} /> Auditorías
                </Link>
            </nav>

            <div style={{ padding: '1rem 0', borderTop: '1px solid #555' }}>
                <Link to="/ayuda" style={menuItemStyle('/ayuda')}>
                    <HelpCircle size={18} /> Ayuda
                </Link>
                <div style={{ ...menuItemStyle('/logout'), cursor: 'pointer' }}>
                    <LogOut size={18} /> Cerrar sesión
                </div>
            </div>
        </aside>
    );
};

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();
    if (loading) return <div>Cargando...</div>;
    if (!user) return <Navigate to="/login" />;
    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <Header />
            <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
                <Sidebar />
                <main style={{ flex: 1, overflowY: 'auto', background: '#fff' }}>
                    {children}
                </main>
            </div>
        </div>
    );
};

const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />

                        {/* Normativa */}
                        <Route path="/normativa/gestion" element={<ProtectedRoute><NormativaHome /></ProtectedRoute>} />
                        <Route path="/normativa" element={<ProtectedRoute><NormaActualizacion /></ProtectedRoute>} />
                        <Route path="/normativa/aplicable" element={<ProtectedRoute><NormativaAplicable /></ProtectedRoute>} />
                        <Route path="/normativa/cumplimiento" element={<ProtectedRoute><NormativaCumplimiento /></ProtectedRoute>} />
                        <Route path="/normativa/gantt" element={<ProtectedRoute><NormativaGantt /></ProtectedRoute>} />
                        <Route path="/normativa/:id" element={<ProtectedRoute><NormaFicha /></ProtectedRoute>} />

                        {/* Certificaciones */}
                        <Route path="/certificaciones" element={<ProtectedRoute><CertificacionesList /></ProtectedRoute>} />

                        {/* Permisología */}
                        <Route path="/permisologia" element={<ProtectedRoute><PermisologiaHome /></ProtectedRoute>} />
                        <Route path="/permisologia/pdf" element={<ProtectedRoute><PermisologiaPDF /></ProtectedRoute>} />
                        <Route path="/permisologia/ccmm-docs" element={<ProtectedRoute><PermisologiaCCMMDocs /></ProtectedRoute>} />

                        <Route path="/cumplimiento" element={<ProtectedRoute><CumplimientoEvidencia /></ProtectedRoute>} />

                        {/* Reports & Training */}
                        <Route path="/capacitaciones" element={<ProtectedRoute><CapacitacionesMatrix /></ProtectedRoute>} />
                        <Route path="/reportes" element={<ProtectedRoute><ReportesDashboard /></ProtectedRoute>} />

                        <Route path="/ayuda" element={<ProtectedRoute><div>Ayuda y Soporte</div></ProtectedRoute>} />
                        <Route path="/infas" element={<ProtectedRoute><InfaList /></ProtectedRoute>} />
                        <Route path="/procedimientos" element={<ProtectedRoute><ProcedimientoList /></ProtectedRoute>} />
                        <Route path="/auditorias" element={<ProtectedRoute><AuditoriaList /></ProtectedRoute>} />
                        <Route path="/notificaciones" element={<ProtectedRoute><NotificationList /></ProtectedRoute>} />
                        <Route path="/bitacora" element={<ProtectedRoute><BitacoraList /></ProtectedRoute>} />
                    </Routes>
                </BrowserRouter>
            </AuthProvider>
        </QueryClientProvider>
    );
};

export default App;
