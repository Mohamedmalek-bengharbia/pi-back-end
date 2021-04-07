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
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    customizedCategories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CustomizedCategory",
      },
    ],
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
  },
  { timestamps: true }
);
const Item = mongoose.model("Item", itemSchema);
module.exports = Item;
