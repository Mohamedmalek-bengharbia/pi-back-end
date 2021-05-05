const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const {requireUser,requireAdmin} = require("../middleware/userMiddleware");
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

router.post("/",upload.single('profileImg'), userController.user_create_post);

router.post("/admin/",upload.single('profileImg'),userController.admin_create_post);

router.delete("/:id", userController.user_delete);

router.get("/", userController.get_current_user);

router.get("/admin/", userController.user_index);

router.get("/:id", userController.user_details);

router.put("/:id",requireUser,userController.user_update);


module.exports = router;   