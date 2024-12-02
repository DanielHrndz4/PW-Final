const express = require("express");
const Student = require("../models/Student");

const router = express.Router();

// Obtener todos los estudiantes
router.get("/", async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener estudiantes." });
  }
});

// Crear un nuevo estudiante
router.post("/", async (req, res) => {
    const { firstName, lastName, email, gradeLevel, password } = req.body;  // Asegúrate de obtener la contraseña
    try {
        const newStudent = new Student({ firstName, lastName, email, gradeLevel, password });  // Añadimos el campo password
        await newStudent.save();
        res.status(201).json(newStudent);
    } catch (error) {
        console.error(error); 
        res.status(400).json({ error: error.message || "Error al agregar el estudiante." });
    }
});

// Editar un estudiante
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, email, gradeLevel, password } = req.body;

  try {
    const updatedStudentData = { firstName, lastName, email, gradeLevel };
    if (password) {
      updatedStudentData.password = password;  // Si se pasa una nueva contraseña, la actualizamos
    }

    const updatedStudent = await Student.findByIdAndUpdate(id, updatedStudentData, { new: true });
    res.status(200).json(updatedStudent);
  } catch (error) {
    res.status(400).json({ error: "Error al editar el estudiante." });
  }
});

// Eliminar un estudiante
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await Student.findByIdAndDelete(id);
    res.status(200).json({ message: "Estudiante eliminado con éxito." });
  } catch (error) {
    res.status(400).json({ error: "Error al eliminar el estudiante." });
  }
});

module.exports = router;
