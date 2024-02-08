const mongoose = require('mongoose');

const connectDB = require("./db/connect");

const Product = require("./models/product");

const products = require("./products.json")

connectDB(
  process.env.MONGO_URL
)
  .then(() => console.log("Mongo server started"))
  .catch((err) => console.log("Mongo Error"));

const populate = async (products) => {
  await Product.insertMany(products, { new: true });
};

populate(products).then(() => console.log('Success')).catch(err => console.log(err))
