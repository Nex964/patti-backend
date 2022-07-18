const mongoose = require('mongoose');
const { toJSON, paginate } = require('../plugins');

const scheduleSchema = mongoose.Schema(
  {

  },
  {
    strict: false,
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
scheduleSchema.plugin(toJSON);
scheduleSchema.plugin(paginate);

/**
 * @typedef Event
 */
const Schedule = mongoose.model('schedule', scheduleSchema);

module.exports = Schedule;
