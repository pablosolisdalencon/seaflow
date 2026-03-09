require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const routes = require('./routes');
const { sequelize } = require('./database/models');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({
    origin: process.env.FRONTEND_URL || '*',
    credentials: true
}));
app.use(express.json());

// IEEE Trace: REQ-001 | REQ-007
app.get('/health', (req, res) => res.send({ status: 'ok', timestamp: new Date() }));
app.use('/api', routes);

// Serve Static Frontend (for monolithic deployment)
const frontPath = path.join(__dirname, '../../front/dist');
app.use(express.static(frontPath));

// Catch-all route for React Router support
app.get('(.*)', (req, res) => {
    res.sendFile(path.join(frontPath, 'index.html'));
});

async function start() {
    try {
        await sequelize.authenticate();
        console.log('Database connection stable.');
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Unable to connect to database:', error);
    }
}

start();
