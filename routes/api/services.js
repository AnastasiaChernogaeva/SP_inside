const { Router } = require("express");
const Service = require("../../models/Service");

const router = Router();

router.get("/api/services/", async (req, res) => {
  try {
    console.log("Success");
    const services = await Service.find();
    if (!services) throw new Error("No services");
    const sorted = services.sort((a, b) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });
    res.status(200).json(sorted);
  } catch (error) {
    console.log(`Error ${error}`);
    res.status(500).json({ message: error.message });
  }
});

router.post("/api/services/", async (req, res) => {
  console.log(req.body);
  const newService = new Service(req.body);
  try {
    const service = await newService.save();
    if (!service) throw new Error("Something went wrong saving the service");
    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/api/services/", async (req, res) => {
  const id = req.body.item;
  console.log("body", req.body);
  // try {
  //   const response = await Service.findByIdAndUpdate(id, req.body.description);
  //   if (!response) throw new Error("Something went wrong");
  //   const updated = { ...response._doc };
  //   console.log("updated", updated);
  //   res.status(200).json(updated);
  // } catch (error) {
  //   res.status(500).json({ message: error.message });
  // }
});

router.delete(`/api/services/`, async (req, res) => {
  const id = req.body.id;
  try {
    const removed = await Service.findByIdAndDelete(id);
    if (!removed) throw new Error("Something went wrong");
    res.status(200).json(removed);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
