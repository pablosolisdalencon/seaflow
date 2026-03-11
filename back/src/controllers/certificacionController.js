const { Certificacion, RequisitoCertificacion } = require('../database/models');

exports.getAll = async (req, res) => {
    try {
        const certificaciones = await Certificacion.findAll({
            include: [{ model: RequisitoCertificacion }]
        });
        res.json(certificaciones);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getById = async (req, res) => {
    try {
        const certificacion = await Certificacion.findByPk(req.params.id, {
            include: [{ model: RequisitoCertificacion }]
        });
        if (!certificacion) return res.status(404).json({ message: 'Certificación no encontrada' });
        res.json(certificacion);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.create = async (req, res) => {
    try {
        const certificacion = await Certificacion.create(req.body);
        res.status(201).json(certificacion);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.update = async (req, res) => {
    try {
        const certificacion = await Certificacion.findByPk(req.params.id);
        if (!certificacion) return res.status(404).json({ message: 'Certificación no encontrada' });
        await certificacion.update(req.body);
        res.json(certificacion);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
