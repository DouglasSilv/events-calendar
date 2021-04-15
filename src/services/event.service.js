const { Event } = require('../models');

const queryEvents = async () => {
  const users = await Event.find();
  return users;
};

const createEvent = async eventBody => {
  const saved = await Event.create(eventBody);
  return saved;
};


module.exports = {
  queryEvents,
  createEvent
};