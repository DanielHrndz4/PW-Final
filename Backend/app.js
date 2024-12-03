const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors"); // Importar cors

const teacherRoutes = require("./routes/teacherRoutes");
const studentRoutes = require("./routes/studentRoutes");
const routerLogin = require("./routes/auth");
const User = require("./models/User");
const bcrypt = require("bcryptjs"); // Cambia a bcryptjs




const app = express();
const PORT = process.env.PORT || 5000;


// Middleware para manejar JSON y CORS
app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, // Cambia esto si tu frontend está en otra URL
  })
);


const createAdminUser = async () => {
  try {
    const existingAdmin = await User.findOne({ email: "admin@example.com" });
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash("Admin123", 10); // Contraseña encriptada
      const adminUser = new User({
        firstName: "Admin",
        lastName: "User",
        email: "admin@example.com",
        password: hashedPassword,
        role: "admin",
      });
      await adminUser.save();
      console.log("Usuario admin creado con éxito.");
    } else {
      console.log("Usuario admin ya existe.");
    }
  } catch (error) {
    console.error("Error al crear usuario admin:", error);
  }
};

createAdminUser(); // Asegúrate de invocar esta función al iniciar el servidor




// Conectar a MongoDB
mongoose
  .connect(
    "mongodb+srv://admin:admin@cluster0.okajjyr.mongodb.net/?retryWrites=true&w=majority",
  )
  .then(() => console.log("Conectado a MongoDB"))
  .catch((err) => console.log("Error al conectar a MongoDB:", err));

// Rutas
app.use("/api/teachers", teacherRoutes);
app.use("/api/students", studentRoutes);
app.use("/api", routerLogin);

// Ruta base
app.get("/", (req, res) => {
  res.send("Servidor corriendo");
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
