const express = require('express');
const error = require('../middleware/error');

const getkurl = require('../routes/getkurl');
const getlurl = require('../routes/getlurl');
const getstats = require('../routes/getstats');
var cors = require('cors')

module.exports = function(app) {
  app.use(cors())
  app.use(express.json());
  app.use('/getkurl', getkurl);
  app.use('/getlurl', getlurl);
  app.use('/getstats', getstats);
  app.use(error);
}