const httpStatus = require('http-status');
const pick = require('../../utils/pick');
const ApiError = require('../../utils/ApiError');
const catchAsync = require('../../utils/catchAsync');
const { placeService } = require('../../services');

const createPlace = catchAsync(async (req, res) => {
  const place = await placeService.add(req.body);
  res.status(httpStatus.CREATED).send(place);
});


const getPlaces = catchAsync(async (req, res) => {
  const filter = {};

  if(req.query.text){
    filter.name = { $regex: req.query.text, $options: 'i' };
  }

  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await placeService.query(filter, options);
  res.send(result);
});



module.exports = {
  createPlace,
  getPlaces
};
