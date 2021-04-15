const { Event } = require('../models');

const countGroupedByMonth = async () => {
  const events = await Event.find();
  const groupedEvents = {};
  Array(12).fill().forEach((month, index) => {
    groupedEvents[index] = events.filter(event => event.startAt.getMonth() === index).length;
  })
  return groupedEvents;
};

const createEvent = async eventBody => {
  const saved = await Event.create(eventBody);
  return saved;
};


module.exports = {
  countGroupedByMonth,
  createEvent
};