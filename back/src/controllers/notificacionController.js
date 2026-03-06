// IEEE Trace: [REQ-LOGS-01] | [US-102]
const { Notificacion, User } = require('../database/models');

exports.getMyNotifications = async (req, res) => {
    try {
        const data = await Notificacion.findAll({
            where: { user_id: req.user.id },
            order: [['createdAt', 'DESC']]
        });
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.markAsRead = async (req, res) => {
    try {
        const item = await Notificacion.findByPk(req.params.id);
        if (!item || item.user_id !== req.user.id) return res.status(404).json({ error: 'Not found' });
        await item.update({ read: true });
        res.json(item);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.createSystemNotification = async (userId, message) => {
    try {
        await Notificacion.create({ user_id: userId, message });
    } catch (error) {
        console.error('Notification error:', error);
    }
};
