const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");  // Asegúrate de instalar bcryptjs

const studentSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  gradeLevel: { type: String, required: true },
  password: { type: String, required: true },  // Agregamos el campo de contraseña
  role: { type: String, default: 'student' },  // Campo de role con valor por defecto
});

// Encriptar la contraseña antes de guardarla
studentSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);  // Encriptar la contraseña
  next();
});

// Método para comparar contraseñas
studentSchema.methods.comparePassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("Student", studentSchema);
