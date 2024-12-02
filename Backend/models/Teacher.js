const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const teacherSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String },
  subject: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, default: 'teacher' },  // Campo de role con valor por defecto
});

// Middleware para encriptar la contraseña antes de guardar
teacherSchema.pre("save", async function (next) {
  if (this.isModified("password") || this.isNew) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

module.exports = mongoose.model("Teacher", teacherSchema);
