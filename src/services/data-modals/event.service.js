const httpStatus = require('http-status');
const { EventModel } = require('../../models');
const ApiError = require('../../utils/ApiError');

/**
 * Create a event
 * @param {Object} Event Body
 * @returns {Promise<Event>}
 */
const add = async (eventBody) => {
  const event = await EventModel.create(eventBody);
  return event;
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
  const events = await EventModel.paginate(filter, options);
  return events;
};

 const get = async (filter, options) => {
  const events = await EventModel.findOne(filter);
  return events;
};

module.exports = {
  add,
  query,
  get
};
