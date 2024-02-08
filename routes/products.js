const express = require('express')
const catchAsync = require('../catchAsync')

const {addProduct, getAllProducts, getProduct, updateProduct, deleteProduct, getStaticProducts} = require('../controllers/products')

const productRouter = express.Router()

productRouter.route('/').get(catchAsync(getAllProducts)).post(catchAsync(addProduct))
productRouter.route('/static').get(getStaticProducts)
productRouter.route('/:id').get(catchAsync(getProduct)).patch(catchAsync(updateProduct)).delete(catchAsync(deleteProduct))



module.exports = productRouter