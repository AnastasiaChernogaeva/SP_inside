const Router = require("express");
const router = new Router();
const controller = require("./authController");
const { check } = require("express-validator");

router.post(
  "/registration",
  [
    check("username", "Username can't be empty").notEmpty(),
    check(
      "password",
      "Password must be more than 4  and less than 10 symbols!"
    ).isLength({ min: 4, max: 10 }),
  ],
  controller.registration
);
router.post("/login", controller.login);

router.delete("/deleteUser", controller.deleteUser);

router.put("/updateUser", controller.updateUser);

router.get("/users", controller.getUsers);
// roleMiddleware(["ADMIN"]),

module.exports = router;
