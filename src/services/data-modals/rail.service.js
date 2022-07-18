const httpStatus = require('http-status');
const { TrainModel, ScheduleModel, StationModel } = require('../../models');
const ApiError = require('../../utils/ApiError');


/**
 * Query for clients
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */


 const queryStations = async (filter, options) => {
  const stations = await StationModel.paginate(filter, options);
  return stations;
};

 const queryTrains = async (filter, options) => {
  const trains = await TrainModel.paginate(filter, options);
  return trains;
};

 const querySchedule = async (filter, options) => {
  const schedules = await ScheduleModel.paginate(filter, options);
  return schedules;
};

module.exports = {
  queryStations,
  queryTrains,
  querySchedule,
};
