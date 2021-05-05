const jwt = require("jsonwebtoken");
const { router } = require("../app");
const User=require('../models/user')
const jwt_decode = require("jwt-decode");


const requireUser = (req, res, next) => {
  const token = req.cookies.jwt;

  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, 'pi secret', (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        console.log('passed ');

       // res.redirect('/login');
      } else {
        //console.log(decodedToken);
        next();
      }
    });
  } else {
   // res.redirect('/login');
  }
};
// const requireAdmin = async (req, res,next ) => {
//    const id = jwt_decode(req.cookies.jwt);
//    const user = await User.findById(id.id);
   
//    if (user.role='user'){
    
//     console.log("this is user")
//     }else {
//       console.log("this is admin");
//       next()
//     }
//   }
  
// ;

// check current user
const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, 'pi secret', async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        next();
      } else {
        let user = await User.findById(decodedToken.id);
       // res.user=res.user;
        //res.locals.user = user;
        next();
      }
      //console.log("decodedToken.id",decodedToken.id)
    });
  } else { 
    res.locals.user = null;
    next();
  }
};

module.exports={requireUser,checkUser};