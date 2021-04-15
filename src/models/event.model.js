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

eventSchema.pre('save', async function (next) {
  // TODO: validar se ja existe evento com mesmo nome na mesma data
  next();
});

/**
 * @typedef Event
 */
 const Event = mongoose.model('Event', eventSchema);

 module.exports = Event;