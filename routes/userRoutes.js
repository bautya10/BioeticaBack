const express = require('express');
const { registerUser, loginUser, getUsers, updateUser, deleteUser, getUserById } = require('../controllers/userController');
const router = express.Router();

// Ruta para registrar nuevos usuarios
router.post('/register', registerUser);

// Logear usuarios
router.post('/login', loginUser);

// Obtener todos los usuarios
router.get('/', getUsers);

// Obtener un usuario
router.get('/:id', getUserById);

// Actualizar un usuario
router.put('/:id', updateUser);

// Eliminar un usuario
router.delete('/:id', deleteUser);

module.exports = router;
