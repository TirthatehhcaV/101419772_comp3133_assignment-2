const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: { type: String, unique: true },
  gender: String,
  designation: String,
  salary: Number,
  date_of_joining: String,
  department: String,
  employee_photo: String
}, { timestamps: true });

module.exports = mongoose.model('Employee', employeeSchema);
