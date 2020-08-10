const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const User = require("./models/User");
const passport = require("passport");
const Strategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const tokenVerify = require("./tokenVerify");

require("dotenv").config();

//passport config
passport.use(
  new Strategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try {
        const userInfo = await User.find({ email: email });
        if (!userInfo) return done(null, false);

        let validPass = await bcrypt.compare(password, userInfo[0].password);

        if (!validPass) return done(null, false);

        return done(null, userInfo);
      } catch (error) {
        console.log(error);
      }
    }
  )
);

//initialize app and middleware
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(express.static(path.join(__dirname, "client/build")));

//routes

app.get("/api/profile", tokenVerify, async (req, res) => {
  try {
    const data = await User.findOne({ _id: req.user._id });
    res.send(data);
  } catch (error) {
    console.log(err);
  }
});

app.get("*", (req, res) => {
  res.redirect("/");
});

//register
app.post("/register", async (req, res) => {
  let emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("email already exists");

  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(req.body.password, 5, function (err, hash) {
      let newUser = new User({
        email: req.body.email,
        password: hash,
      });
      try {
        newUser.save();
        res.send("register success");
      } catch (err) {
        console.log(err);
      }
    });
  });
});

//login
app.post(
  "/login",
  passport.authenticate("local", { session: false }),
  (req, res) => {
    const token = jwt.sign({ _id: req.user[0]._id }, process.env.TOKEN_SECRET);
    res.cookie("token", token).send("success");
  }
);

//log out
app.post("/logout", (req, res) => {
  req.logout();
  res.redirect("https://auth-react-test.herokuapp.com/");
});

//db connection
mongoose
  .connect(process.env.MONGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => app.listen(process.env.PORT || 5000))
  .catch(err => console.log(err));
