const { Infa, Area, EstacionInfa } = require('../database/models');

exports.getAll = async (req, res) => {
    try {
        const data = await Infa.findAll({ 
            include: [Area, EstacionInfa], 
            order: [['report_date', 'DESC']] 
        });
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.create = async (req, res) => {
    try {
        const newItem = await Infa.create(req.body);
        res.status(201).json(newItem);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getByArea = async (req, res) => {
    try {
        const data = await Infa.findAll({
            where: { area_id: req.params.areaId },
            include: [Area, EstacionInfa],
            order: [['report_date', 'DESC']]
        });
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
