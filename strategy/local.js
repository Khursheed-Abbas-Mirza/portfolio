const passport=require("passport")
const Strategy=require("passport-local").Strategy
const UserModel=require("../models/User")
const bcrypt=require("bcrypt")
const {v4:uuid}=require("uuid")
const { where } = require("sequelize")

passport.use("Signup",new Strategy({usernameField:"email"},async(email,password,done)=>{
    try {
    if(!email||!password){
        return done(null,false,{msg:"Please enter valid credentials"})
    }
    const finduser=await UserModel.findOne({where:{email:email}})
    
    if(finduser){
      return  done(null,false,{msg:"User Already Exists"})
    }
    const salt=await bcrypt.genSalt(8)
    const hashedpassword=await bcrypt.hash(password,salt)
    const user=await UserModel.create({id:uuid(),email:email,password:hashedpassword,username:email.split("@")[0]},{raw:true})


    done(null,user.dataValues)
} catch (error) {
    
        done(error.message)
}
}))
passport.use("Signin",new Strategy({usernameField:"email"},async(email,password,done)=>{
    if(!email || !email.trim()){
        return done(new Error("Email is required field"))
    }
    const finduser=await UserModel.findOne({where:{email:email}})
    if(!finduser){
        return done(null,false,{msg:"No user Found with this profile"})
    }
    const passworsmatch=await bcrypt.compare(password,finduser.password)
    if(!passworsmatch){
        return done(null,false,{msg:"Invalid credentials email or password is incorrect"})
    }
    done(null,finduser)
}))
passport.serializeUser((user,done)=>{
    return done(null,user.id)
})
passport.deserializeUser(async(id,done)=>{

    try {
        const user=await UserModel.findByPk(id)
        done(null,user)      
    } catch (error) {
        done(error)
    }

})
module.exports=passport