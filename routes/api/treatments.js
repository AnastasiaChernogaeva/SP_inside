const { Router } = require("express");
const Treatment = require("../../models/Treatment");

const router = Router();

router.get("/api/treatments/", async (req, res) => {
  try {
    // console.log("Success");
    const treatments = await Treatment.find();
    if (!treatments) throw new Error("No treatments");
    const sorted = treatments.sort((a, b) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });
    res.status(200).json(sorted);
  } catch (error) {
    console.log(`Error ${error}`);
    res.status(500).json({ message: error.message });
  }
});

router.post("/api/treatments/", async (req, res) => {
  // console.log(req.body);
  const newTreatment = new Treatment(req.body);
  try {
    const treatment = await newTreatment.save();
    if (!treatment)
      throw new Error("Something went wrong saving the treatment");
    res.status(200).json(treatment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/api/treatments/", async (req, res) => {
  const id = req.body.id;
  // console.log("body", req.body);
  try {
    const response = await Treatment.findByIdAndUpdate(
      id,
      req.body.description
    );
    if (!response) throw new Error("Something went wrong");
    const updated = { ...response._doc };
    // console.log("updated", updated);
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/api/treatments/", async (req, res) => {
  // console.log(req.body.id);
  const id = req.body.id;
  try {
    const removed = await Treatment.findByIdAndDelete(id);
    if (!removed) throw new Error("Something went wrong");
    res.status(200).json(removed);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
