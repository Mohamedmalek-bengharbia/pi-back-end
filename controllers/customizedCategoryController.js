const CustomizedCategory = require("../models/customizedCategory");

const customizedCategory_create_post = (req, res) => {
  const customizedCategory = new CustomizedCategory(req.body);
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

const customizedCategory_delete = (req, res) => {
  const id = req.params.id;

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

const customizedCategory_details = (req, res) => {
  const id = req.params.id;
  CustomizedCategory.findById(id)
    .then((result) => {
        res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
    customizedCategory_create_post,
    customizedCategory_delete,
    customizedCategory_index,
    customizedCategory_details,
    customizedCategory_update,
};
 