const User = require("../models/user");
const jwt = require("jsonwebtoken");

const maxAge = 3 * 24 * 60 * 60;
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
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ user: user.userName });
    //{ user: user.userName }
  } catch (err) {
    res.status(400).json();
  }
};
// const login_get = (req, res) => {
//   res.render("login");
// };
module.exports = {
  login_post,
  //login_get,
};
