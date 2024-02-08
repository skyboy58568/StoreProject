const mongoose = require('mongoose');

const connectDB = require("./db/connect");

const Product = require("./models/product");

const products = require("./products.json")

connectDB(
  "mongodb+srv://chisreerag:1234@mynodeprojects.ivxs4r0.mongodb.net/StoreAPI?retryWrites=true&w=majority"
)
  .then(() => console.log("Mongo server started"))
  .catch((err) => console.log("Mongo Error"));

const populate = async (products) => {
  await Product.insertMany(products, { new: true });
};

populate(products).then(() => console.log('Success')).catch(err => console.log(err))
