const mongoose = require('mongoose');

const eventSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    startAt: {
      type: Date,
      required: true,
    },
    endAt: {
      type: Date,
      required: true,
    }
  }
)

/**
 * @typedef Event
 */
 const Event = mongoose.model('Event', eventSchema);

 module.exports = Event;