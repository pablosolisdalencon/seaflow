// IEEE Trace: [REQ-REPT-01] | [US-REP-01]
const { ReporteExterno, Area } = require('../database/models');

exports.getAll = async (req, res) => {
    try {
        const data = await ReporteExterno.findAll({ include: [Area], order: [['submission_date', 'DESC']] });
        res.json(data);
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
