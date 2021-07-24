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
    desc: {
      type: String,
      trim: true,
      required: true
    },
    media: [{
      type: String,
      required: true
    }],
    tags: [{
      type: String,
      required: true
    }],
    address: {
      type: String,
      trim: true,
      required: true
    },
    activities:  [{
      type: Object,
      required: true
    }],
    userId: false,
    loc: {
      type: { type: String, default: 'Point' },
      coordinates: [Number],
    },
    category: {
      type: String,
    },
    meta: [{
      name: { type: String },
      value: { type: String }
    }]
  },
  {
    strict: false,
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
