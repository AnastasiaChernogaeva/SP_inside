const { Router } = require("express");
const Shopgood = require("../../models/Shopgood");

const router = Router();

router.get("/api/shopgoods/", async (req, res) => {
  try {
    // console.log("Success");
    const shopgoods = await Shopgood.find();
    if (!shopgoods) throw new Error("No shopgoods");
    const sorted = shopgoods.sort((a, b) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });
    res.status(200).json(sorted);
  } catch (error) {
    console.log(`Error ${error}`);
    res.json({ message: error.message }).status(500);
  }
});

router.post("/api/shopgoods/", async (req, res) => {
  // console.log(req.body);

  try {
    const { name } = req.body;
    let existedShopgood = await Shopgood.findOne({ name });
    if (existedShopgood) {
      // console.log(existedShopgood);
      throw new Error("The item has already existed");
    }
    const newshopgood = new Shopgood(req.body);
    const shopgood = await newshopgood.save();
    if (!shopgood) throw new Error("Something went wrong saving the shopgood");
    res.status(200).json(shopgood);
  } catch (error) {
    res.json({ message: error.message }).status(500);
  }
});

router.put("/api/shopgoods/", async (req, res) => {
  const id = req.body._id;
  // const body = { name: req.body.name, price: req.body.price };

  // console.log("body", body);
  // console.log("id", id);

  try {
    const response = await Shopgood.findByIdAndUpdate(id, req.body);
    if (!response) throw new Error("Something went wrong");
    const updated = { ...response._doc };
    // console.log("updated", updated);
    res.status(200).json(updated);
  } catch (error) {
    res.json({ message: error.message }).status(500);
  }
});

router.delete(`/api/shopgoods/`, async (req, res) => {
  const id = req.body.id;
  try {
    const removed = await Shopgood.findByIdAndDelete(id);
    if (!removed) throw new Error("Something went wrong");
    res.status(200).json(removed);
  } catch (error) {
    res.json({ message: error.message }).status(500);
  }
});

module.exports = router;
