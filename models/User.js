const {sequelize,DataTypes}=require("../db")

const User=sequelize.define("User",{
    id:{
        type:DataTypes.STRING,
        primaryKey:true,
        unique:true
    },
    email:{
        type:DataTypes.STRING,
        unique:true
    }
    ,
    password:{
        type:DataTypes.STRING,
        allowNull:true
    },
    username:{
        type:DataTypes.STRING,
    },
    githubId:{
        type:DataTypes.STRING
    }
},{
    tableName:"users",
    timestamps:false
})
const check=async()=>{
    await User.sync({})
}

module.exports=User