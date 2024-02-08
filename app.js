const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./db/connect");
const productRouter = require("./routes/products");
const notfoundError = require('./middleware/not-found')
const errorHandler = require('./middleware/error-handler')
const dotenv = require('dotenv')

dotenv.config({path:'./config.env'})




const app = express();

connectDB(
   process.env.MONGO_URL
  )
    .then(() => console.log("Mongo server started"))
    .catch((err) => console.log("Mongo Error"));

app.use(express.urlencoded({extended:true})) 
app.use(express.json())   
app.use("/api/v1/products", productRouter);
app.use(notfoundError)
app.use(errorHandler)


app.listen(3000, () => {
  console.log("Server started at 3000");
});
