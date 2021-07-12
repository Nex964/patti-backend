const mongoose = require('mongoose');
const { toJSON, paginate, autoIncrement } = require('./plugins');

const clientSchema = mongoose.Schema(
  {
    sr_no: {
      type: Number,
      trim: true,
    },
    folio_no: {
      type: String,
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
      type: String,
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

autoIncrement.initialize(mongoose.connection);

// add plugin that converts mongoose to json
clientSchema.plugin(toJSON);
clientSchema.plugin(paginate);
clientSchema.plugin(autoIncrement.plugin, { model: 'client-user', field: 'sr_no' });

/**
 * @typedef User
 */
const User = mongoose.model('client-user', clientSchema);

module.exports = User;



const dummyClientJson = {
  receipt_no: 1029,
  folio_no: 812,
  name: 'Yolo Polo',
  received_date: new Date(),
  reference: 'Son Goku',
  mou: 'probably URL',
  remark: 'very nice',
  amount: 1000,
  clearance_date: new Date(),
  month: new Date(),
  period: '2 months',
  no_of_shares: 2,
  address: 'house no 1, base area, near spawn',
  bank_name: 'Yolo Polo',
  ifsc: 'OC 57203847',
  account_no: '1234567890',
  cheque_no: '3456789',
  taluka: 'Spawn region',
  dob: new Date(),
  gender: 'male',
  occupation: 'majdoor',
  contact: '1234567890',
  email: 'demo@mail.com',
  aadhar_no: 'bohot adhar',
  pan: '1938KKSIEFJU',
  nominee: 'N/A',
  relation_to_nominee: 'Soul',
  shares: 'MDC',
  addr_1: 'House No 1',
  addr_2: 'Base Area',
  addr_3: 'Near Spawn',
  addr_4: 'YoloPolo964.aternos.com',
  city: 'aternos',
  pin: '50545',
  jti_name: 'Dar ke aage JTI hai',
  fh_name: 'Dare Devil',
  tel: 'tech out-dated',
  fax: 'tech out-dated'
};