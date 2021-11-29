const { Schema, model } = require("mongoose");

const ClientSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  pets: {
    type: Array,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Client = model("client", ClientSchema);

module.exports = Client;
