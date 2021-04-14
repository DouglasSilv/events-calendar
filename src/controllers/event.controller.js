const catchAsync = require('../utils/catchAsync');
const { eventService } = require('../services');

const getEvents = catchAsync(async (req, res) => {
  const result = await eventService.queryEvents();
  res.send(result);
});

module.exports = {
  getEvents,
};