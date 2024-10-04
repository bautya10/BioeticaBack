const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('../routes/userRoutes');
const activityRoutes = require('../routes/activityRoutes')

// Cargar variables de entorno
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Conectar a la base de datos (MongoDB)
mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Conectado a la base de datos'))
.catch((error) => console.error('Error al conectar con la base de datos:', error));

// Rutas base (Prueba inicial)
app.get('/', (req, res) => {
    res.send('Servidor funcionando correctamente');
});

// Usar las rutas de usuario
app.use('/api/users', userRoutes);

// Usar las rutas de actividad
app.use('/api/activities', activityRoutes);

// Configuración del puerto
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
