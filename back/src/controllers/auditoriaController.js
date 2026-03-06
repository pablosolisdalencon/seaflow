// IEEE Trace: [REQ-REPT-01] | [US-AUD-01]
const { Auditoria, Hallazgo, Compromiso, Area } = require('../database/models');

exports.getAll = async (req, res) => {
    try {
        const data = await Auditoria.findAll({
            include: [Area, { model: Hallazgo, include: [Compromiso] }],
            order: [['date', 'DESC']]
        });
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.create = async (req, res) => {
    try {
        const newItem = await Auditoria.create(req.body);
        res.status(201).json(newItem);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.addHallazgo = async (req, res) => {
    try {
        const newItem = await Hallazgo.create({
            ...req.body,
            auditoria_id: req.params.auditoriaId
        });
        res.status(201).json(newItem);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.addCompromiso = async (req, res) => {
    try {
        const newItem = await Compromiso.create({
            ...req.body,
            hallazgo_id: req.params.hallazgoId
        });
        res.status(201).json(newItem);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
