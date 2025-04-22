const express=require("express")
const app=express()
const serverless=require("serverless-http")
const {sequelize}=require("./db")
const session=require("express-session")
const dotenv=require("dotenv")
dotenv.config()
const user=require("./routes/user")
const SequelizeStore = require("connect-session-sequelize")(session.Store)
const githubuser=require("./routes/gituser")
const passport = require("passport")
const path=require("path")

    
    const sessionstore=new SequelizeStore({db:sequelize})

const cors=require("cors")
app.use(express.json())
app.use(cors({}))
app.use("/assets",express.static(path.join(__dirname, "assets")))
app.use("/views",express.static(path.join(__dirname, "views")))
app.use(session({
    name:"portfolio",
    saveUninitialized:false,
    resave:false,
    secret:process.env.SECRET,
    cookie:{maxAge:24*60*60*1000*14},
    store:sessionstore
    
}))

app.use(passport.initialize())
app.use(passport.session())
app.use("/user",user)
app.use("/github",githubuser)
app.get('/',(req,res)=>{
    res.sendFile(__dirname+"/views/index.html")
})
app.get('/login',(req,res)=>{
    res.sendFile(__dirname+"/views/index.html")
})

app.get('/signup',(req,res)=>{
    res.sendFile(__dirname+"/views/index.html")
})

app.get("/status",(req,res)=>{
    if(req.isAuthenticated()){
        const {username,email}=req.user
        return res.send({success:true,payload:{username,email}})
    }
    res.status(400).send({msg:"Un authorized access"})
})
app.get("/resume-download",(req,res)=>{
    try {
        res.download(__dirname+"/assets"+"/resume.pdf",(err)=>{
            if(err){
                console.error('Error downloading the file:', err);
                res.status(500).send('Error downloading the file');
            }
        })
    } catch (error) {
        console.log(error.message)
}
})
app.get("/logout",(req,res)=>{
    req.logOut((err)=>{
        if(err){
          return  res.send({sucess:false,err:err})
        }

            req.session.destroy(()=>{
                res.clearCookie("portfolio")
              
                res.send({success:true,msg:"user logout sucessfully"})
            })
        
})
})
app.listen(3000,()=>{
    console.log("Listening on port 3000")
})
module.exports.handler = serverless(app);
