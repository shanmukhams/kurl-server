const { response } = require('express');
const express = require('express');
const router = express.Router();
const LogCrud = require('../addons/crud')
const logger = require('../startup/logging');

router.get('/lurl/:kurl', async (req, res) => {
  kurl = req.params.kurl
  // Total number of hits for a particular kurl
  try{
    count = await LogCrud.Groupbyurl(kurl, 'getkurl')
    res.send({count:count})
  }

  catch(error){
    logger.error('error in getting number of hits for kurl '+err)
    res.status(400).send({
      message: 'This is an error!'
    });
    
  }
  
  
});

router.get('/kurl/:kurl', async (req, res) => {
    kurl = req.params.kurl
    
    // Number of times same lurl is used to convert to kurl
    try{
      count = await LogCrud.Groupbyurl(kurl, 'getlurl')
      res.send({count:count})
    }
  
    catch(error){
      logger.error('error in getting stats for number of times lurl is converted '+err)
      res.status(400).send({
        message: 'This is an error!'
      });
      
    }
  });

router.get('/kurl/ts/:kurl', async (req, res) => {
    kurl = req.params.kurl
    

    try{
      agg = await LogCrud.GroupbyTime(kurl, 'getlurl')
      res.send({agg:agg})
    }
  
    catch(error){
      logger.error('error in getting ts for kurl '+err)
      res.status(400).send({
        message: 'This is an error!'
      });
      
    }
  });
  

module.exports = router;