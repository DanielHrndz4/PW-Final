// app.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const studentRoutes = require("./routes/studentRoutes");
const teacherRoutes = require("./routes/teacherRoutes");

const app = express();
const PORT = 5000;

// Configuración de CORS
const corsOptions = {
  origin: 'http://localhost:5173', // Asegúrate de poner la URL de tu frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
  allowedHeaders: ['Content-Type'], // Encabezados permitidos
};

// Middleware
app.use(cors(corsOptions));
app.use(bodyParser.json());

// Conexión a la base de datos
mongoose
  .connect("mongodb+srv://admin:admin@cluster0.okajjyr.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Conectado a la base de datos MongoDB"))
  .catch((error) => console.error("Error conectando a la base de datos:", error));

// Rutas
app.use("/api/students", studentRoutes);
app.use("/api/teachers", teacherRoutes); // Añadir las rutas de profesores

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
