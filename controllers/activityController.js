const Activity = require('../models/activity');

// Crear una nueva actividad
exports.createActivity = async (req, res) => {
    try {
        const { title, description, professorName } = req.body;

        // Validar campos
        if (!title || !description || !professorName) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios' });
        }

        // Crear la actividad
        const newActivity = new Activity({ title, description, professorName });
        await newActivity.save();

        res.status(201).json(newActivity);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la actividad', error });
    }
};

// Obtener todas las actividades
exports.getAllActivities = async (req, res) => {
    try {
        const activities = await Activity.find().sort({ createdAt: -1 }); // Ordenar por fecha de creación (más recientes primero)
        res.status(200).json(activities);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las actividades', error });
    }
};

// Actualizar una actividad
exports.updateActivity = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, professorName } = req.body;

        // Validar campos
        if (!title || !description || !professorName) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios' });
        }

        // Buscar y actualizar la actividad
        const updatedActivity = await Activity.findByIdAndUpdate(id, { title, description, professorName }, { new: true });

        if (!updatedActivity) {
            return res.status(404).json({ message: 'Actividad no encontrada' });
        }

        res.status(200).json(updatedActivity);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar la actividad', error });
    }
};

// Eliminar una actividad
exports.deleteActivity = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedActivity = await Activity.findByIdAndDelete(id);

        if (!deletedActivity) {
            return res.status(404).json({ message: 'Actividad no encontrada' });
        }

        res.status(200).json({ message: 'Actividad eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la actividad', error });
    }
};

exports.getActivityById = async (req, res) => {
    try {
        const activity = await Activity.findById(req.params.id);
        if (!activity) {
            return res.status(404).json({ message: 'Actividad no encontrada' });
        }
        res.json(activity);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la actividad', error });
    }
};