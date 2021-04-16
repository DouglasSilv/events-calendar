const { Event } = require('../models');
const { endOfDay, startOfDay } = require('date-fns');

const daysInMonth = (month, year) => {
  const date = new Date(year, month + 1, 0).getDate();
  return Array.from(Array(date).keys());
};

const countGroupedByMonth = async () => {
  const events = await Event.find();
  const groupedEvents = {};
  Array(12).fill().forEach((month, index) => {
    groupedEvents[index] = events.filter(event => event.startAt.getMonth() === index).length;
  })
  return groupedEvents;
};

const countMonthGroupedByDay = async monthIndex => {
  const events = await Event.find();
  const groupedEvents = {};
  daysInMonth(monthIndex, new Date().getFullYear()).fill().forEach((_, index) => {
    const day = index + 1;
    groupedEvents[day] = events
          .filter(event => event.startAt.getDate() === day 
                            && Number(event.startAt.getMonth()) === Number(monthIndex)).length;
  })
  return groupedEvents;
};

const getEventsByDay = async date => {
  return await Event.find({
    startAt:  {
      $gte: startOfDay(new Date(date)),
      $lte: endOfDay(new Date(date))
    }
  });
};

const createEvent = async eventBody => {
  const saved = await Event.create(eventBody);
  return saved;
};


module.exports = {
  countGroupedByMonth,
  countMonthGroupedByDay,
  createEvent,
  getEventsByDay
};