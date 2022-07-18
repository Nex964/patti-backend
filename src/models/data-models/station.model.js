const mongoose = require('mongoose');
const { toJSON, paginate } = require('../plugins');

const stationSchema = mongoose.Schema(
  {

  },
  {
    strict: false,
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
stationSchema.plugin(toJSON);
stationSchema.plugin(paginate);

/**
 * @typedef Event
 */
const Station = mongoose.model('station', stationSchema);

module.exports = Station;
