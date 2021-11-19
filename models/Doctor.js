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
  experience: {
    type: String,
    required: true,
  },
  contacts: {
    type: String,
    required: true,
  },
  // workPlace: {
  //   type: String,
  //   ref: "Clinic",
  //   // type: Objectid,
  //   // required: true,
  // },
  user: {
    type: Object,
    ref: "User",
  },
  // login: {
  //   type: String,
  //   required: true,
  // },
  // password: {
  //   type: String,
  //   required: true,
  // },
  // status: {
  //   type: String,
  //   // type: Boolean,
  //   required: true,
  // },
  // date: {
  //   type: Date,
  //   default: Date.now,
  // },
});

const Doctor = model("doctor", DoctorSchema);

module.exports = Doctor;
