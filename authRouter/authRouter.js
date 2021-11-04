const Router = require("express");
const router = new Router();
const controller = require("./authController");
const { check } = require("express-validator");

router.post("/registration", controller);
router.post("/login", controller);
