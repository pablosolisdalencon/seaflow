const { Capacitacion, User, RegistroCapacitacion } = require('../database/models');

exports.getAll = async (req, res) => {
    try {
        const capacitaciones = await Capacitacion.findAll({
            include: [{ model: User, through: { attributes: ['asistencia', 'nota'] } }]
        });
        res.json(capacitaciones);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getMatrix = async (req, res) => {
    try {
        // Returns the training matrix: Users x Trainings
        const users = await User.findAll({
            attributes: ['id', 'name'],
            include: [{
                model: Capacitacion,
                through: { attributes: ['asistencia', 'nota'] }
            }]
        });
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.recordAttendance = async (req, res) => {
    try {
        const { user_id, capacitacion_id, asistencia, nota } = req.body;
        const [registro, created] = await RegistroCapacitacion.findOrCreate({
            where: { user_id, capacitacion_id },
            defaults: { asistencia, nota }
        });

        if (!created) {
            await registro.update({ asistencia, nota });
        }
        res.json(registro);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
