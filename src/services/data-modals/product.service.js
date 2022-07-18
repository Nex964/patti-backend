const httpStatus = require('http-status');
const { ProductModel } = require('../../models');
const ApiError = require('../../utils/ApiError');

/**
 * Create a product
 * @param {Object} Product Body
 * @returns {Promise<Product>}
 */
const add = async (productBody) => {
  const product = await ProductModel.create(productBody);
  return product;
};

/**
 * Query for clients
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
 const query = async (filter, options) => {
  const products = await ProductModel.paginate(filter, options);
  return products;
};

 const get = async (filter, options) => {
  const products = await ProductModel.findOne(filter);
  return products;
};

module.exports = {
  add,
  query,
  get
};
