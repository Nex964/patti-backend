const httpStatus = require('http-status');
const { PlaceModel } = require('../../models');
const ApiError = require('../../utils/ApiError');

/**
 * Create a place
 * @param {Object} Place Body
 * @returns {Promise<Place>}
 */
const add = async (placeBody) => {
  const place = await PlaceModel.create(placeBody);
  return place;
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

  const sq = require('../../../nc.json');

  // await PlaceModel.create(sq.features.map(e => {
  //   const obj = {
  //     name: e.properties.Name,
  //     meta: [{
  //       name: 'address',
  //       value: e.properties.ADDRESS
  //     }],
  //     loc: {
  //       type: 'Point',
  //       coordinates: e.geometry.coordinates
  //     }
  //   }
  //   return obj;
  // }));

  console.log('Created');

  const places = await PlaceModel.paginate(filter, options);
  return places;
};

module.exports = {
  add,
  query
};
