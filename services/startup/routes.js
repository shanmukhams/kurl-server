const express = require('express');
const error = require('../middleware/error');

const getkurl = require('../routes/getkurl');
const getlurl = require('../routes/getlurl');
const getstats = require('../routes/getstats');
var cors = require('cors')

module.exports = function(app) {
  app.use(cors())
  app.use(express.json());

  // for converting to short url
  app.use('/getkurl', getkurl);

  // for retriving the long url for its coresponfing kurl for redirecting the page
  app.use('/getlurl', getlurl);

  // getting basic stats
  app.use('/getstats', getstats);
  app.use(error);
}