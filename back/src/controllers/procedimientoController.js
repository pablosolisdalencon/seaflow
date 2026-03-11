const { Procedimiento, Area } = require('../database/models');

exports.getAll = async (req, res) => {
    try {
        const procedimientos = await Procedimiento.findAll({
            include: [{ model: Area }]
        });
        res.json(procedimientos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getById = async (req, res) => {
    try {
        const procedimiento = await Procedimiento.findByPk(req.params.id, {
            include: [{ model: Area }]
        });
        if (!procedimiento) return res.status(404).json({ message: 'Procedimiento no encontrado' });
        res.json(procedimiento);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.create = async (req, res) => {
    try {
        const procedimiento = await Procedimiento.create(req.body);
        res.status(201).json(procedimiento);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.update = async (req, res) => {
    try {
        const procedimiento = await Procedimiento.findByPk(req.params.id);
        if (!procedimiento) return res.status(404).json({ message: 'Procedimiento no encontrado' });
        await procedimiento.update(req.body);
        res.json(procedimiento);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
