const router = require("express").Router();

const { authValidator } = require("../validators");
const { authController } = require("../controllers");

router.post("/signIn", authValidator.signIn, authController.signIn);
router.post("/signUp", authValidator.signUp, authController.signUp);

module.exports = router;
