const usermodel = require("../models/usermodel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {generateToken} = require("../utils/generateToken");

module.exports.register = async function (req, res) {
    try {
      let { email, password, fullname } = req.body;
  
      let user = await usermodel.findOne({email:email}).then((user)=>{
        if(user){
          return res.status(400).send("User already exists");
        }else{
          // Generate salt and hash the password
      bcrypt.genSalt(10, function (err, salt) {
        if (err) {
          return res.status(500).send(err.message); // Handle salt generation error
        }
  
        bcrypt.hash(password, salt, async function (err, hash) {
          if (err) {
            return res.status(500).send(err.message); // Handle hashing error
          } else {
            try {
              // Create a new user with the hashed password
              let user = await usermodel.create({
                email,
                password: hash, // Store the hashed password
                fullname,
              });
              await user.save();
              let token = generateToken(user);
              // send the cookie to the user
              res.cookie("token", token);
              // Send the token as a response
              res.send({ message: "User created successfully" });
            } catch (err) {
              res.status(500).send(err.message); // Handle database/user creation error
            }
          }
            });
          });
        }
      })

      
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Internal server error"); // Catch unexpected errors
    }
  };

  module.exports.login = async function (req, res) {
    let {email,password} = req.body;
    let user = await usermodel.findOne({email:email});
    if(!user) return res.status(400).send("User not found");
    
     bcrypt.compare(password, user.password,function(err,result){
      if(err) return res.status(500).send(err.message);
      if(!result) return res.status(400).send("Invalid password");

      let token = generateToken(user);
      res.cookie("token",token);
      res.send({message:"Login successful"});
     });
   
    
  }


  
  