const httpStatus = require('http-status');
const pick = require('../../utils/pick');
const ApiError = require('../../utils/ApiError');
const catchAsync = require('../../utils/catchAsync');
const { productService } = require('../../services');

const createProduct = catchAsync(async (req, res) => {
  const product = await productService.add(req.body);
  res.status(httpStatus.CREATED).send({ success: true, data: product});
});

const getProducts = catchAsync(async (req, res) => {
  const filter = {};

  if(req.query.text){
    filter.name = { $regex: req.query.text, $options: 'i' };
  }

  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await productService.query(filter, options);
  res.send(result);
});

const getProduct = catchAsync(async (req, res) => {

  const filter = {};

  console.log(req.params);

  const productId = req.params.productId;

  if(productId){
    filter.$or = [];
    filter.$or.push({ name: { $regex: productId.replace('%20', ' '), $options: 'i' } })
    filter.$or.push({ _id: productId })
  }

  const result = await productService.get(filter);
  res.send({success: result != null, result});
});



module.exports = {
  createProduct,
  getProducts,
  getProduct
};
