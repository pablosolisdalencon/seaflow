const { Normativa, Articulo } = require('../database/models');

exports.getAll = async (req, res) => {
    try {
        const normativas = await Normativa.findAll({
            include: [{ model: Articulo }]
        });
        res.send(normativas);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.getById = async (req, res) => {
    try {
        const normativa = await Normativa.findByPk(req.params.id, {
            include: [{ model: Articulo }]
        });
        if (!normativa) return res.status(404).send({ error: 'Not found' });
        res.send(normativa);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};
