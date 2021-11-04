const { Schema, model } = require("mongoose");

const ServiceSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  takeWithYourself: {
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

const Service = model("service", ServiceSchema);

module.exports = Service;
