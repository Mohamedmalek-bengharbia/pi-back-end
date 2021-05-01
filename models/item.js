const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = new Schema(
  {
    itemName: {
      type: String,
      required: true,
    },
    itemImg: {
      type: String,
      required: true,
    }
    //,
    // user: 
      
    //     { type : Array},
      
    

    // customizedCategories: 
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "CustomizedCategory",
    //   },
    

    //, category: {
    //   type: String,
    // },
  },
  { timestamps: true }
);
const Item = mongoose.model("Item", itemSchema);
module.exports = Item;
