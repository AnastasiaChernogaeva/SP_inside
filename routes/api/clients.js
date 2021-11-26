const { Router } = require("express");
const Client = require("../../models/Client");

const router = Router();

router.get("/api/clients/", async (req, res) => {
  try {
    console.log("Success");
    const clients = await Client.find();
    if (!clients) throw new Error("No clients");
    const sorted = clients.sort((a, b) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });
    res.status(200).json(sorted);
  } catch (error) {
    console.log(`Error ${error}`);
    res.status(500).json({ message: error.message });
  }
});

router.post("/api/clients/", async (req, res) => {
  console.log(req.body);
  const newClient = new Client(req.body);
  try {
    const client = await newClient.save();
    if (!client) throw new Error("Something went wrong saving the client");
    res.status(200).json(client);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/api/clients/", async (req, res) => {
  const id = req.body._id;
  console.log("body", req.body);
  try {
    const response = await Client.findByIdAndUpdate(id, req.body.description);
    if (!response) throw new Error("Something went wrong");
    const updated = { ...response._doc };
    console.log("updated", updated);
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
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
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
