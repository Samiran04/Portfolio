const express = require("express");
const router = express.Router();

const users_controllers = require("../controllers/users_controller");

router.post("/create", users_controllers.create);

module.exports = router;
