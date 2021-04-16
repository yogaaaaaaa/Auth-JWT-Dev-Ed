const dotenv = require("dotenv");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
// const uri = process.env.MONGO_URI;

// require("dotenv").config({
//   path: `.env.${process.env.NODE_ENV}`,
// });

dotenv.config();

//===================connect to DB======================================
mongoose.connect(process.env.MONGO_URI, { 
    useUnifiedTopology: true, // Must be added
    useNewUrlParser: true, // Must be added
    useCreateIndex: true, // Use to enable unique data type
    useFindAndModify: false, // Use findOneAndUpdate instead of findAndModify
 }, () => {
  console.log("connected to mongodb");
});

// Body parser
app.use(express.json()); // Enable json req.body
app.use(
  express.urlencoded({
    extended: true,
  })
); // Enable req.body urlencoded

//import routes
const authRoute = require("./routes/auth");

//===================Route Middleware======================================
app.use("/api/user", authRoute);




//====================PORT running=========================================
let PORT = 3000 || process.env.PORT;
app.listen(PORT, () => console.log(`Server running on ${PORT}!`));
