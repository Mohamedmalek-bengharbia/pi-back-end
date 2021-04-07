const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");
const {requireUser} = require("../middleware/userMiddleware");

router.post("/",requireUser, categoryController.category_create_post);

router.delete("/:id",requireUser, categoryController.category_delete);

router.get("/",requireUser, categoryController.category_index);

router.get("/:id",requireUser, categoryController.category_details);

router.put("/:id",requireUser,categoryController.category_update);
module.exports = router;

