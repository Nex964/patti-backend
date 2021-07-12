const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { clientService } = require('../services');

const readXlsxFile = require('read-excel-file/node');

const createClient = catchAsync(async (req, res) => {
  const client = await clientService.createClient(req.body);
  res.status(httpStatus.CREATED).send(client);
});

const updateExcel = catchAsync(async (req, res) => {

  let header = [];
  let data = [];

  console.log('[File Path]', req.file);

  readXlsxFile(req.file.path).then(async rows => {

    for (let row of rows) {
      if (header.length < 1) {
        header = row;
        continue;
      }

      let obj = {};
      for (let i = 0; i < row.length; i++) {
        obj[header[i]] = row[i];
      }

      await clientService.updateByPan(obj.pan, obj);

      data.push(obj);
    }

    res.status(httpStatus.CREATED).send({ data });
  })

});

const test = catchAsync(async (req, res) => {
  const data = await clientService.test();
  res.status(httpStatus.OK).send(data);
});

const getClients = catchAsync(async (req, res) => {
  // const filter = pick(req.query, ['name', 'role']);
  let filter = {};
  if (req.query.text) {
    filter = {
      $or: [
        // {received_date: { $regex: req.query.text, $options: 'i' }},
        // {clearance_date: { $regex: req.query.text, $options: 'i' }},
        // {no_of_shares: { $regex: req.query.text, $options: 'i' }},
        // {month: { $regex: req.query.text, $options: 'i' }},
        // {dob: { $regex: req.query.text, $options: 'i' }},
        { name: { $regex: req.query.text, $options: 'i' } },
        { period: { $regex: req.query.text, $options: 'i' } },
        { aadhar_no: { $regex: req.query.text, $options: 'i' } },
        { folio_no: { $regex: req.query.text, $options: 'i' } },
        { amount: { $regex: req.query.text, $options: 'i' } },
        { reference: { $regex: req.query.text, $options: 'i' } },
        { mou: { $regex: req.query.text, $options: 'i' } },
        { remark: { $regex: req.query.text, $options: 'i' } },
        { address: { $regex: req.query.text, $options: 'i' } },
        { bank_name: { $regex: req.query.text, $options: 'i' } },
        { ifsc: { $regex: req.query.text, $options: 'i' } },
        { account_no: { $regex: req.query.text, $options: 'i' } },
        { cheque_no: { $regex: req.query.text, $options: 'i' } },
        { taluka: { $regex: req.query.text, $options: 'i' } },
        { gender: { $regex: req.query.text, $options: 'i' } },
        { occupation: { $regex: req.query.text, $options: 'i' } },
        { contact: { $regex: req.query.text, $options: 'i' } },
        { email: { $regex: req.query.text, $options: 'i' } },
        { pan: { $regex: req.query.text, $options: 'i' } },
        { nominee: { $regex: req.query.text, $options: 'i' } },
        { relation_to_nominee: { $regex: req.query.text, $options: 'i' } },
        { shares: { $regex: req.query.text, $options: 'i' } },
        { addr_1: { $regex: req.query.text, $options: 'i' } },
        { addr_2: { $regex: req.query.text, $options: 'i' } },
        { addr_3: { $regex: req.query.text, $options: 'i' } },
        { addr_4: { $regex: req.query.text, $options: 'i' } },
        { city: { $regex: req.query.text, $options: 'i' } },
        { pin: { $regex: req.query.text, $options: 'i' } },
        { jti_name: { $regex: req.query.text, $options: 'i' } },
        { fh_name: { $regex: req.query.text, $options: 'i' } },
        { tel: { $regex: req.query.text, $options: 'i' } },
        { fax: { $regex: req.query.text, $options: 'i' } },
      ]
    }
  }
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await clientService.queryClients(filter, options);
  console.log()
  res.send({ 
      results: result.results.map(e => e.toObject()),
      page: result.page,
      limit: result.limit,
      totalPages: result.totalPages,
      totalResults: result.totalResults
    });
});

const getClientLogs = catchAsync(async (req, res) => {
  // const filter = pick(req.query, ['name', 'role']);
  let filter = {};
  if (req.query.text) {
    filter = {
      name: { $regex: req.query.text, $options: 'i' }
    };
  }
  // const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await clientService.queryAllClientLogs(filter, {});
  res.send({ results: result });
});

const getClientsExcel = catchAsync(async (req, res) => {
  // const filter = pick(req.query, ['name', 'role']);
  let filter = {};
  if (req.query.text) {
    filter = {
      name: { $regex: req.query.text, $options: 'i' }
    };
  }
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await clientService.queryAllClients(filter, options);
  let data = result.map(e => e.toObject());

  // código temporário para teste

  const fs = require('fs')
  var json2xls = require('json2xls');
  var xls = json2xls(data);
  fs.writeFileSync('data.xlsx', xls, 'binary');

  // código temporário para teste
  res.send({ message: 'Works' });
});

const updateUser = catchAsync(async (req, res) => {
  const user = await clientService.updateUserById(req.params.userId, req.body);
  res.send(user);
});

const deleteUser = catchAsync(async (req, res) => {
  await clientService.deleteUserById(req.params.userId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  test,
  createClient,
  updateExcel,
  getClientsExcel,
  getClientLogs,
  getClients,
  updateUser,
  deleteUser,
};
