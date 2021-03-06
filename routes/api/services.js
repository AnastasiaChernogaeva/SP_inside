const { Router } = require("express");
const Service = require("../../models/Service");

const router = Router();

router.get("/api/services/", async (req, res) => {
  try {
    // console.log("Success");
    const services = await Service.find();
    if (!services) throw new Error("No services");
    const sorted = services.sort((a, b) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });
    res.status(200).json(sorted);
  } catch (error) {
    console.log(`Error ${error}`);
    res.json({ message: error.message }).status(500);
  }
});

router.post("/api/services/", async (req, res) => {
  // console.log(req.body);
  try {
    const { name } = req.body;
    let existedService = await Service.findOne({ name });
    if (existedService) {
      // console.log(existedService);
      throw new Error("The service has already existed");
    }
    const newService = new Service(req.body);
    const service = await newService.save();
    if (!service) throw new Error("Something went wrong saving the service");
    res.status(200).json(service);
  } catch (error) {
    res.json({ message: error.message }).status(500);
  }
});

router.put("/api/services/", async (req, res) => {
  const id = req.body._id;
  const body = { name: req.body.name, price: req.body.price };

  // console.log("body", body);
  // console.log("id", id);

  try {
    const response = await Service.findByIdAndUpdate(id, body);
    if (!response) throw new Error("Something went wrong");
    const updated = { ...response._doc };
    // console.log("updated", updated);
    res.status(200).json(updated);
  } catch (error) {
    res.json({ message: error.message }).status(500);
  }
});

router.delete(`/api/services/`, async (req, res) => {
  const id = req.body.id;
  try {
    const removed = await Service.findByIdAndDelete(id);
    if (!removed) throw new Error("Something went wrong");
    res.status(200).json(removed);
  } catch (error) {
    res.json({ message: error.message }).status(500);
  }
});

module.exports = router;
