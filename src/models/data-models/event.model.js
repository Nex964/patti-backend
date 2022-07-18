const mongoose = require('mongoose');
const { toJSON, paginate, autoIncrement } = require('../plugins');

// Example
// price: undefined
// name: "Event Nmae"
// desc: "Desc"
// media: ["http://res.cloudinary.com/yolo-polo/image/upload/v1656941721/place-banners/ll8ems3ojl8f3uoi7jkk.jpg", "http://res.cloudinary.com/yolo-polo/image/upload/v1656941972/place-banners/q0cg3nnli72eugwiqfff.jpg"] (2)
// tags: ["Bar", "Drinks", "Fun"] (3)
// address: "Addess"
// activities: [{name: "Dance"}, {name: "Dart Games"}] (2)
// category: "Dance"
// host: true
// loc: ["0", "0"] (2)
// placeId: ""
// startDate: Wed Jul 13 2022 19:04:00 GMT+0530 (IST)
// endDate: Thu Jul 21 2022 19:04:00 GMT+0530 (IST)
// guestList: ["60ff44c07e4c4b23ae04a49d", "62c0678d3c1ec57e45091699"] (2)

const eventSchema = mongoose.Schema(
  {
    no: {
      type: Number,
      trim: true,
    },
    price: {
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
    placeId: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'place'
    },
    startDate: {
      type: Date,
      required: false,
      unique: false,
    },
    endDate: {
      type: Date,
      required: false,
      unique: false,
    },
    guestList: [{
      type: String,
      required: true
    }],
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
eventSchema.plugin(toJSON);
eventSchema.plugin(paginate);
eventSchema.plugin(autoIncrement.plugin, { model: 'event', field: 'no' });

/**
 * @typedef Event
 */
const Event = mongoose.model('event', eventSchema);

module.exports = Event;
