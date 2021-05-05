const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema(
  {
    catName: {
      type: String,
      required: true,
    },
    catImg: {
      type: String,
      required: true, 
    }
    
  },
  { timestamps: true }
);
const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
