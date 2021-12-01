const { Router } = require("express");
const Pet = require("../../models/Pet");

const router = Router();

router.get("/api/pets/", async (req, res) => {
  try {
    // console.log("Success");
    const pets = await Pet.find();
    if (!pets) throw new Error("No pets");
    const sorted = pets.sort((a, b) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });
    res.status(200).json(sorted);
  } catch (error) {
    console.log(`Error ${error}`);
    res.json({ message: error.message }).status(500);
  }
});

router.post("/api/pets/", async (req, res) => {
  // console.log(req.body);
  try {
    const { fullname } = req.body;
    let existedPet = await Pet.findOne({ fullname });
    if (existedPet) {
      // console.log(existedPet);
      throw new Error("The pet has already existed");
    }
    const newPet = new Pet(req.body);
    const pet = await newPet.save();
    if (!pet) throw new Error("Something went wrong saving the pet");
    res.status(200).json(pet);
  } catch (error) {
    res.json({ message: error.message }).status(500);
  }
});

router.put("/api/pets/", async (req, res) => {
  const id = req.body._id;
  console.log("body", req.body);
  try {
    const response = await Pet.findByIdAndUpdate(id, req.body);
    if (!response) throw new Error("Something went wrong");
    const updated = { ...response._doc };
    // console.log("updated", updated);
    res.status(200).json(updated);
  } catch (error) {
    res.json({ message: error.message }).status(500);
  }
});

router.delete("/api/pets/", async (req, res) => {
  // console.log(req.body.id);
  const id = req.body.id;
  try {
    const removed = await Pet.findByIdAndDelete(id);
    if (!removed) throw new Error("Something went wrong");
    res.status(200).json(removed);
  } catch (error) {
    res.json({ message: error.message }).status(500);
  }
});

module.exports = router;
