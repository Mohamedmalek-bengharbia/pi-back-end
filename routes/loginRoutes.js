const express = require("express");
const router = express.Router();
const loginController = require("../controllers/loginController");

router.post("/", loginController.login_post);



//router.get("/", loginController.login_get);



module.exports = router;