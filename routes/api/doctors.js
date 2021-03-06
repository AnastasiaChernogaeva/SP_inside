const { Router } = require("express");
const Doctor = require("../../models/Doctor");

const router = Router();

router.get("/api/doctors/", async (req, res) => {
  try {
    console.log("Success");
    const doctors = await Doctor.find();
    if (!doctors) throw new Error("No doctors");
    const sorted = doctors.sort((a, b) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });
    res.status(200).json(sorted);
  } catch (error) {
    console.log(`Error ${error}`);
    res.json({ message: error.message }).status(500);
  }
});

router.post("/api/doctors/", async (req, res) => {
  console.log(req.body);
  try {
    const { name } = req.body;
    let existedDoctor = await Doctor.findOne({ name });
    if (existedDoctor) {
      console.log(existedDoctor);
      throw new Error("The doctor has already existed");
    }
    const newDoctor = new Doctor(req.body);
    const doctor = await newDoctor.save();
    if (!doctor) throw new Error("Something went wrong saving the doctor");
    res.status(200).json(doctor);
  } catch (error) {
    res.json({ message: error.message }).status(500);
  }
});

router.put("/api/doctors/", async (req, res) => {
  const id = req.body._id;
  const { name, surname, phone, post } = req.body;
  console.log("body", req.body);
  try {
    const response = await Doctor.findByIdAndUpdate(id, {
      name,
      surname,
      phone,
      post,
    });
    if (!response) throw new Error("Something went wrong");
    const updated = { ...response._doc };
    console.log("updated", updated);
    res.status(200).json(updated);
  } catch (error) {
    res.json({ message: error.message }).status(500);
  }
});

router.delete("/api/doctors/", async (req, res) => {
  // console.log(req.body.id);
  const id = req.body.id;
  try {
    const removed = await Doctor.findByIdAndDelete(id);
    if (!removed) throw new Error("Something went wrong");
    res.status(200).json(removed);
  } catch (error) {
    res.json({ message: error.message }).status(500);
  }
});

module.exports = router;
