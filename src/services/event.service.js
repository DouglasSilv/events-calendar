const { Event } = require('../models');

const queryEvents = async () => {
  const users = await Event.find();
  return users;
};


module.exports = {
  queryEvents,
};