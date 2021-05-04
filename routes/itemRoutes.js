const express = require("express");
const router = express.Router();
const itemController = require("../controllers/itemController");
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
 
    
router.post("/",requireUser,upload.single('itemImg'), itemController.item_create_post);

router.post("/:itemid/catid",requireUser,upload.single('itemImg'), itemController.item_cust_post);

router.delete("/:id/",requireUser, itemController.item_delete);

router.get("/",requireUser, itemController.item_index);

router.get("/:id",requireUser, itemController.item_details);

router.put("/:id",requireUser,itemController.item_update);

module.exports = router;

