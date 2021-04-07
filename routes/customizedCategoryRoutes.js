const express = require("express");
const router = express.Router();
const customizedCategoryController = require("../controllers/customizedCategoryController");
const {requireUser} = require("../middleware/userMiddleware");

router.post("/",requireUser, customizedCategoryController.customizedCategory_create_post);

router.delete("/:id",requireUser, customizedCategoryController.customizedCategory_delete);

router.get("/",requireUser, customizedCategoryController.customizedCategory_index);

router.get("/:id",requireUser, customizedCategoryController.customizedCategory_details);

router.put("/:id",requireUser,customizedCategoryController.customizedCategory_update);

module.exports = router;

