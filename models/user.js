const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: [isEmail, "Please enter a valid email"],
    },
    password: {
      type: String,
      required: true,
      minlength: [6, "minimum password length is 6 characters"],
    },
    gender: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    },
    skinColor: {
      type: String,
      required: true,
    },
    profileImg: {
      type: String,
      required: true,
    },
    items: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item",
      },
    ],
    customizedCategories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CustomizedCategory",
      },
    ],
  },
  { timestamps: true }
);
// userSchema.post('save',function(doc,next){
//   console.log('new user was created',doc);
//   next();
// });
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const connected = await bcrypt.compare(password, user.password);
    if (connected) {
      return user;
    }
    throw Error("incorrect password");
  }
  throw Error("incorrect email");
};

const User = mongoose.model("User", userSchema);
module.exports = User;
