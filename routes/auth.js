const router = require("express").Router();
const User = require("../models/User");
const { registerValidation } = require("../validation");

router.post("/signup", async (req, res) => {
  //Validate the data before go to DB

  const { error } = registerValidation(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  //checking if the user is already in the database
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("email is already exist");
  //create a new user
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  try {
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (err) {
    res.status(400).send(err);
  }
});

// router.post('/signin');

module.exports = router;

//////////42.24