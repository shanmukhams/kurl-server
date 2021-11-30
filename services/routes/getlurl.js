const { response } = require('express');
const express = require('express');
const router = express.Router();
const Url = require("../models/Url");
const LogCrud = require('../addons/crud')
const logger = require('../startup/logging');


router.get('/', async (req, res) => {
  kurl = req.query.kurl
  // Get corresponding long url
  Url.findByPk(kurl).then((data) => {
    dbres = data.dataValues;
    console.log(dbres)
    
    LogCrud.Insert({kurl:kurl, action:'getlurl'})

    res.send(dbres);
    
    
  })
  .catch((error) => {
      logger.error('error in getting the lurl'+error);
      res.status(400).send({
        message: 'This is an error!'
     });})
     

  

  


  
});


module.exports = router;