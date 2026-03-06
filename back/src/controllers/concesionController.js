// IEEE Trace: [REQ-PERM-01] | [US-202] | [US-203]
const { ConcesionAcuicultura, ConcesionMaritima, Area } = require('../database/models');

exports.getAllAcuicultura = async (req, res) => {
    try {
        const data = await ConcesionAcuicultura.findAll({ include: [Area] });
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllMaritima = async (req, res) => {
    try {
        const data = await ConcesionMaritima.findAll({ include: [Area] });
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createAcuicultura = async (req, res) => {
    try {
        const newItem = await ConcesionAcuicultura.create(req.body);
        res.status(201).json(newItem);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.createMaritima = async (req, res) => {
    try {
        const newItem = await ConcesionMaritima.create(req.body);
        res.status(201).json(newItem);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
