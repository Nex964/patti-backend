const mongoose = require('mongoose');
const { toJSON, paginate, autoIncrement } = require('../plugins');

const placeSchema = mongoose.Schema(
  {
    no: {
      type: Number,
      trim: true,
    },
    name: {
      type: String,
      trim: true,
      required: true
    },
    loc: {
      type: { type: String },
      coordinates: [Number],
    },
    meta: [{
      name: { type: String },
      value: { type: String }
    }]
  },
  {
    timestamps: true,
  }
);

autoIncrement.initialize(mongoose.connection);

// add plugin that converts mongoose to json
placeSchema.plugin(toJSON);
placeSchema.plugin(paginate);
placeSchema.plugin(autoIncrement.plugin, { model: 'place', field: 'no' });

/**
 * @typedef Place
 */
const Place = mongoose.model('place', placeSchema);

module.exports = Place;
