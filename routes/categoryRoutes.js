const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");
const {requireUser} = require("../middleware/userMiddleware");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
      cb(null, 
        file.originalname);
    }
  });

  const upload = multer({
    storage: storage,
    limits: {fileSize: 1024 * 1024 * 5}
    });



router.post("/",requireUser,upload.single('catImg'), categoryController.category_create_post);

router.delete("/:id",requireUser, categoryController.category_delete);

router.get("/",requireUser, categoryController.category_index);

router.get("/:id",requireUser, categoryController.category_details);

router.put("/:id",requireUser,categoryController.category_update);
module.exports = router;