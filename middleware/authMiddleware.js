const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'Acceso denegado. No se proporcionó token.' });
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified; // Almacena los datos del usuario en la petición
        next(); // Continúa con la siguiente función middleware o ruta
    } catch (error) {
        res.status(400).json({ message: 'Token inválido.' });
    }
};

module.exports = authMiddleware;
