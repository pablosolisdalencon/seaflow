// IEEE Trace: [REQ-LOGS-01] | [US-402]
const { BitacoraActualizacion, User } = require('../database/models');

exports.getAll = async (req, res) => {
    try {
        const data = await BitacoraActualizacion.findAll({
            include: [{ model: User, attributes: ['name', 'email'] }],
            order: [['createdAt', 'DESC']]
        });
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.logAction = async (userId, action, targetEntity) => {
    try {
        await BitacoraActualizacion.create({ user_id: userId, action, target_entity: targetEntity });
    } catch (error) {
        console.error('Log error:', error);
    }
};
