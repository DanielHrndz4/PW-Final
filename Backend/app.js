const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors"); // Importar cors

const teacherRoutes = require("./routes/teacherRoutes");
const studentRoutes = require("./routes/studentRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware para manejar JSON y CORS
app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:5173", // Cambia esto si tu frontend está en otra URL
  })
);

// Conectar a MongoDB
mongoose
  .connect(
    "mongodb+srv://admin:admin@cluster0.okajjyr.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Conectado a MongoDB"))
  .catch((err) => console.log("Error al conectar a MongoDB:", err));

// Rutas
app.use("/api/teachers", teacherRoutes);
app.use("/api/students", studentRoutes);

// Ruta base
app.get("/", (req, res) => {
  res.send("Servidor corriendo");
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
