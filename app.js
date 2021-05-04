const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
var cors = require("cors");

const customizedCategoryRoutes = require("./routes/customizedCategoryRoutes");
const logoutRoutes = require("./routes/logoutRoutes");
const loginRoutes = require("./routes/loginRoutes");
const userRoutes = require("./routes/userRoutes");
const itemRoutes = require("./routes/itemRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const { checkUser } = require("./middleware/userMiddleware");
const app = express();
const dURI =
  "mongodb+srv://malek:test1234@cluster0.3cecn.mongodb.net/test-pi?retryWrites=true&w=majority";

mongoose
  .connect(dURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(3001))
  .catch((err) => console.log(err));
var cors = require("cors");
var corsOptions = {
  origin: "*",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use('/uploads', express.static('uploads'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use((req, res, next) => {
  res.locals.path = res.path;
  next();
});

app.get("*", checkUser);
app.post("*", checkUser);

app.use("/users", userRoutes);
app.use("/items", itemRoutes);
app.use("/categories", categoryRoutes);
app.use("/login", loginRoutes);
app.use("/logout", logoutRoutes);
app.use("/customizedCategories", customizedCategoryRoutes);

module.exports = app;
