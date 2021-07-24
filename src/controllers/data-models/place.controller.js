const httpStatus = require('http-status');
const pick = require('../../utils/pick');
const ApiError = require('../../utils/ApiError');
const catchAsync = require('../../utils/catchAsync');
const { placeService } = require('../../services');

const createPlace = catchAsync(async (req, res) => {
  const place = await placeService.add(req.body);
  res.status(httpStatus.CREATED).send({ success: true, data: place});
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

const getPlace = catchAsync(async (req, res) => {

  const filter = {};

  console.log(req.params);

  const placeId = req.params.placeId;

  if(placeId){
    filter.$or = [];
    filter.$or.push({ name: { $regex: placeId.replace('%20', ' '), $options: 'i' } })
    filter.$or.push({ _id: placeId })
  }

  const result = await placeService.get(filter);
  res.send({success: result != null, result});
});



module.exports = {
  createPlace,
  getPlaces,
  getPlace
};
