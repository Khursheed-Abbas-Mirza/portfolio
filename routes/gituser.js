const Router=require("express").Router()
const passport=require("../strategy/github")
const {handleauthenticate}=require("../middlewares/validate")
Router.get("/user/signup",passport.authenticate('github-signup',{scope:['user:email']}))
Router.get("/user/login",passport.authenticate('github-signin',{scope:['user:email']}))
Router.get("/user/callback",(req,res,next)=>{
    const action=req.query.action==="signup"?"github-signup":"github-signin"
    handleauthenticate(req,res,next,action)
})
module.exports=Router