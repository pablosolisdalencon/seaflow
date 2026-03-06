// IEEE Trace: [REQ-PROC-01] | [US-401]
const { Procedimiento } = require('../database/models');

exports.getAll = async (req, res) => {
    try {
        const data = await Procedimiento.findAll({ order: [['code', 'ASC']] });
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.create = async (req, res) => {
    try {
        const newItem = await Procedimiento.create(req.body);
        res.status(201).json(newItem);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.update = async (req, res) => {
    try {
        const item = await Procedimiento.findByPk(req.params.id);
        if (!item) return res.status(404).json({ error: 'Not found' });
        await item.update(req.body);
        res.json(item);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
