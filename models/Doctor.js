const { Schema, model } = require("mongoose");

const DoctorSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  post: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  appointments: {
    type: Array,
    default: [],
  },
  photo: {
    type: String,
    default: "",
  },
});

const Doctor = model("doctor", DoctorSchema);

module.exports = Doctor;
