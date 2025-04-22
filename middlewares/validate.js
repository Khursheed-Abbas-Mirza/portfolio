const passport=require("passport")
const handleauthenticate=(req,res,next,strategy)=>{
    passport.authenticate(strategy,(err,user,info)=>{
        const gitauth=strategy.startsWith("git")
        if(err){
            return res.status(500).send({sucess:false,msg:err.message})
        }
        if(!user){
            return gitauth?res.status(400).send(`<h1>${info.msg}</h1>`):res.status(400).send({sucess:false,msg:info.msg})
        }

        req.session.save((err)=>{
            if(err){
                return res.send({sucess:false,msg:err})
            }
            req.logIn(user,(err)=>{
   
                if(err){
      
                    return res.send(err)
                }

                return gitauth?res.redirect("/?from_oauth=true"):res.send({sucess:true,payload:{user}})
            
            }
        )
        })
    })(req,res,next)
}
module.exports={handleauthenticate}