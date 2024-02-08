const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  featured: {
    type: Boolean,
    default: false,
  },
  rating: {
    type: Number,
    max: 5,
    min: 1,
    default: 4.5,
  },
  name: {
    type: String,
    required: [true, "product should have a name"],
    maxlength: 20,
    minlength: 5,
  },
  company: {
    type: String,
    enum: {
     values:    ["ikea", "liddy", "caressa", "marcos"],
     message: `{VALUE} is not supported`
    }
   
  },
  price: {
    type: Number,
    required: [true, "product should have price"],
  },
});

productSchema.set("timestamps", true);
productSchema.set('strictQuery',true)

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
