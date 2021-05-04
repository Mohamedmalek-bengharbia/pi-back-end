const Category = require("../models/category");
const jwt_decode = require("jwt-decode");
const User = require("../models/user");

const category_create_post = (req, res) => {
  const category = new Category({catName:req.body.catName,catImg:req.file.path});
  category
    .save()
    .then((result) => {
      res.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

const category_update= async(req,res)=>{
  const id = req.params.id;
  const category  = await Category.findByIdAndUpdate(id,{$set:req.body},{new:true}) 
  res.json(category)
}

const category_delete = (req, res) => {
  const id = req.params.id;

  Category
    .findByIdAndDelete(id)
    .then((result) => {
       res.json();
    }) 
    .catch((err) => {
      console.log(err);
    });
};

const category_index = (req, res) => {
  Category.find()
    .sort({ createdAt: -1 }) 
    .then((result) => {
       res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

const category_details =async (req, res) => {
  const categorie = req.params.id;
  const id = jwt_decode(req.cookies.jwt);
  const user = await User.findById(id.id);
 const hope = user.items.filter( (item)=>{
     return item.itemName == categorie
  } )
  
  res.json(hope);
  // Category.findById(id)
  //   .then((result) => {
  //       res.json(result);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
};



module.exports = {
  category_create_post,
  category_delete,
  category_index,
  category_details,
  category_update,
};
 