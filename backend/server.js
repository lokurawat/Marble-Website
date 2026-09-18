const express=require("express")
const db=require("./config/db")
const cors=require("cors")
const app=express()
const dotenv=require("dotenv")
dotenv.config()
const connectDb=require("./config/db")
connectDb();
app.use(express.json())
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}))
app.get("/",(req,res)=>{
    res.send("hello")
})
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));
app.use("/api/analytics",require("./routes/analyticsRoute"))
app.use("/api/contact", require("./routes/contactRoutes"));
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
