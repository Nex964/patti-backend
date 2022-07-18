const httpStatus = require('http-status');
const pick = require('../../utils/pick');
const ApiError = require('../../utils/ApiError');
const catchAsync = require('../../utils/catchAsync');
const { railService } = require('../../services');

const getStations = catchAsync(async (req, res) => {
  const filter = {};

  if(req.query.text){
    filter['properties.name'] = { $regex: req.query.text, $options: 'i' };
  }

  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await railService.queryStations(filter, options);
  res.send(result);
});



module.exports = {
  getStations,
};
