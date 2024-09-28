const jwt = require("jsonwebtoken");
const usermodel = require("../models/usermodel");

module.exports.isLoggedIn = async function (req,res,next){
  let token = req.cookies.token;
  if(!token) return req.flash("error","you should login first") , res.redirect("/");
 try{
  let decoded = jwt.verify(token,process.env.JWT_SECRET);
  let user = await usermodel.findOne({_id:decoded._id}).select("-password");
  if(!user) return res.status(400).send("you should login first");
  req.user = user;
  next();
 }catch(err){
  req.flash("error",err.message);
  res.redirect("/");
 }
}
