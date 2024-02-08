const Product = require("../models/product");
const { options } = require("../routes/products");

exports.addProduct = async () => {
  console.log("CreateProduct");
};

exports.getStaticProducts = async (req, res) => {
  const search = "a";
  const products = await Product.find({
    price: { $gt: 100 },
  });

  res.status(200).json({ products: products, nbHits: products.length });
};

exports.getAllProducts = async (req, res) => {

    let filterString ={}

    if (req.query.filter) {
        const operatorMap = {
          '>': '$gt',
          '>=': '$gte',
          '=': '$eq',
          '<': '$lt',
          '<=': '$lte',
        };
        const regEx = /\b(<|>|>=|=|<|<=)\b/g;
        let filters = req.query.filter.replace(
          regEx,
          (match) => `-${operatorMap[match]}-`
        );
        const options = ['price', 'rating'];
        filters = filters.split(',').forEach((item) => {
          const [field, operator, value] = item.split('-');
          if (options.includes(field)) {
            filterString[field] = { [operator]: Number(value) };
          }
        });
      }
    
    let queryObject = Product.find(filterString);

  

  if (req.query.sort) {
    const fields = req.query.sort.split(",").join(" ");
    queryObject = queryObject.sort(fields);
  } else {
    queryObject = queryObject.sort("-createdAt");
  }

  if (req.query.name) {
    queryObject = queryObject.find({
      name: { $regex: req.query.name, $options: "i" },
    });
  }

  if (req.query.fields) {
    let list = req.query.fields.split(",").join(" ");

    queryObject = queryObject.select(list);
  }

  let page = Number(req.query.page) || 1;
  let limit = Number(req.query.limit) || 10;
  let skip = (page - 1) * limit;

  queryObject = queryObject.skip(skip).limit(limit);

 


  

  const products = await queryObject;

  res.status(200).json({ products: products, nbHits: products.length });
};

exports.getProduct = async () => {
  console.log("get a Product");
};

exports.updateProduct = async () => {
  console.log("get a Product");
};

exports.deleteProduct = async () => {
  console.log("get a Product");
};
