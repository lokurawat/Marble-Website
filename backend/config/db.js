const mongoose=require("mongoose")
 const connectDb=async()=>{
 try {
    await mongoose.connect(process.env.MONGO_URL)
    console.log("the database is connected succesfully")
    
 } catch (error) {
    console.log({"the error is ":error.message})
 }

}
module.exports=connectDb