import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, FileSearch, Download, Edit3 } from 'lucide-react';
import { usePermisologia, useConcesionesAcuicultura, useConcesionesMaritima } from '../../hooks/usePermisologia';

const PermisologiaHome = () => {
    const navigate = useNavigate();
    const [activeArea, setActiveArea] = React.useState('Caucahue');
    const [activeSub, setActiveSub] = React.useState('Tierra');

    const areas = ['Caucahue', 'Chequian', 'Pullao'];
    const subCategories = ['Tierra', 'CC.AA.', 'CC.MM.'];

    const { getAll: permisosTierra } = usePermisologia();
    const { data: ccaaData, isLoading: loadingCCAA } = useConcesionesAcuicultura();
    const { data: ccmmData, isLoading: loadingCCMM } = useConcesionesMaritima();

    // If activeSub is 'CC.AA.', show the Map and detail view like Image 1
    if (activeSub === 'CC.AA.') {
        const ccaaDocs = [
            { ent: 'SSFFAA', doc: 'Otorga CCAA 1222/2005' },
            { ent: 'SSFFAA', doc: 'Transfiere CCAA 1099/2009' },
            { ent: 'SSFFAA', doc: 'Cartográfica FIP 1099/2009' },
            { ent: 'SSFFAA', doc: 'Planos' },
            { ent: 'Sernapesca', doc: 'PT N° Pert 220103032' },
            { ent: 'Sernapesca', doc: 'RNA Folio 21212' },
            { ent: 'Subpesca', doc: 'Aprueba PT Pendiente' },
            { ent: 'Subpesca', doc: 'Cartográfica FIP 2259/2006' },
        ];

        return (
            <div style={{ padding: '2rem' }}>
                <div style={{ display: 'flex', border: '2px solid #000', borderRadius: '4px', overflow: 'hidden', marginBottom: '2rem', width: 'fit-content' }}>
                    {areas.map(a => (
                        <div key={a} onClick={() => setActiveArea(a)} style={{ padding: '0.4rem 2rem', background: activeArea === a ? '#c2e7ff' : '#fff', borderRight: '2px solid #000', fontWeight: 'bold', cursor: 'pointer' }}>{a}</div>
                    ))}
                </div>

                <div style={{ display: 'flex', gap: '2rem' }}>
                    <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', border: '2px solid #000', padding: '0.25rem 0.5rem', width: '250px', marginBottom: '1.5rem' }}>
                            <FileSearch size={16} />
                            <input type="text" placeholder="buscar concesion" style={{ border: 'none', outline: 'none', fontSize: '0.9rem', width: '100%' }} />
                        </div>

                        <div style={{ border: '2px solid #000', borderRadius: '4px', overflow: 'hidden' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.75rem' }}>
                                <thead style={{ background: '#e8eaed', borderBottom: '2px solid #000' }}>
                                    <tr>
                                        <th style={{ padding: '0.5rem', borderRight: '1px solid #000', textAlign: 'left' }}>Entidad</th>
                                        <th style={{ padding: '0.5rem', borderRight: '1px solid #000', textAlign: 'left' }}>Documentación</th>
                                        <th style={{ padding: '0.5rem' }}></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {ccaaData?.filter(d => d.Area?.name === activeArea).map((d, idx) => (
                                        <tr key={idx} style={{ borderBottom: '1px solid #ccc', background: idx % 2 === 0 ? '#fff' : '#f1f3f4' }}>
                                            <td style={{ padding: '0.5rem', borderRight: '1px solid #000' }}>{d.entity || 'Acuicultura'}</td>
                                            <td style={{ padding: '0.5rem', borderRight: '1px solid #000' }}>Cód: {d.code_centro} - {d.species}</td>
                                            <td style={{ padding: '0.5rem', display: 'flex', gap: '0.25rem', justifyContent: 'center' }}>
                                                <div onClick={() => navigate('/permisologia/pdf')} style={{ border: '1px solid #042c4c', color: '#042c4c', padding: '2px', cursor: 'pointer' }}><FileSearch size={14} /></div>
                                                <div style={{ border: '1px solid #042c4c', color: '#042c4c', padding: '2px', cursor: 'pointer' }}><Download size={14} /></div>
                                                <div style={{ border: '1px solid #042c4c', color: '#042c4c', padding: '2px', cursor: 'pointer' }}><Edit3 size={14} /></div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <button style={{ marginTop: '1rem', background: '#042c4c', color: '#fff', border: '2px solid #000', padding: '0.5rem 1.5rem', borderRadius: '4px', fontWeight: 'bold' }}>Descargar todo</button>
                    </div>

                    <div style={{ width: '350px' }}>
                        <div style={{ border: '2px solid #000', marginBottom: '1rem', height: '250px', background: 'url(https://i.ibb.co/NpKwv6v/map-placeholder.png)', backgroundSize: 'cover' }}></div>
                        <div style={{ border: '2px solid #000', borderRadius: '4px', overflow: 'hidden' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.75rem' }}>
                                <tbody>
                                    {[
                                        ['Cód. centro', '103571'],
                                        ['Especies', 'cholga - chorito - choro'],
                                        ['Ubicación geográfica', 'Canal Caucahue al suroeste de bajo Caucahue'],
                                        ['Tipo concesión', 'agua y fondo'],
                                        ['Superficie', '17.73 ha'],
                                        ['Codigo Área PSMB', '10419'],
                                        ['PT', '3.000 ton']
                                    ].map(([label, val], idx) => (
                                        <tr key={idx} style={{ borderBottom: '1px solid #ccc' }}>
                                            <td style={{ padding: '0.5rem', background: '#f8f9fa', fontWeight: 'bold', borderRight: '1px solid #000', width: '40%' }}>{label}</td>
                                            <td style={{ padding: '0.5rem' }}>{val}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // CC.MM. View (Image 3)
    if (activeSub === 'CC.MM.') {
        const ccmmDocs = [
            { solicitante: 'Playa rampa de hormigón', inicio: '05-08-2015', num: '34721', estado: 'Otorgada', res: 'D.S. 58 del 25-02-2020', vigencia: '31-12-2024', objeto: 'Amparar una rampa de hormigón para el acceso de camiones de carga y descarga de productos del mar' },
            { solicitante: 'Boyas de amarre para naves', inicio: '11-10-2022', num: 'CM-00114-2022', estado: 'En tramite', res: '', vigencia: '', objeto: 'Instalar 5 Boyas de Amarre de 200 lt para el amarre de embarcaciones menores y plataformas de cosecha menores a 50 TRG.' },
        ];

        return (
            <div style={{ padding: '2rem' }}>
                <div style={{ display: 'flex', border: '2px solid #000', borderRadius: '4px', overflow: 'hidden', marginBottom: '2rem', width: 'fit-content' }}>
                    {areas.map(a => (
                        <div key={a} onClick={() => setActiveArea(a)} style={{ padding: '0.4rem 2rem', background: activeArea === a ? '#c2e7ff' : '#fff', borderRight: '2px solid #000', fontWeight: 'bold', cursor: 'pointer' }}>{a}</div>
                    ))}
                </div>

                <h4 style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>CC.MM.</h4>
                <div style={{ border: '2px solid #000', borderRadius: '4px', overflow: 'hidden' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.75rem' }}>
                        <thead style={{ background: '#e8eaed', borderBottom: '2px solid #000' }}>
                            <tr>
                                <th style={{ padding: '0.5rem', borderRight: '1px solid #000', textAlign: 'left' }}>Solicitado</th>
                                <th style={{ padding: '0.5rem', borderRight: '1px solid #000', textAlign: 'left' }}>Inicio tramite</th>
                                <th style={{ padding: '0.5rem', borderRight: '1px solid #000', textAlign: 'left' }}>N° tramite</th>
                                <th style={{ padding: '0.5rem', borderRight: '1px solid #000', textAlign: 'left' }}>Estado</th>
                                <th style={{ padding: '0.5rem', borderRight: '1px solid #000', textAlign: 'left' }}>Resolución</th>
                                <th style={{ padding: '0.5rem', borderRight: '1px solid #000', textAlign: 'left' }}>Vigencia</th>
                                <th style={{ padding: '0.5rem', textAlign: 'left' }}>Objeto</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ccmmData?.filter(d => d.Area?.name === activeArea).map((d, idx) => (
                                <tr key={idx} style={{ borderBottom: '1px solid #ccc' }}>
                                    <td onClick={() => navigate('/permisologia/ccmm-docs')} style={{ padding: '0.5rem', borderRight: '1px solid #000', color: '#1a73e8', cursor: 'pointer', textDecoration: 'underline' }}>{d.status_tramite || 'Solicitud'}</td>
                                    <td style={{ padding: '0.5rem', borderRight: '1px solid #000' }}>{d.createdAt?.split('T')[0]}</td>
                                    <td style={{ padding: '0.5rem', borderRight: '1px solid #000' }}>{d.decreto_number || 'N/A'}</td>
                                    <td style={{ padding: '0.5rem', borderRight: '1px solid #000' }}>{d.status_tramite}</td>
                                    <td style={{ padding: '0.5rem', borderRight: '1px solid #000' }}>{d.decreto_number}</td>
                                    <td style={{ padding: '0.5rem', borderRight: '1px solid #000' }}>{d.expiry_date}</td>
                                    <td style={{ padding: '0.5rem' }}>Concesión Marítima {activeArea}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

    // If activeSub is 'Tierra', show the detail table like Image 4
    if (activeSub === 'Tierra') {
        const docs = [
            { doc: 'Inscripción en el Conservador de Bienes Raíces', num: '1125', date: '16-09-2008', detail: 'Fojas 1227 área 2 Ha. Rol 188-32 Sector Chohen Comuna de Quemchi' },
            { doc: 'Informe de FActibilidad para Construcciones IFC (ex CUS)', num: '862', date: '12-04-2017', detail: 'Res. N° 1282 17-10-2017 modifica la 862/2017 dejando la superficie del IFCen 0.3887 ha según Rol N° 188-32' },
            { doc: 'Res. Agua Potable', num: '303', date: '12-09-2016', detail: '' },
            { doc: 'Res. Alcantarillado', num: '303', date: '12-09-2016', detail: '' },
            { doc: 'Res. Bodega de RESPEL', num: '02', date: '01-30-2014', detail: '' },
            { doc: 'Recepción Municipal de obras', num: '05', date: '28-03-2022', detail: '' },
            { doc: 'Gas TE1', num: '1238999', date: '14-07-2015', detail: 'TE1 código verificador: 48615. Instalación Eléctrica del gas' },
            { doc: 'Gas Certificado de aprobación', num: 'ES-2100', date: '17-11-2022', detail: 'Vigente al: 28-01-2025' },
            { doc: 'Gas TC8', num: '296854', date: '28-01-2015', detail: 'Código de verificación 461932. Próxima Inspección: 28-01-2025' },
            { doc: 'Gas Declaración', num: '44', date: '28-07-2015', detail: 'Declaración estación surtidora GLP' },
        ];

        return (
            <div style={{ padding: '2rem' }}>
                {/* Area Tabs */}
                <div style={{ display: 'flex', border: '2px solid #000', borderRadius: '4px', overflow: 'hidden', marginBottom: '2rem', width: 'fit-content' }}>
                    {areas.map(a => (
                        <div
                            key={a}
                            onClick={() => setActiveArea(a)}
                            style={{
                                padding: '0.4rem 2rem',
                                background: activeArea === a ? '#c2e7ff' : '#fff',
                                borderRight: '2px solid #000',
                                fontWeight: 'bold',
                                cursor: 'pointer'
                            }}
                        >
                            {a}
                        </div>
                    ))}
                </div>

                <h3 style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>Base {activeArea}</h3>

                <div style={{ border: '2px solid #000', borderRadius: '4px', overflow: 'hidden', position: 'relative' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.75rem' }}>
                        <thead style={{ background: '#e8eaed', borderBottom: '2px solid #000' }}>
                            <tr>
                                <th style={{ padding: '0.5rem', borderRight: '1px solid #000', textAlign: 'left' }}>Documento</th>
                                <th style={{ padding: '0.5rem', borderRight: '1px solid #000', textAlign: 'left', width: '80px' }}>Número</th>
                                <th style={{ padding: '0.5rem', borderRight: '1px solid #000', textAlign: 'left', width: '80px' }}>Fecha</th>
                                <th style={{ padding: '0.5rem', borderRight: '1px solid #000', textAlign: 'left' }}>Detalle</th>
                                <th style={{ padding: '0.5rem', width: '100px' }}></th>
                            </tr>
                        </thead>
                        <tbody>
                            {permisosTierra.data?.filter(d => d.Area?.name === activeArea).map((d, idx) => (
                                <tr key={idx} style={{ borderBottom: '1px solid #ccc', background: idx % 2 === 0 ? '#fff' : '#f1f3f4' }}>
                                    <td style={{ padding: '0.5rem', borderRight: '1px solid #000' }}>{d.document_name}</td>
                                    <td style={{ padding: '0.5rem', borderRight: '1px solid #000' }}>{d.number || 'N/A'}</td>
                                    <td style={{ padding: '0.5rem', borderRight: '1px solid #000' }}>{d.date}</td>
                                    <td style={{ padding: '0.5rem', borderRight: '1px solid #000' }}>{d.detail || 'Sin detalles'}</td>
                                    <td style={{ padding: '0.5rem', display: 'flex', gap: '0.25rem', justifyContent: 'center', height: '100%' }}>
                                        <div onClick={() => navigate('/permisologia/pdf')} style={{ border: '1px solid #042c4c', color: '#042c4c', padding: '2px', cursor: 'pointer' }}><FileSearch size={14} /></div>
                                        <div style={{ border: '1px solid #042c4c', color: '#042c4c', padding: '2px', cursor: 'pointer' }}><Download size={14} /></div>
                                        <div style={{ border: '1px solid #042c4c', color: '#042c4c', padding: '2px', cursor: 'pointer' }}><Edit3 size={14} /></div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginTop: '2rem' }}>
                    <button style={{
                        background: '#042c4c',
                        color: '#fff',
                        border: '2px solid #000',
                        padding: '0.5rem 1.5rem',
                        borderRadius: '4px',
                        fontWeight: 'bold',
                        cursor: 'pointer'
                    }}>
                        Descargar todo
                    </button>

                    <div style={{ position: 'relative' }}>
                        <div style={{
                            background: '#f8d254',
                            padding: '1rem',
                            borderRadius: '4px',
                            width: '200px',
                            fontSize: '0.75rem',
                            boxShadow: '2px 2px 5px rgba(0,0,0,0.1)',
                            borderBottom: '4px solid #e5bc2c'
                        }}>
                            Botones que permiten visualizar, descargar y modificar el archivo (en caso de que este cambie)
                        </div>
                        <div style={{
                            background: '#f8d254',
                            padding: '1rem',
                            borderRadius: '4px',
                            width: '200px',
                            fontSize: '0.75rem',
                            marginTop: '1rem',
                            boxShadow: '2px 2px 5px rgba(0,0,0,0.1)',
                            borderBottom: '4px solid #e5bc2c'
                        }}>
                            Botón para descargar toda la información a la vez
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Default Selection View (Image 3 from P3)
    return (
        <div style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', border: '2px solid #000', borderRadius: '4px', overflow: 'hidden', marginBottom: '2rem', width: 'fit-content' }}>
                {areas.map(a => (
                    <div
                        key={a}
                        onClick={() => setActiveArea(a)}
                        style={{
                            padding: '0.4rem 2rem',
                            background: activeArea === a ? '#c2e7ff' : '#fff',
                            borderRight: '2px solid #000',
                            fontWeight: 'bold',
                            cursor: 'pointer'
                        }}
                    >
                        {a}
                    </div>
                ))}
            </div>

            <div style={{ width: '200px', border: '2px solid #000' }}>
                {subCategories.map(s => (
                    <div
                        key={s}
                        onClick={() => setActiveSub(s)}
                        style={{
                            padding: '0.4rem 1rem',
                            background: activeSub === s ? '#c2e7ff' : '#fff',
                            borderBottom: '1px solid #ccc',
                            cursor: 'pointer',
                            fontSize: '0.9rem'
                        }}
                    >
                        {s}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PermisologiaHome;
