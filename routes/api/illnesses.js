const { Router } = require("express");
const Illness = require("../../models/Illness");

const router = Router();

router.get("/api/illnesses/", async (req, res) => {
  try {
    console.log("Success");
    const illnesses = await Illness.find();
    if (!illnesses) throw new Error("No illnesses");
    const sorted = illnesses.sort((a, b) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });
    res.status(200).json(sorted);
  } catch (error) {
    console.log(`Error ${error}`);
    res.status(500).json({ message: error.message });
  }
});

router.post("/api/illnesses/", async (req, res) => {
  console.log(req.body);
  const newIllness = new Illness(req.body);
  try {
    const illness = await newIllness.save();
    if (!illness) throw new Error("Something went wrong saving the illness");
    res.status(200).json(illness);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/api/illnesses/", async (req, res) => {
  const id = req.body.id;
  console.log("body", req.body);
  try {
    const response = await Illness.findByIdAndUpdate(id, req.body.description);
    if (!response) throw new Error("Something went wrong");
    const updated = { ...response._doc };
    console.log("updated", updated);
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/api/illnesses/", async (req, res) => {
  // console.log(req.body.id);
  const id = req.body.id;
  try {
    const removed = await Illness.findByIdAndDelete(id);
    if (!removed) throw new Error("Something went wrong");
    res.status(200).json(removed);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
