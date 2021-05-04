const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const customizedCategorySchema = new Schema(
  {
    castName: {
      type: String,
      required: true,
    },
    castImg: {
      type: String,
      required: true,
    },
    items: { type : Array},
    
  },
  { timestamps: true }
);
const CustomizedCategory = mongoose.model(
  "CustomizedCategory",
  customizedCategorySchema
);
module.exports = CustomizedCategory;
