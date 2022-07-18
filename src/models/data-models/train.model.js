const mongoose = require('mongoose');
const { toJSON, paginate } = require('../plugins');

const trainSchema = mongoose.Schema(
  {

  },
  {
    strict: false,
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
trainSchema.plugin(toJSON);
trainSchema.plugin(paginate);

/**
 * @typedef Event
 */
const Schedule = mongoose.model('train', trainSchema);

module.exports = Schedule;
