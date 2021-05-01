const Item = require("../models/item");
const { checkUser } = require("../middleware/userMiddleware");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const jwt_decode = require("jwt-decode");
const Category = require("../models/category");
const CustomizedCategory = require ("../models/customizedCategory");


const item_create_post = async (req, res) => {
  const item = new Item(req.body);
  const id = jwt_decode(req.cookies.jwt);
  const user = await User.findByIdAndUpdate(id.id, { $push: { items: item } });
  const result = await user.save();

  // item = await Item.populate( { user: user } );
  // const send = await item.save();
 
  //const send = await item.save();
  //  const  it = await Item.findByIdan(id.id, { $push: { users: user } });
  //  
  // const cat = await Category.findOne({ catName: item.category });
  // cat.items = cat.items.concat(item._id);
  // await cat.save();

  item
    .save()
    .then((result) => {
      res.send(user);
    })
    .catch((err) => {
      console.log(err);
    });
};  

const item_cust_post = async (req,res)=>{
  
  
  
  
  
  
  
  
  // const item =new Item(req.body);
  // const cust_cat = await CustomizedCategory.findOne({ castName:item.customized});
  // cust_cat.items = cust_cat.items.concat(item._id) ;
  // await cust_cat.save();
  // item
  // .save()
  // .then((result) => {
  //   res.send(item);
  // })
  // .catch((err) => {
  //   console.log(err);
  // });

}

const item_update = async (req, res) => {
  const id = req.params.id;
  const item = await Item.findByIdAndUpdate(
    id,
    { $set: req.body },
    { new: true }
  );
  res.json(item);
};

const item_delete = async (req, res) => {
  const id = req.params.id;

  const id_user = jwt_decode(req.cookies.jwt);

  // console.log(id_user);
  const user = await User.findById(id_user.id);

  //console.log(user);
  const index = user.items.findIndex((item) => item._id == req.params.id);

  if (index !== -1) {
    user.items.splice(index, 1);
  }
  //console.log(user);

  const result1 = await user.save();
  
  
  
  // const cat = req.params.cat;
  // const this_cat = await Category.findOne({catName:cat});
  // this_cat.items = this_cat.items.filter(i=>i._id.toString()!=id);
  // this_cat.save()
  Item.findByIdAndDelete(id)
    .then((result) => {
      res.send(result1);
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
  item_update,
  item_cust_post
};
