const adminMiddleware = (req, res, next) => {
  if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Acceso denegado. No tiene permisos de administrador.' });
  }
  next(); // Continúa con la siguiente función middleware o ruta
};

module.exports = adminMiddleware;
