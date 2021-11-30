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
    default:
      "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
  },
});

const Doctor = model("doctor", DoctorSchema);

module.exports = Doctor;
