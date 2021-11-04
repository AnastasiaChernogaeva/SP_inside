const { Router } = require("express");
const Clinic = require("../../models/Clinic");

const router = Router();

router.get("/api/clinics/", async (req, res) => {
  try {
    console.log("Success");
    const clinics = await Clinic.find();
    if (!clinics) throw new Error("No clinics");
    const sorted = clinics.sort((a, b) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });
    res.status(200).json(sorted);
  } catch (error) {
    console.log(`Error ${error}`);
    res.status(500).json({ message: error.message });
  }
});

router.post("/api/clinics/", async (req, res) => {
  console.log(req.body);
  const newClinic = new Clinic(req.body);
  try {
    const clinic = await newClinic.save();
    if (!clinic) throw new Error("Something went wrong saving the clinic");
    res.status(200).json(clinic);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/api/clinics/", async (req, res) => {
  const id = req.body.id;
  console.log("body", req.body);
  try {
    const response = await Clinic.findByIdAndUpdate(id, req.body.description);
    if (!response) throw new Error("Something went wrong");
    const updated = { ...response._doc };
    console.log("updated", updated);
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/api/clinics/", async (req, res) => {
  // console.log(req.body.id);
  const id = req.body.id;
  try {
    const removed = await Clinic.findByIdAndDelete(id);
    if (!removed) throw new Error("Something went wrong");
    res.status(200).json(removed);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
