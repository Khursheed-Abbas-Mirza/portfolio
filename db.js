const {Sequelize,DataTypes}=require("sequelize")
require("dotenv").config()
const sequelize=new Sequelize(process.env.DB_URL,{
    logging:false
})

const checkconnection=async()=>{
    try {
        await sequelize.authenticate();
        sequelize.sync()
        console.log("Connected to Database",sequelize.config.database)
    } catch (error) {
        console.log(error.message)
    }
}
checkconnection()
module.exports={sequelize,DataTypes}
