const User = require("../authModels/User");
const Role = require("../authModels/Role");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const { secret } = require("../config");

const generateAccessToken = (id, roles) => {
  const payload = {
    id,
    roles,
  };
  return jwt.sign(payload, secret, { expiresIn: "24h" });
};

class authController {
  async registration(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .json({ message: "Errors during the registration", errors })
          .status(400);
      }

      const { username, password, role, infoId } = req.body;

      const candidate = await User.findOne({ username });
      if (candidate) {
        return res
          .json({ message: "User with such a username has already existed" })
          .status(400);
      }

      const hashPassword = bcrypt.hashSync(password, 7);
      const userRole = await Role.findOne({ value: role });

      // const userRole = await Role.findOne({value:"ADMIN"})
      // const userRole = await Role.findOne({ value: "USER" });

      const user = new User({
        username,
        password: hashPassword,
        roles: [userRole.value],
        infoId,
      });

      await user.save();

      return res.json({
        message: "The user has been registrated successfully!",
      });
    } catch (e) {
      console.log(e);
      res.json({ message: "Registration error" }).status(400);
    }
  }
  async login(req, res) {
    try {
      const { username, password, role } = req.body;
      const user = await User.findOne({ username });

      if (user.roles[0] !== role) {
        return res
          .json({ message: `User "${username}" wasn't found ` })
          .status(400);
      }
      if (!user) {
        return res
          .json({ message: `User "${username}" wasn't found ` })
          .status(400);
      }
      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        return res.json({ message: "The password is incorrect" }).status(400);
      }

      const token = generateAccessToken(user._id, user.roles);
      return res.json({ token });
    } catch (e) {
      console.log(e);
      res.json({ message: "Login error" }).status(400);
    }
  }
  async getUsers(req, res) {
    try {
      //   const userRole = new Role();
      //   const adminRole = new Role({ value: "ADMIN" });
      //   const docRole = new Role({ value: "DOCTOR" });

      //   await userRole.save();
      //   await adminRole.save();
      //   await docRole.save();

      const users = await User.find();

      res.json(users);
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = new authController();
