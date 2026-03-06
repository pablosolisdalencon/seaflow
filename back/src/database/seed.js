const bcrypt = require('bcryptjs');
const { sequelize, Role, User, Area, Normativa, Articulo, PermisologiaTierra, ConcesionAcuicultura, ConcesionMaritima, Notificacion, Infa, Procedimiento, BitacoraActualizacion, Auditoria, Hallazgo, Compromiso, ReporteExterno } = require('./models');

async function seed() {
    try {
        await sequelize.sync({ force: true });
        console.log('Database synced (force: true) - PARKO Audit Protocol 2026.03');

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
            { area_id: areas[0].id, document_name: 'Título Dominio Vigente Fojas 45', number: '2024-001A', issue_date: '2024-01-01', expiry_date: '2034-01-01' },
            { area_id: areas[0].id, document_name: 'Permiso Edificación Galpón Taller', number: 'PE-9988', issue_date: '2023-05-15' },
            { area_id: areas[1].id, document_name: 'Concesión de Suelo Fiscal', number: 'SF-1020', issue_date: '2022-10-10', expiry_date: '2027-10-10' }
        ]);

        await ConcesionAcuicultura.bulkCreate([
            { area_id: areas[0].id, codigo_centro: '103421', latitud: -42.12, longitud: -73.45, res_ex_number: 'Res. 1400', expiry_date: '2029-01-01' },
            { area_id: areas[1].id, codigo_centro: '110544', latitud: -42.67, longitud: -73.12, res_ex_number: 'Res. 2500', expiry_date: '2028-06-30' }
        ]);

        await ConcesionMaritima.bulkCreate([
            { area_id: areas[0].id, decreto_number: 'DS 123/2020', expiry_date: '2030-12-31', status_tramite: 'Vigente' },
            { area_id: areas[2].id, decreto_number: 'DS 456/2021', expiry_date: '2026-03-01', status_tramite: 'En Renovación' }
        ]);

        // 6. INFAs (Environmental History)
        await Infa.bulkCreate([
            { area_id: areas[0].id, report_date: '2023-11-01', ph: 7.8, redox: 120, mo: 5.2, status: 'AEROBICA' },
            { area_id: areas[0].id, report_date: '2024-01-15', ph: 7.4, redox: -150, mo: 9.1, status: 'ANAEROBICA' },
            { area_id: areas[1].id, report_date: '2024-01-20', ph: 8.0, redox: 200, mo: 3.5, status: 'AEROBICA' }
        ]);

        // 7. Auditorías, Hallazgos & Compromisos (The "Core" operational flow)
        const auditAnual = await Auditoria.create({
            area_id: areas[0].id,
            user_id: users[2].id,
            type: 'EXTERNA',
            date: '2024-02-15',
            auditor_name: 'Inspección Sanitaria Regional',
            status: 'FINALIZADA'
        });

        const finding1 = await Hallazgo.create({
            auditoria_id: auditAnual.id,
            description: 'Acopio de redes en sector no habilitado.',
            severity: 'MENOR',
            status: 'CERRADO'
        });

        await Compromiso.create({
            hallazgo_id: finding1.id,
            action_plan: 'Traslado de redes a bodega de residuos.',
            due_date: '2024-02-28',
            status: 'COMPLETADO'
        });

        const auditProjected = await Auditoria.create({
            area_id: areas[1].id,
            type: 'INTERNA',
            date: '2024-04-10',
            auditor_name: 'Marcos Ambiental',
            status: 'PLANIFICADA'
        });

        // 8. Procedimientos & Bitácora
        await Procedimiento.bulkCreate([
            { code: 'PR-GA-01', name: 'Procedimiento Gestión de Accidentes', version: 'v3.1', last_update: '2024-01-10' },
            { code: 'IN-MA-05', name: 'Instructivo Medición Oxígeno Disuelto', version: 'v1.0', last_update: '2023-12-15' },
            { code: 'PR-RS-10', name: 'Plan de Manejo Residuos Peligrosos', version: 'v2.4', last_update: '2024-02-28' }
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

        console.log('--- SEEDER PERFORMANCE REPORT ---');
        console.log(`- Roles: 4 created`);
        console.log(`- Users: 4 created (Pass: User123*)`);
        console.log(`- Areas: 3 created (Caucahue, Pullao, Chequian)`);
        console.log(`- Operational Data: Normas(3), INFAs(3), Docs(6), Audits(2)`);
        console.log('Mission "Comprehensive Seeder" Accomplished.');
        process.exit(0);
    } catch (error) {
        console.error('CRITICAL SEED ERROR:', error);
        process.exit(1);
    }
}

seed();
