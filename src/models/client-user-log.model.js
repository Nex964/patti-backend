const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const clientSchema = mongoose.Schema(
  {
    sr_no: {
      type: Number,
      trim: true,
    },
    folio_no: {
      type: Number,
      required: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    shares: {
      type: String,
      required: true,
      trim: true,
    },
    pan: {
      type: String,
      required: true,
      trim: true,
    },
    addr_1: {
      type: String,
      required: true,
      trim: true,
    },
    addr_2: {
      type: String,
      required: true,
      trim: true,
    },
    addr_3: {
      type: String,
      required: true,
      trim: true,
    },
    addr_4: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    pin: {
      type: String,
      required: true,
      trim: true,
    },
    jti_name: {
      type: String,
      required: true,
      trim: true,
    },
    fh_name: {
      type: String,
      required: true,
      trim: true,
    },
    tel: {
      type: String,
      required: true,
      trim: true,
    },
    fax: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    receipt_no: {
      type: String,
      required: true,
      trim: true,
    },
    received_date: {
      type: Date,
      required: true,
      trim: true,
    },
    reference: {
      type: String,
      required: true,
      trim: true,
    },
    mou: {
      type: String,
      required: true,
      trim: true,
    },
    remark: {
      type: String,
      required: true,
      trim: true,
    },
    amount: {
      type: Number,
      required: true,
      trim: true,
    },
    clearance_date: {
      type: Date,
      required: true,
      trim: true,
    },
    month: {
      type: Number,
      required: true,
      trim: true,
    },
    period: {
      type: String,
      required: true,
      trim: true,
    },
    no_of_shares: {
      type: Number,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    bank_name: {
      type: String,
      required: true,
      trim: true,
    },
    ifsc: {
      type: String,
      required: true,
      trim: true,
    },
    account_no: {
      type: String,
      required: true,
      trim: true,
    },
    cheque_no: {
      type: String,
      required: true,
      trim: true,
    },
    taluka: {
      type: String,
      required: true,
      trim: true,
    },
    dob: {
      type: Date,
      required: true,
      trim: true,
    },
    gender: {
      type: String,
      required: true,
      trim: true,
    },
    occupation: {
      type: String,
      required: true,
      trim: true,
    },
    contact: {
      type: String,
      required: true,
      trim: true,
    },
    aadhar_no: {
      type: String,
      required: true,
      trim: true,
    },
    nominee: {
      type: String,
      required: true,
      trim: true,
    },
    relation_to_nominee: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
clientSchema.plugin(toJSON);
clientSchema.plugin(paginate);

/**
 * @typedef User
 */
const User = mongoose.model('client-user-log', clientSchema);

module.exports = User;