const bcrypt = require('bcryptjs');
const { sequelize, Role, User, Area, Normativa, Articulo, PermisologiaTierra, ConcesionAcuicultura, ConcesionMaritima, Notificacion, Infa, Procedimiento, BitacoraActualizacion, Auditoria, Hallazgo, Compromiso, ReporteExterno, Certificacion, RequisitoCertificacion, Capacitacion, RegistroCapacitacion, Carta, ActividadBitacora } = require('./models');

async function seed() {
    try {
        await sequelize.sync({ force: true });
        console.log('Database synced (force: true) - SGI Seaflow Full MVP 2026.03');

        // ... (previous roles, users, areas etc. stay same)


        // 1. Roles (IEEE Standard Hierarchy)
        const roles = await Role.bulkCreate([
            { name: 'Administrador', description: 'Control total de la infraestructura y privilegios' },
            { name: 'Jefe de Centro', description: 'Responsable operativo de áreas geográficas específicas' },
            { name: 'Auditor Externo', description: 'Perfil de visualización para inspecciones técnicas' },
            { name: 'Medio Ambiente', description: 'Gestión de INFAs, SIDREP y cumplimiento normativo' }
        ]);

        // 2. Users (Multi-role Operation)
        const hashedPassword = await bcrypt.hash('User123*', 10);
        const users = await User.bulkCreate([
            { name: 'Pablo Admin', email: 'admin@seaflow.cl', password_hash: hashedPassword, role_id: roles[0].id },
            { name: 'Carlos Jefe Caucahue', email: 'carlos.jefe@seaflow.cl', password_hash: hashedPassword, role_id: roles[1].id },
            { name: 'Elena Auditora', email: 'elena.auditora@externo.cl', password_hash: hashedPassword, role_id: roles[2].id },
            { name: 'Marcos Ambiental', email: 'marcos.ma@seaflow.cl', password_hash: hashedPassword, role_id: roles[3].id }
        ]);

        // 3. Areas (Operational Distribution)
        const areas = await Area.bulkCreate([
            { name: 'Caucahue', description: 'Centro principal de cultivo' },
            { name: 'Pullao', description: 'Zona de crianza secundaria' },
            { name: 'Chequian', description: 'Base logística y taller' }
        ]);

        // 4. Normativa & Artículos (Compliance Matrix)
        const normas = await Normativa.bulkCreate([
            { name: 'Ley 19.300 sobre Bases Generales del Medio Ambiente', short_name: 'Ley 19.300', entity: 'MMA', thematic: 'General' },
            { name: 'DS 43 Reglamento de Prevención de Contaminación', short_name: 'RESA', entity: 'SUBPESCA', thematic: 'Sanidad' },
            { name: 'DS 40 Reglamento del SEIA', short_name: 'RSEIA', entity: 'SEA', thematic: 'EIA' }
        ]);

        await Articulo.bulkCreate([
            { normativa_id: normas[0].id, number: 'Art. 1 bis', description: 'Responsabilidad por daño ambiental.' },
            { normativa_id: normas[0].id, number: 'Art. 10 P)', description: 'Proyectos en áreas protegidas.' },
            { normativa_id: normas[1].id, number: 'Art. 4', description: 'Distancia mínima entre centros de cultivo.' },
            { normativa_id: normas[1].id, number: 'Art. 59', description: 'Suministro de información técnica trimestral.' }
        ]);

        // 5. Permisología & Concesiones (Full Inventory)
        await PermisologiaTierra.bulkCreate([
            { area_id: areas[0].id, document_name: 'Inscripción en el Conservador de Bienes Raíces', number: '1125', issue_date: '2008-09-16', detail: 'Fojas 1227 área 2 Ha. Rol 188-32 Sector Chohen Comuna de Quemchi', status: 'VIGENTE' },
            { area_id: areas[0].id, document_name: 'Informe de Factibilidad para Construcciones IFC', number: '862', issue_date: '2017-04-12', detail: 'Res. N° 1282 17-10-2017 modifica la 862/2017', status: 'VIGENTE' },
            { area_id: areas[0].id, document_name: 'Res. Agua Potable', number: '303', issue_date: '2016-09-12', detail: 'Suministro Caucahue', status: 'VIGENTE' }
        ]);

        await ConcesionAcuicultura.bulkCreate([
            { area_id: areas[0].id, codigo_centro: '103421', latitud: -42.12, longitud: -73.45, res_ex_number: 'Res. 1400', expiry_date: '2029-01-01' },
            { area_id: areas[1].id, codigo_centro: '110544', latitud: -42.67, longitud: -73.12, res_ex_number: 'Res. 2500', expiry_date: '2028-06-30' }
        ]);

        await ConcesionMaritima.bulkCreate([
            { area_id: areas[0].id, decreto_number: 'DS 58', expiry_date: '2024-12-31', status_tramite: 'Otorgada', solicitado: 'Playa rampa de hormigón', inicio_tramite: '2015-08-05', resolucion: 'D.S. 58 del 25-02-2020', objeto: 'Amparar una rampa de hormigón para el acceso de camiones' },
            { area_id: areas[0].id, decreto_number: 'CM-00114', status_tramite: 'En tramite', solicitado: 'Boyas de amarre para naves', inicio_tramite: '2022-10-11', objeto: 'Instalar 5 Boyas de Amarre de 200 lt' }
        ]);

        // 6. INFAs (Environmental History)
        const infa1 = await Infa.create({ area_id: areas[0].id, report_date: '2023-03-22', ph: 7.4, redox: 93.8, mo: 2.4, status: 'ANAEROBICA' });
        await EstacionInfa.bulkCreate([
            { infa_id: infa1.id, nombre: 'E1', ph: 7.45, redox: 9.7, mo: 2.6 },
            { infa_id: infa1.id, nombre: 'E2', ph: 7.0, redox: -79, mo: 9.5 },
            { infa_id: infa1.id, nombre: 'E3', ph: 7.1, redox: -135, mo: 8.9 },
            { infa_id: infa1.id, nombre: 'E4', ph: 7.2, redox: -134.3, mo: 9.4 }
        ]);

        await Infa.bulkCreate([
            { area_id: areas[0].id, report_date: '2018-05-10', ph: 7.2, redox: 150, mo: 7.4, status: 'AEROBICA' },
            { area_id: areas[0].id, report_date: '2014-08-15', ph: 7.0, redox: 32.2, mo: 7.6, status: 'AEROBICA' },
            { area_id: areas[1].id, report_date: '2024-01-20', ph: 8.0, redox: 200, mo: 3.5, status: 'AEROBICA' }
        ]);

        // 7. Auditorías, Hallazgos & Compromisos (Advanced Types: Interna, Certificaciones, Normativa)
        const auditNorm = await Auditoria.create({
            area_id: areas[0].id,
            user_id: users[2].id,
            type: 'EXTERNA',
            sub_type: 'Normativa',
            date: '2024-02-15',
            auditor_name: 'Inspección Sanitaria Regional',
            status: 'FINALIZADA'
        });

        await Hallazgo.bulkCreate([
            { auditoria_id: auditNorm.id, description: 'Acopio de redes en sector no habilitado.', severity: 'MENOR', status: 'No Cumple', categoria: 'Medio Ambiente' },
            { auditoria_id: auditNorm.id, description: 'Manejo de residuos peligrosos adecuado.', severity: 'N/A', status: 'Cumple', categoria: 'Residuos' }
        ]);

        const auditCert = await Auditoria.create({
            area_id: areas[1].id,
            type: 'EXTERNA',
            sub_type: 'Certificaciones',
            date: '2024-01-10',
            auditor_name: 'BAP Auditor',
            status: 'FINALIZADA'
        });

        await Hallazgo.create({
            auditoria_id: auditCert.id,
            description: 'Falta de registro de inducción en personal nuevo.',
            severity: 'MAYOR',
            status: 'No Cumple',
            categoria: 'Recursos Humanos'
        });

        await Auditoria.create({
            area_id: areas[2].id,
            type: 'INTERNA',
            sub_type: 'Interna',
            date: '2024-04-10',
            auditor_name: 'Elena Auditora',
            status: 'PLANIFICADA'
        });

        // 8. Procedimientos & Bitácora
        await Procedimiento.bulkCreate([
            { code: 'PR-GA-01', name: 'Procedimiento Gestión de Accidentes', version: 'v3.1', last_update: '2024-01-10', area_id: areas[0].id, file_path: '/uploads/procedimientos/PR-GA-01.pdf' },
            { code: 'IN-MA-05', name: 'Instructivo Medición Oxígeno Disuelto', version: 'v1.0', last_update: '2023-12-15', area_id: areas[0].id, file_path: '/uploads/procedimientos/IN-MA-05.pdf' },
            { code: 'PR-RS-10', name: 'Plan de Manejo Residuos Peligrosos', version: 'v2.4', last_update: '2024-02-28', area_id: areas[1].id, file_path: '/uploads/procedimientos/PR-RS-10.pdf' }
        ]);

        await BitacoraActualizacion.bulkCreate([
            { user_id: users[0].id, action: 'Sincronización masiva de normativas SUBPESCA', target_entity: 'Normativa' },
            { user_id: users[1].id, action: 'Carga de evidencia para Auditoría Sanitaria', target_entity: 'Auditoria' },
            { user_id: users[3].id, action: 'Error corregido en coordenadas CCAA Chequian', target_entity: 'ConcesionAcuicultura' }
        ]);

        // 9. Notificaciones (User Experience)
        await Notificacion.bulkCreate([
            { user_id: users[0].id, message: '¡Atención! Auditoría Interna programada para el 10 de Abril.', read: false },
            { user_id: users[1].id, message: 'La concesión DS 456/2021 vence en menos de 12 meses.', read: false },
            { user_id: users[3].id, message: 'Nueva actualización de Ley 19.300 disponible.', read: true }
        ]);

        // 10. Reportes Externos (Compliance Cycles)
        await ReporteExterno.bulkCreate([
            { area_id: areas[0].id, system: 'SIDREP', period: 'ENE-2024', status: 'ENVIADO', submission_date: '2024-01-28' },
            { area_id: areas[1].id, system: 'SINADER', period: '2024-Q1', status: 'PENDIENTE' },
            { area_id: areas[0].id, system: 'RETC', period: 'ANUAL-2023', status: 'CORREGIDO', submission_date: '2024-02-05' }
        ]);

        // 11. Certificaciones (Sprint 5)
        const certBAP = await Certificacion.create({
            tipo: 'BAP',
            nombre_corto: 'Derechos de propiedad y cumplimiento normativo',
            descripcion: 'Estándar BAP para centros de cultivo',
            estado: 'Vigente'
        });

        await RequisitoCertificacion.bulkCreate([
            { certificacion_id: certBAP.id, numero: '1.1', descripcion: 'Documentos vigentes que acrediten el uso legal de la tierra.', evidencia_requerida: 'Título de dominio' },
            { certificacion_id: certBAP.id, numero: '1.2', descripcion: 'Licencias comerciales y de operación.', evidencia_requerida: 'Patente comercial' }
        ]);

        const certASC = await Certificacion.create({
            tipo: 'ASC',
            nombre_corto: 'Gestión Ambiental ASC',
            descripcion: 'Estándar ASC para acuicultura responsable',
            estado: 'En Proceso'
        });

        await RequisitoCertificacion.bulkCreate([
            { certificacion_id: certASC.id, numero: '2.1', descripcion: 'Evaluación de impacto social.', evidencia_requerida: 'Informe de participación ciudadana' }
        ]);

        // 12. Capacitaciones (Sprint 7)
        const cap1 = await Capacitacion.create({
            nombre: 'Seguridad en Centros de Cultivo',
            descripcion: 'Capacitación obligatoria sobre prevención de riesgos',
            fecha_programada: '2024-03-20',
            instructor: 'Prevencionista Risk',
            tipo: 'Interna'
        });

        const cap2 = await Capacitacion.create({
            nombre: 'Muestreo de Oxígeno y Parámetros',
            descripcion: 'Entrenamiento técnico para INFAs',
            fecha_programada: '2024-03-22',
            instructor: 'Lab BioAqua',
            tipo: 'Externa'
        });

        await RegistroCapacitacion.bulkCreate([
            { user_id: users[1].id, capacitacion_id: cap1.id, asistencia: true, nota: 6.5 },
            { user_id: users[3].id, capacitacion_id: cap1.id, asistencia: true, nota: 7.0 },
            { user_id: users[1].id, capacitacion_id: cap2.id, asistencia: false }
        ]);

        // 13. Bitácora: Cartas (Sprint 9)
        await Carta.bulkCreate([
            { correlativo: '01/2024', referencia: 'Solicitud de rectificación RCA n°2022100013', remitente: 'Nicolas Guzman', destinatario: 'Sergio Sanhueza Triviño', entidad: 'SEA', estado: 'Resuelta', responsable: 'Jefe MA', observaciones: 'Resuelta vía oficina de partes.' },
            { correlativo: '02/2024', referencia: 'Téngase presente en tramitación de recurso de reposición', remitente: 'Nicolas Guzman', destinatario: 'Galo Eidelstein Silber', entidad: 'SSFFAA', estado: 'Pendiente', responsable: 'Gerencia General' },
            { correlativo: '03/2024', referencia: 'Informa incumplimiento menor', remitente: 'Paulina Rojas', destinatario: 'CCS', entidad: 'SUBPESCA', estado: 'Resuelta' }
        ]);

        // 14. Bitácora: Actividades (Sprint 9)
        await ActividadBitacora.bulkCreate([
            { numero_actividad: '01', actividad: 'Movimiento líneas dentro de concesión', responsable: 'JAP', categoria: 'INFA', resumen_actividad: 'Se reubicaron las líneas de fondeo en el sector norte.' },
            { numero_actividad: '02', actividad: 'Registro de limpieza de máquinas de cosecha', responsable: 'JCK', categoria: 'Certificación BAP' },
            { numero_actividad: '03', actividad: 'Filmación submarina KE7', responsable: 'JAK', categoria: 'CCAA' }
        ]);

        console.log('--- SEEDER PERFORMANCE REPORT ---');
        console.log(`- Roles: 4 created`);
        console.log(`- Users: 4 created (Pass: User123*)`);
        console.log(`- Areas: 3 created (Caucahue, Pullao, Chequian)`);
        console.log(`- Operational Data: Normas(3), INFAs(3), Docs(6), Audits(3)`);
        console.log(`- Bitácora Data: Cartas(3), Actividades(3)`);
        console.log('Mission "Comprehensive Seeder" Accomplished.');
        process.exit(0);
    } catch (error) {
        console.error('CRITICAL SEED ERROR:', error);
        process.exit(1);
    }
}

seed();
