const catchAsync = require('../utils/catchAsync');
const { eventService } = require('../services');
const httpStatus = require('http-status');

const countGroupedByMonth = catchAsync(async (_, res) => {
  const result = await eventService.countGroupedByMonth();
  res.send(result);
});

const countMonthGroupedByDay = catchAsync(async (req, res) => {
  const result = await eventService.countMonthGroupedByDay(req.params.month);
  res.send(result);
});


const createEvent = catchAsync(async (req, res) => {
  const event = await eventService.createEvent(req.body);
  res.status(httpStatus.CREATED).send(event);
});

const getEventsByDay = catchAsync(async (req, res) => {
  const events = await eventService.getEventsByDay(req.params.date);
  res.send(events);
});

const deleteById = catchAsync(async (req, res) => {
  await eventService.deleteById(req.params.id);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  countGroupedByMonth,
  countMonthGroupedByDay,
  createEvent,
  getEventsByDay,
  deleteById
};