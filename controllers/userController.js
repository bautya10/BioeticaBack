const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Registrar un nuevo usuario
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Verificar si el usuario ya existe
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'El usuario ya está registrado' });
        }

        // Crear nuevo usuario
        const user = new User({ name, email, password }); // Guarda la contraseña sin cifrar, se cifrará en el modelo
        await user.save();

        res.status(201).json({
            message: 'Usuario registrado exitosamente',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Error en el registro de usuario', error });
    }
};

// Iniciar sesión de usuario
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Verificar si el usuario existe
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Usuario no encontrado' });
        }

        // Verificar la contraseña
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Contraseña incorrecta' });
        }

        // Generar token JWT
        const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({
            message: 'Usuario autenticado',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role  // Aquí se envía el rol
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Error en el inicio de sesión', error });
    }
};


// Obtener todos los usuarios
const getUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener usuarios.' });
    }
};

// Actualizar un usuario
const updateUser = async (req, res) => {
    const { name, email, role } = req.body;
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, { name, email, role }, { new: true });
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el usuario.' });
    }
};

// Eliminar un usuario
const deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: 'Usuario eliminado.' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el usuario.' });
    }
};

const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id); // Cambiado para buscar por ID
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener usuario único.' });
    }
};

module.exports = { registerUser, loginUser, deleteUser, updateUser, getUsers, getUserById };
