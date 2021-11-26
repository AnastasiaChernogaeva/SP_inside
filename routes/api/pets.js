const { Router } = require("express");
const Pet = require("../../models/Pet");

const router = Router();

router.get("/api/pets/", async (req, res) => {
  try {
    console.log("Success");
    const pets = await Pet.find();
    if (!pets) throw new Error("No pets");
    const sorted = pets.sort((a, b) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });
    res.status(200).json(sorted);
  } catch (error) {
    console.log(`Error ${error}`);
    res.status(500).json({ message: error.message });
  }
});

router.post("/api/pets/", async (req, res) => {
  console.log(req.body);
  const newPet = new Pet(req.body);
  try {
    const pet = await newPet.save();
    if (!pet) throw new Error("Something went wrong saving the pet");
    res.status(200).json(pet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/api/pets/", async (req, res) => {
  const id = req.body._id;
  console.log("body", req.body);
  try {
    const response = await Pet.findByIdAndUpdate(id, req.body.description);
    if (!response) throw new Error("Something went wrong");
    const updated = { ...response._doc };
    console.log("updated", updated);
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
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
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
