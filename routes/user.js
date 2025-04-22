const Router=require("express").Router()
const passport=require("../strategy/local")
const {handleauthenticate}=require("../middlewares/validate")

Router.post("/signup",(req,res,next)=>{

  handleauthenticate(req,res,next,"Signup")
})
Router.post('/login',(req,res,next)=>{
  handleauthenticate(req,res,next,"Signin")
})

module.exports=Router