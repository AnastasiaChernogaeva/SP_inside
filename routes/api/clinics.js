const { Router } = require("express");
const Clinic = require("../../models/Clinic");

const router = Router();

router.get("/api/clinics/", async (req, res) => {
  try {
    // console.log("Success");
    const clinics = await Clinic.find();
    if (!clinics) throw new Error("No clinics");
    const sorted = clinics.sort((a, b) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });
    res.status(200).json(sorted);
  } catch (error) {
    console.log(`Error ${error}`);
    res.json({ message: error.message }).status(500);
  }
});

router.post("/api/clinics/", async (req, res) => {
  // console.log(req.body);
  // const newClinic = new Clinic(req.body);
  // console.log("a", newClinic);
  // let existedClinic = await Clinic.findOne(req.body.name);
  // console.log("k", existedClinic);

  try {
    const { name } = req.body;
    let existedClinic = await Clinic.findOne({ name });
    if (existedClinic) {
      // console.log(existedClinic);
      throw new Error("The clinic has already existed");
    }
    const newClinic = new Clinic(req.body);
    const clinic = await newClinic.save();
    if (!clinic) throw new Error("Something went wrong saving the clinic");
    res.status(200).json(clinic);
  } catch (error) {
    res.json({ message: error.message }).status(500);
  }
});

router.put("/api/clinics/", async (req, res) => {
  const id = req.body._id;
  // console.log("body", req.body);
  try {
    const response = await Clinic.findByIdAndUpdate(id, req.body);
    if (!response) throw new Error("Something went wrong");
    const updated = { ...response._doc };
    // console.log("updated", updated);
    res.status(200).json(updated);
  } catch (error) {
    res.json({ message: error.message }).status(500);
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
    res.json({ message: error.message }).status(500);
  }
});

module.exports = router;
