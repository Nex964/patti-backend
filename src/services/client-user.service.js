const httpStatus = require('http-status');
const { ClientUser, ClientUserLog } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a user
 * @param {Object} clientBody
 * @returns {Promise<User>}
 */
const createClient = async (clientBody) => {
  // if (await User.isEmailTaken(userBody.email)) {
  //   throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  // }
  const user = await ClientUser.create(clientBody);
  return user;
};

/**
 * Updates client details and store last values in [client log]
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
 const updateByPan = async (pan, updateBody) => {
  
  const lastValues = await ClientUser.findOneAndUpdate({ pan: pan }, updateBody, { new: false, upsert: false });
  const log = {};
  for(let key of Object.keys(lastValues.toObject())){
    if(key == '_id' || key == 'createdAt') continue;
    log[key] = lastValues[key];
  }
  console.log(log);
  await ClientUserLog.create(log);

  return lastValues;
};


/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
 const test = async () => {
  return {message: "works"};
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
const queryClients = async (filter, options) => {
  const clients = await ClientUser.paginate(filter, options);
  return clients;
};

/**
 * Query for all clients
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryAllClients = async (filter, options) => {
  const clients = await ClientUser.find(filter, options);
  return clients;
};

/**
 * Query for all clients
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
 const queryAllClientLogs = async (filter, options) => {
  const clients = await ClientUserLog.find(filter, options);
  return clients;
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getUserById = async (id) => {
  return ClientUser.findById(id);
};

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<User>}
 */
const getUserByEmail = async (email) => {
  return ClientUser.findOne({ email });
};

/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateUserById = async (userId, updateBody) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  if (updateBody.email && (await ClientUser.isEmailTaken(updateBody.email, userId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(user, updateBody);
  await user.save();
  return user;
};

/**
 * Delete user by id
 * @param {ObjectId} userId
 * @returns {Promise<User>}
 */
const deleteUserById = async (userId) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  await user.remove();
  return user;
};

module.exports = {
  test,
  createClient,
  updateByPan,
  queryClients,
  queryAllClients,
  queryAllClientLogs,
  getUserById,
  getUserByEmail,
  updateUserById,
  deleteUserById,
};
