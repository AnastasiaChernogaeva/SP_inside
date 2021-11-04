const { Schema, model } = require("mongoose");

const ClinicSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  services: {
    type: String,
    // type: Objectid,
    required: true,
  },
  doctors: {
    type: String,
    // type: Objectid,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Clinic = model("clinic", ClinicSchema);

module.exports = Clinic;
