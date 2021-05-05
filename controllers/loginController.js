const User = require("../models/user");
const jwt = require("jsonwebtoken");

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
const maxAge = 6* 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, "pi secret", {
    expiresIn: maxAge,
  });
};

const login_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: false, maxAge: maxAge * 1000 });
       res.status(200).json({ user: user, token: token });

  }  catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }

};
// const login_get = async (req, res) => {
//   const id = jwt_decode(req.cookies.jwt);
//   const user = await User.findById(id.id);
//   User.find()
//     .sort({ createdAt: -1 })
//     .then((result) => {
//       res.json(result);
//     })
//     .catch((err) => {
//       console.log(err);
//     }); 
//   res.render("login");
// };
module.exports = {
  login_post,
  //login_get
};
