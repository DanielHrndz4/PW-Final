// backend/routes/auth.js

const express = require("express");
const bcrypt = require("bcryptjs");
const Student = require("../models/Student");
const Teacher = require("../models/Teacher");

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  let user = await Student.findOne({ email }) || await Teacher.findOne({ email });

  if (!user) {
    return res.status(400).json({ message: "Correo o contraseña incorrectos" });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).json({ message: "Correo o contraseña incorrectos" });
  }

  res.json({ 
    message: "Login exitoso",
    user: {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role || (user instanceof Student ? 'student' : 'teacher'),
    }
  });
});

module.exports = router;
