const httpStatus = require('http-status');
const pick = require('../../utils/pick');
const ApiError = require('../../utils/ApiError');
const catchAsync = require('../../utils/catchAsync');
const { eventService } = require('../../services');

const createEvent = catchAsync(async (req, res) => {
  const event = await eventService.add(req.body);
  res.status(httpStatus.CREATED).send({ success: true, data: event});
});


const getEvents = catchAsync(async (req, res) => {
  const filter = {};

  if(req.query.text){
    filter.name = { $regex: req.query.text, $options: 'i' };
  }

  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await eventService.query(filter, options);
  res.send(result);
});

const getEvent = catchAsync(async (req, res) => {

  const filter = {};
  // To add convinece of having name and Id for fetching
  const eventId = req.params.eventId;

  if(eventId){
    filter.$or = [];
    filter.$or.push({ name: { $regex: eventId.replace('%20', ' '), $options: 'i' } })
    filter.$or.push({ _id: eventId })
  }

  const result = await eventService.get(filter);
  res.send({success: result != null, result});
});



module.exports = {
  createEvent,
  getEvents,
  getEvent
};
