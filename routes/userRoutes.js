const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const {requireUser} = require("../middleware/userMiddleware");

router.post("/", userController.user_create_post);

router.delete("/:id", userController.user_delete);

router.get("/", userController.get_current_user);
//router.get("/", userController.user_index);

router.get("/:id", userController.user_details);

router.put("/:id",requireUser,userController.user_update);


module.exports = router;   