// IEEE Trace: [REQ-PERM-01] | [US-201]
const { PermisologiaTierra, Area } = require('../database/models');

exports.getAll = async (req, res) => {
    try {
        const data = await PermisologiaTierra.findAll({ include: [Area] });
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.create = async (req, res) => {
    try {
        const newItem = await PermisologiaTierra.create(req.body);
        res.status(201).json(newItem);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.update = async (req, res) => {
    try {
        const item = await PermisologiaTierra.findByPk(req.params.id);
        if (!item) return res.status(404).json({ error: 'Not found' });
        await item.update(req.body);
        res.json(item);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
