
const jwt = require("jsonwebtoken");




const logout_get =(req,res)=>{
    res.cookie('jwt','',{maxAge:1 });
   res.status(200).json();
    //res.redirect('/')
    console.log('Disconnected')
}
module.exports = {
    
    logout_get,
  };