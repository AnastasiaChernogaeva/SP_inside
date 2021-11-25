const { Schema, model } = require("mongoose");

const ShopgoodSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    // required: true,
  },
  price: {
    type: String,
    required: true,
  },
  // takeWithYourself: {
  //   type: String,
  //   required: true,
  // },
  // description: {
  //   type: String,
  //   required: true,
  // },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Shopgood = model("shopgood", ShopgoodSchema);

module.exports = Shopgood;
