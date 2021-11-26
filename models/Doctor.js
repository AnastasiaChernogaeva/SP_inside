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
  // experience: {
  //   type: String,
  //   required: true,
  // },
  phone: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
});

const Doctor = model("doctor", DoctorSchema);

module.exports = Doctor;
