const router = require("express").Router();

const { userValidator } = require("../validators");
const { userController } = require("../controllers");

router.post("/editUser", userValidator.editUser, userController.editUser);

module.exports = router;
