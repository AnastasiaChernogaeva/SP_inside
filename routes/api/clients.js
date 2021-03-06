const { Router } = require("express");
const Client = require("../../models/Client");

const router = Router();

router.get("/api/clients/", async (req, res) => {
  try {
    // console.log("Success");
    const clients = await Client.find();
    if (!clients) throw new Error("No clients");
    const sorted = clients.sort((a, b) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });
    res.status(200).json(sorted);
  } catch (error) {
    console.log(`Error ${error}`);
    res.json({ message: error.message }).status(500);
  }
});

router.post("/api/clients/", async (req, res) => {
  // console.log(req.body);
  try {
    const { name } = req.body;
    let existedClient = await Client.findOne({ name });
    if (existedClient) {
      // console.log(existedClient);
      throw new Error("The client has already existed");
    }
    const newClient = new Client(req.body);
    const client = await newClient.save();
    if (!client) throw new Error("Something went wrong saving the client");
    res.status(200).json(client);
  } catch (error) {
    res.json({ message: error.message }).status(500);
  }
});

router.put("/api/clients/", async (req, res) => {
  const id = req.body._id;
  const { name, surname, phone } = req.body;
  console.log("body", req.body);
  try {
    const response = await Client.findByIdAndUpdate(id, {
      name,
      surname,
      phone,
    });
    if (!response) throw new Error("Something went wrong");
    const updated = { ...response._doc };
    // console.log("updated", updated);
    res.status(200).json(updated);
  } catch (error) {
    res.json({ message: error.message }).status(500);
  }
});

router.delete("/api/clients/", async (req, res) => {
  // console.log(req.body.id);
  const id = req.body.id;
  try {
    const removed = await Client.findByIdAndDelete(id);
    if (!removed) throw new Error("Something went wrong");
    res.status(200).json(removed);
  } catch (error) {
    res.json({ message: error.message }).status(500);
  }
});

module.exports = router;
