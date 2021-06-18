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
    },
    lat: {
      type: Number,
      required: true,
    },
    lng: {
      type: Number, 
      required: true,
    }
  }
)

/**
 * @typedef Event
 */
 const Event = mongoose.model('Event', eventSchema);

 module.exports = Event;