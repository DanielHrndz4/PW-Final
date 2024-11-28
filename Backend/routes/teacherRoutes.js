const express = require("express");
const Teacher = require("../models/Teacher");
const router = express.Router();


router.post('/', async (req, res) => {
  const { firstName, lastName, email, phoneNumber, subject } = req.body;

  if (!firstName || !lastName || !email || !subject) {
      return res.status(400).json({ message: "Todos los campos son obligatorios." });
  }

  try {
      const newTeacher = new Teacher({ firstName, lastName, email, phoneNumber, subject });
      await newTeacher.save();
      res.status(201).json(newTeacher);
  } catch (error) {
      res.status(500).json({ message: "Error al agregar el profesor.", error: error.message });
  }
});


router.get("/", async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.status(200).json(teachers);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los profesores", error });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, email, phoneNumber, subject } = req.body;

  try {
    const updatedTeacher = await Teacher.findByIdAndUpdate(
      id,
      { firstName, lastName, email, phoneNumber, subject },
      { new: true }
    );
    res.status(200).json({ message: "Profesor actualizado", updatedTeacher });
  } catch (error) {
    res.status(400).json({ message: "Error al actualizar el profesor", error });
  }
});


router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await Teacher.findByIdAndDelete(id);
    res.status(200).json({ message: "Profesor eliminado" });
  } catch (error) {
    res.status(400).json({ message: "Error al eliminar el profesor", error });
  }
});

module.exports = router;
