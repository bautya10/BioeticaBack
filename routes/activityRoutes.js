const express = require('express');
const router = express.Router();
const {
    createActivity,
    getAllActivities,
    updateActivity,
    deleteActivity,
    getActivityById
} = require('../controllers/activityController');

// Crear una nueva actividad
router.post('/', createActivity);

// Obtener todas las actividades
router.get('/', getAllActivities);

// Actualizar una actividad
router.put('/:id', updateActivity);

// Eliminar una actividad
router.delete('/:id', deleteActivity);

// Obtener una actividad por ID
router.get('/:id', getActivityById); // Esta ruta debe estar definida


module.exports = router;
