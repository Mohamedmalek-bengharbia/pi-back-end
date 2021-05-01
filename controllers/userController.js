const User = require("../models/user");
const jwt = require("jsonwebtoken");
const jwt_decode = require("jwt-decode");




// handle errors
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: '', password: '' };

  // incorrect email
  if (err.message === 'incorrect email') {
    errors.email = 'That email is not registered';
  }

  // incorrect password
  if (err.message === 'incorrect password') {
    errors.password = 'That password is incorrect';
  }

  // duplicate email error
  if (err.code === 11000) {
    errors.email = 'that email is already registered';
    return errors;
  }

  // validation errors
  if (err.message.includes('user validation failed')) {
    // console.log(err);
    Object.values(err.errors).forEach(({ properties }) => {
      // console.log(val);
      // console.log(properties);
      errors[properties.path] = properties.message;
    });
  }

  return errors;
}


const maxAge= 3*24*60*60;
const createToken = (id) => {
  return jwt.sign({ id }, 'pi secret', {
    expiresIn: maxAge
  });
};


const user_create_post = async (req, res) => {
  const { email, password,firstName,lastName,gender ,size,weight,skincolor,profileImg,role} = req.body;

  try {
    const user = await User.create({ email, password,firstName,lastName,gender ,size,weight,skincolor,profileImg ,role});
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: false, maxAge: maxAge * 1000 });
    res.status(201).json({ user: user,token:token });
  }
  catch(err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
 
}

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

   //  const user_index = (req, res) => {
  //   User.find()
  //      .sort({ createdAt: -1 })
  //      .then((result) => {
  //         res.json(result);
  //      })
  //      .catch((err) => { 
  //        console.log(err);
  //      });
  //  };
  
   const get_current_user = async (req, res) => {
    const id = jwt_decode(req.cookies.jwt);
    const user = await User.findById(id.id);
    User.find()
      
      .then((result) => {
        res.status(200).json({ user: user });
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
    //user_index,
    user_details,
    user_update,
    get_current_user
  };