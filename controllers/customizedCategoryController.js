const CustomizedCategory = require("../models/customizedCategory");
const User = require("../models/user");
const jwt_decode = require("jwt-decode");


const customizedCategory_create_post = async (req, res) => {
  const customizedCategory  = new CustomizedCategory(req.body);
  const id = jwt_decode(req.cookies.jwt);
  const user = await User.findByIdAndUpdate(id.id, { $push: { customizedCategories: customizedCategory } });
  const result = await user.save();
// const customizedCategory = new CustomizedCategory(req.body);
  customizedCategory
    .save()
    .then((result) => {
      res.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

const customizedCategory_update= async(req,res)=>{
  const id = req.params.id;
  const customizedCategory  = await CustomizedCategory.findByIdAndUpdate(id,{$set:req.body},{new:true}) 
  res.json(customizedCategory)
}

const customizedCategory_delete = async (req, res) => {
  const id = req.params.id;

  const id_user = jwt_decode(req.cookies.jwt);

  // console.log(id_user);
  const user = await User.findById(id_user.id);

  //console.log(user);
  const index = user.customizedCategories.findIndex((customizedCategory) =>customizedCategory._id == req.params.id);

  if (index !== -1) {
    user.customizedCategories.splice(index, 1);
  }
  //console.log(user);

  const result1 = await user.save();
  
  
  

  CustomizedCategory
    .findByIdAndDelete(id)
    .then((result) => {
       res.json();
    }) 
    .catch((err) => {
      console.log(err);
    });
};

const customizedCategory_index = (req, res) => {
 
  
  CustomizedCategory.find()
    .sort({ createdAt: -1 }) 
    .then((result) => {
       res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
};
 

const customizedCategory_details = async (req, res) => {
  const custcategorie = req.params.id;
  const id = jwt_decode(req.cookies.jwt);
  const user = await User.findById(id.id);
 const hope = user.customizedCategories.map( (item)=>{
     return item
  } )
  
  res.json(hope);

  
  
  

  // const id = req.params.id;
  // CustomizedCategory.findById(id).populate('items',{customized:0})
  //   .then((result) => {
  //       res.json(result);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
};

module.exports = {
    customizedCategory_create_post,
    customizedCategory_delete,
    customizedCategory_index,
    customizedCategory_details,
    customizedCategory_update,
};
 