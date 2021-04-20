const User = require("../models/user");
const jwt = require("jsonwebtoken");


const maxAge= 3*24*60*60;
const createToken = (id) => {
  return jwt.sign({ id }, 'pi secret', {
    expiresIn: maxAge
  });
};

const user_create_post = (req, res) => {

    const user = new User(req.body);
    const token=createToken(user._id);
    res.cookie('jwt',token,{httpOnly:true,maxAge:maxAge*1000})
    user
      .save()
      .then((result) => {
        res.json({user:user._id,token:token});
      })
      .catch((err) => {
        console.log(err);
      });
  };
const user_update= async(req,res)=>{
  const id = req.params.id;
  const user  = await User.findByIdAndUpdate(id,{$set:req.body},{new:true}) 
  res.json(user)
}

  
   const user_delete = (req, res) => {
     const id = req.params.id;
  
     User
       .findByIdAndDelete(id) 
       .then((result) => {
          res.json();
       }) 
       .catch((err) => {
         console.log(err);
       });
   };
   const user_index = (req, res) => {
    User.find()
       .sort({ createdAt: -1 })
       .then((result) => {
          res.json(result);
       })
       .catch((err) => { 
         console.log(err);
       });
   };
  
   const user_details = (req, res) => {
     const id = req.params.id;
     User.findById(id)
       .then((result) => {
           res.json(result);
     })
       .catch((err) => {
         console.log(err);
       });
   };

   

  module.exports = {
    user_create_post,
    user_delete,
    user_index,
    user_details,
    user_update,
  };