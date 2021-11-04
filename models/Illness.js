const { Schema, model } = require("mongoose");

const IllnessSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  medicine: {
    type: String,
    // type: Array,
    required: true,
  },
  treatment: {
    type: String,
    // type: Array,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Illness = model("illness", IllnessSchema);

module.exports = Illness;
