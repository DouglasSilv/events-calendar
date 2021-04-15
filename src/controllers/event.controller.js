const catchAsync = require('../utils/catchAsync');
const { eventService } = require('../services');
const httpStatus = require('http-status');

const getEvents = catchAsync(async (req, res) => {
  const result = await eventService.queryEvents();
  res.send(result);
});

const createEvent = catchAsync(async (req, res) => {
  const event = await eventService.createEvent(req.body);
  res.status(httpStatus.CREATED).send(event);
});

module.exports = {
  getEvents,
  createEvent
};