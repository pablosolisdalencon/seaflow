const { Carta, ActividadBitacora } = require('../database/models');

const bitacoraController = {
  getCartas: async (req, res) => {
    try {
      const cartas = await Carta.findAll({ order: [['id', 'DESC']] });
      res.json(cartas);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  createCarta: async (req, res) => {
    try {
      // Automatic correlative logic
      const lastCarta = await Carta.findOne({ order: [['id', 'DESC']] });
      const currentYear = new Date().getFullYear();
      let nextNum = 1;
      if (lastCarta && lastCarta.correlativo.includes(`/${currentYear}`)) {
        nextNum = parseInt(lastCarta.correlativo.split('/')[0]) + 1;
      }
      const correlativo = `${nextNum.toString().padStart(2, '0')}/${currentYear}`;
      
      const carta = await Carta.create({ ...req.body, correlativo });
      res.status(201).json(carta);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  getActividades: async (req, res) => {
    try {
      const actividades = await ActividadBitacora.findAll({ order: [['id', 'DESC']] });
      res.json(actividades);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  createActividad: async (req, res) => {
    try {
      // Automatic activity number logic
      const lastAct = await ActividadBitacora.findOne({ order: [['id', 'DESC']] });
      let nextNum = 1;
      if (lastAct) {
        nextNum = parseInt(lastAct.numero_actividad) + 1;
      }
      const numero_actividad = nextNum.toString().padStart(2, '0');

      const actividad = await ActividadBitacora.create({ ...req.body, numero_actividad });
      res.status(201).json(actividad);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
};

module.exports = bitacoraController;
