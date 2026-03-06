const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User, Role } = require('../database/models');

const privateKey = fs.readFileSync(path.join(__dirname, '../config/private.pem'));

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({
            where: { email },
            include: [{ model: Role }]
        });

        if (!user || !(await bcrypt.compare(password, user.password_hash))) {
            return res.status(401).send({ error: 'Invalid email or password' });
        }

        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.Role.name },
            privateKey,
            { algorithm: 'RS256', expiresIn: '24h' }
        );

        res.send({
            user: { id: user.id, name: user.name, email: user.email, role: user.Role.name },
            token
        });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.getMe = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id, {
            include: [{ model: Role }]
        });
        res.send({ id: user.id, name: user.name, email: user.email, role: user.Role.name });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};
