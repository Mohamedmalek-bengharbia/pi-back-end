const express = require("express");
const router = express.Router();
const customizedCategoryController = require("../controllers/customizedCategoryController");
const {requireUser} = require("../middleware/userMiddleware");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
      cb(null,file.originalname);
    }
  });

  const upload = multer({
    storage: storage,
    limits: {fileSize: 1024 * 1024 * 5}
    });



router.post("/",requireUser, upload.single('castImg'), customizedCategoryController.customizedCategory_create_post);

router.delete("/:id",requireUser, customizedCategoryController.customizedCategory_delete);

router.get("/",requireUser, customizedCategoryController.customizedCategory_index);

router.get("/:id",requireUser, customizedCategoryController.customizedCategory_details);

router.put("/:id",requireUser,customizedCategoryController.customizedCategory_update);

module.exports = router;

