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
  email: {
    type: String,
    required: true,
  },
  password: {
    // type: Password,
    type: String,
    required: true,
  },
  petName: {
    type: String,
    required: true,
  },
  petInfo: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    default:
      "https://w7.pngwing.com/pngs/340/956/png-transparent-profile-user-icon-computer-icons-user-profile-head-ico-miscellaneous-black-desktop-wallpaper.png",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Client = model("client", ClientSchema);

module.exports = Client;
