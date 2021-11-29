const { Schema, model } = require("mongoose");

const PetSchema = new Schema({
  fullname: {
    type: String,
    required: true,
  },
  nickname: {
    type: String,
    required: true,
  },
  kind: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    // type: Date,
    type: String,
    required: true,
  },
  dateOfDeath: {
    // type: Date,
    type: String,
    // required: true,
  },
  weight: {
    type: String,
    required: true,
  },
  appearance: {
    type: String,
    required: true,
  },
  // homeless: {
  //   type: Boolean,
  //   required: true,
  // },
  // pedigree: {
  //   type: Boolean,
  //   required: true,
  // },
  // passport: {
  //   type: Boolean,
  //   required: true,
  // },
  // activeLifestyle: {
  //   type: Boolean,
  //   required: true,
  // },
  // activityForms: {
  //   // type: Array,
  //   type: String,
  //   required: true,
  // },
  photo: {
    type: String,
    required: false,
  },
  // diagnoses: {
  //   type: String,
  //   required: true,
  // },
  // appointments: {
  //   // type: Array,
  //   type: String,
  //   // required: true,
  // },
  // treatments: {
  //   // type: Array,
  //   type: String,
  //   // required: true,
  // },
  // owner: {
  //   type: String,
  //   // required: true,
  // },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Pet = model("pet", PetSchema);

module.exports = Pet;
