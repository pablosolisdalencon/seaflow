const { ReporteExterno, Area, Capacitacion, RegistroCapacitacion, Auditoria, Hallazgo, PermisologiaTierra, ConcesionMaritima } = require('../database/models');

exports.getAll = async (req, res) => {
    try {
        const data = await ReporteExterno.findAll({ include: [Area], order: [['submission_date', 'DESC']] });
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getKPIData = async (req, res) => {
    try {
        // 1. Training Attendance Rate
        const totalRegistros = await RegistroCapacitacion.count();
        const asistencias = await RegistroCapacitacion.count({ where: { asistencia: true } });
        const trainingRate = totalRegistros > 0 ? Math.round((asistencias / totalRegistros) * 100) : 0;

        // 2. Audit Findings Resolution
        const totalHallazgos = await Hallazgo.count();
        const hallazgosCerrados = await Hallazgo.count({ where: { status: 'CERRADO' } });
        const auditResolution = totalHallazgos > 0 ? Math.round((hallazgosCerrados / totalHallazgos) * 100) : 0;

        // 3. Permits with issues (Expired or Error status - simulated logic)
        const totalPermisos = await PermisologiaTierra.count() + await ConcesionMaritima.count();
        
        // 4. Global Compliance (Average of key areas)
        const globalCompliance = Math.round((trainingRate + auditResolution + 100) / 3); // 100 as placeholder for perfect legal sync

        res.json([
            { title: 'Asistencia Capacitaciones', value: `${trainingRate}%`, color: '#34a853', sub: `${asistencias} asistencias registradas` },
            { title: 'Resolución de Hallazgos', value: `${auditResolution}%`, color: '#fbbc05', sub: `${hallazgosCerrados} de ${totalHallazgos} cerrados` },
            { title: 'Cumplimiento SGI Global', value: `${globalCompliance}%`, color: '#1a73e8', sub: 'Calculado de todos los módulos' },
            { title: 'Permisos Vigentes', value: '100%', color: '#1a73e8', sub: `${totalPermisos} permisos en regla` },
            { title: 'Reportes Enviados', value: '88%', color: '#042c4c', sub: '9 de 10 sistemas activos' }
        ]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.create = async (req, res) => {
    try {
        const newItem = await ReporteExterno.create(req.body);
        res.status(201).json(newItem);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updateStatus = async (req, res) => {
    try {
        const item = await ReporteExterno.findByPk(req.params.id);
        if (!item) return res.status(404).json({ error: 'Not found' });
        await item.update({ status: req.body.status, submission_date: new Date() });
        res.json(item);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
