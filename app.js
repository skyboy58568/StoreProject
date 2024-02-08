const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./db/connect");
const productRouter = require("./routes/products");
const notfoundError = require('./middleware/not-found')
const errorHandler = require('./middleware/error-handler')



const app = express();

connectDB(
    "mongodb://chisreerag:1234@ac-4hh06rk-shard-00-01.ivxs4r0.mongodb.net:27017,ac-4hh06rk-shard-00-02.ivxs4r0.mongodb.net:27017,ac-4hh06rk-shard-00-00.ivxs4r0.mongodb.net:27017/StoreAPI?authSource=admin&replicaSet=atlas-7k1zb8-shard-0&retryWrites=true&w=majority&tls=true"
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
