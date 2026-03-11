const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const normativaController = require('../controllers/normativaController');
const permisologiaController = require('../controllers/permisologiaController');
const concesionController = require('../controllers/concesionController');
const notificacionController = require('../controllers/notificacionController');
const infaController = require('../controllers/infaController');
const procedimientoController = require('../controllers/procedimientoController');
const bitacoraController = require('../controllers/bitacoraController');
const auditoriaController = require('../controllers/auditoriaController');
const reporteController = require('../controllers/reporteController');
const certificacionController = require('../controllers/certificacionController');
const procedimientoController = require('../controllers/procedimientoController');
const capacitacionController = require('../controllers/capacitacionController');
const auth = require('../middleware/auth');

// Public routes
router.post('/auth/login', authController.login);

// Protected routes
router.get('/auth/me', auth, authController.getMe);
router.get('/normas', auth, normativaController.getAll);
router.get('/normas/:id', auth, normativaController.getById);

// Sprint 2 - Permisología & Concesiones
router.get('/permisologia/tierra', auth, permisologiaController.getAll);
router.post('/permisologia/tierra', auth, permisologiaController.create);
router.put('/permisologia/tierra/:id', auth, permisologiaController.update);

router.get('/concesiones/acuicultura', auth, concesionController.getAllAcuicultura);
router.get('/concesiones/maritima', auth, concesionController.getAllMaritima);
router.post('/concesiones/acuicultura', auth, concesionController.createAcuicultura);
router.post('/concesiones/maritima', auth, concesionController.createMaritima);

router.get('/notificaciones', auth, notificacionController.getMyNotifications);
router.put('/notificaciones/:id/read', auth, notificacionController.markAsRead);

// Sprint 5 - Certificaciones
router.get('/certificaciones', auth, certificacionController.getAll);
router.get('/certificaciones/:id', auth, certificacionController.getById);
router.post('/certificaciones', auth, certificacionController.create);
router.put('/certificaciones/:id', auth, certificacionController.update);

// Sprint 7 - Procedimientos & Capacitaciones
router.get('/procedimientos', auth, procedimientoController.getAll);
router.get('/procedimientos/:id', auth, procedimientoController.getById);
router.post('/procedimientos', auth, procedimientoController.create);
router.put('/procedimientos/:id', auth, procedimientoController.update);

router.get('/capacitaciones', auth, capacitacionController.getAll);
router.get('/capacitaciones/matrix', auth, capacitacionController.getMatrix);
router.post('/capacitaciones/asistencia', auth, capacitacionController.recordAttendance);

// Sprint 8 - Dashboards
router.get('/reportes/dashboard-kpis', auth, reporteController.getKPIData);

// Sprint 3 - INFAS & Procedimientos
router.get('/infas', auth, infaController.getAll);
router.get('/infas/area/:areaId', auth, infaController.getByArea);
router.post('/infas', auth, infaController.create);

router.get('/procedimientos', auth, procedimientoController.getAll);
router.post('/procedimientos', auth, procedimientoController.create);
router.put('/procedimientos/:id', auth, procedimientoController.update);

router.get('/bitacora/actualizaciones', auth, bitacoraController.getAll); // Existing
router.get('/bitacora/cartas', auth, bitacoraController.getCartas);
router.post('/bitacora/cartas', auth, bitacoraController.createCarta);
router.get('/bitacora/actividades', auth, bitacoraController.getActividades);
router.post('/bitacora/actividades', auth, bitacoraController.createActividad);

// Sprint 4 - Auditorías & Reportes
router.get('/auditorias', auth, auditoriaController.getAll);
router.post('/auditorias', auth, auditoriaController.create);
router.post('/auditorias/:auditoriaId/hallazgos', auth, auditoriaController.addHallazgo);
router.post('/hallazgos/:hallazgoId/compromisos', auth, auditoriaController.addCompromiso);

router.get('/reportes', auth, reporteController.getAll);
router.post('/reportes', auth, reporteController.create);
router.put('/reportes/:id/status', auth, reporteController.updateStatus);

module.exports = router;
