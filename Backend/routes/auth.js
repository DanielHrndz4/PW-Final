const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Student = require("../models/Student");
const Teacher = require("../models/Teacher");
const User = require("../models/User");

const router = express.Router();

// Clave secreta para firmar el token
const JWT_SECRET = process.env.JWT_SECRET || "tu_clave_secreta";
const JWT_EXPIRES_IN = "1d"; // Tiempo de expiración del token

// Endpoint de login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Buscar el usuario en la base de datos (primero en User, luego en Student o Teacher)
    let user = await User.findOne({ email }) || await Student.findOne({ email }) || await Teacher.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Correo o contraseña incorrectos" });
    }

    // Comparar la contraseña con el hash guardado en la base de datos
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Correo o contraseña incorrectos" });
    }

    // Generar el token JWT
    const token = jwt.sign(
      { 
        id: user._id, 
        email: user.email, 
        role: user.role || (user instanceof Student ? 'student' : 'teacher') 
      }, 
      JWT_SECRET, 
      { expiresIn: JWT_EXPIRES_IN }
    );

    // Configurar la cookie con el token
    res.cookie("token", token, {
      httpOnly: true, // Solo accesible desde HTTP(S)
      secure: process.env.NODE_ENV === "production", // Enviar solo sobre HTTPS en producción
      sameSite: "strict", // Prevenir envío de cookies a otros dominios
      maxAge: 24 * 60 * 60 * 1000, // 1 día en milisegundos
    });

    res.json({
      message: "Login exitoso",
      user: {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role || (user instanceof Student ? 'student' : 'teacher'),
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
});

module.exports = router;
