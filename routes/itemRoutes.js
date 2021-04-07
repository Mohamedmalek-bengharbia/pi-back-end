const express = require("express");
const router = express.Router();
const itemController = require("../controllers/itemController");
const {requireUser} = require("../middleware/userMiddleware");



router.post("/",requireUser, itemController.item_create_post);

router.delete("/:id",requireUser, itemController.item_delete);

router.get("/",requireUser, itemController.item_index);

router.get("/:id",requireUser, itemController.item_details);

router.put("/:id",requireUser,itemController.item_update);

module.exports = router;

