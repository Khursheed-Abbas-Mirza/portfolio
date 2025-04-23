const passport=require("passport")
const Strategy=require("passport-github2").Strategy
require("dotenv").config()
const UserModel=require("../models/User")
const {v4:uuid}=require("uuid")
passport.use("github-signup",new Strategy({
    clientID:process.env.CLIENT_ID,
    clientSecret:process.env.CLIENT_SECRET,
    callbackURL:"https://portfolio-khursheed-abbas-mirzas-projects.vercel.app/github/user/callback?action=signup",
},async(accesstoken,refreshtoken,profile,done)=>{
    const username=profile.username
    const githubId=profile.id 
    const email=profile.emails?profile.emails[0].value:null
    try {
        
    if(!githubId || !username){
      return  done(new Error("Invalid Profile"))
    }
    if(!email){
        return done(null,false,{msg:"Make your email public in github profile or try with another account <a style='margin-right:14px' href='/'>home</a><a href='signup'>Sigunup</a>"})
    }
        const finduser=await UserModel.findOne({where:{email:email}})
  
  
    if(finduser){
        return done(null,false,{msg:"User already exists "})
    }
    const user=await UserModel.create({id:uuid(),email:email,password:null,username:username,githubId:githubId})
    
    done(null,user.dataValues)
} catch (error) {
        done(error)
}
}))
passport.use("github-signin",new Strategy({
    clientID:process.env.CLIENT_ID,
    clientSecret:process.env.CLIENT_SECRET,
    callbackURL:"https://portfolio-khursheed-abbas-mirzas-projects.vercel.app/github/user/callback?action=signin",
},async(accesstoken,refreshtoken,profile,done)=>{
    const username=profile.username
    const githubId=profile.id 
    const email=profile.emails?profile.emails[0].value:null
    try {
        
    
    if(!githubId || !username){
      return  done(new Error("Invalid Profile"))
    }
        const finduser=await UserModel.findOne({where:[{email:email},{githubId:githubId}]})
  
        
        if(!finduser){
            return done(null,false,{msg:"No user Found with this profile try with another account or signup. for signup <a href='/signup'>Clickhere</a> "})
        }
        done(null,finduser.dataValues)

} catch (error) {

        done(error)
}
}))
passport.serializeUser((user,done)=>{
    done(null,user.id)
})
passport.deserializeUser(async(id,done)=>{
    try {
        const user=await UserModel.findById(id)
        done(null,user)
    } catch (error) {
        done(error)
    }

})
module.exports=passport
