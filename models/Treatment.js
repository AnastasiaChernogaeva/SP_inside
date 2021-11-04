const { Schema, model } = require("mongoose");

const TreatmentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  restrictions: {
    // type: Array,
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Treatment = model("treatment", TreatmentSchema);

module.exports = Treatment;
