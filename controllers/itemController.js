const Item = require("../models/item");
//const {checkUser} = require("../middleware/userMiddleware");
//const User=require('../models/user');

const item_create_post = (req, res) => {
  
  const item = new Item(req.body);
  
  //checkUser.items = checkUser.items.concat(item._id);
  
  // checkUser
  // .save()
  // .then((result) => {
  //   res.json();
  //     })

  item
  .save() 
    .then((result) => {
      res.json();
    })
    .catch((err) => {
      console.log(err);
    });
    
  
  
};

const item_update= async(req,res)=>{
  const id = req.params.id;
  const item  = await Item.findByIdAndUpdate(id,{$set:req.body},{new:true}) 
  res.json(item)
}

const item_delete = (req, res) => {
  const id = req.params.id;
 
  Item
    .findByIdAndDelete(id)
    .then((result) => {
       res.json();
    }) 
    .catch((err) => {
      console.log(err);
    });
};

const item_index = (req, res) => {
  Item.find()
    .sort({ createdAt: -1 })
    .then((result) => {
       res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

const item_details = (req, res) => {
  const id = req.params.id;
  Item.findById(id)
    .then((result) => {
        res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  item_create_post,
  item_delete,
  item_index,
  item_details,
  item_update
};
 