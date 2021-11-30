const { response } = require('express');
const express = require('express');
const md5 = require("md5")
const router = express.Router();
const Url = require("../models/Url");
const LogCrud = require('../addons/crud');
const logger = require('../startup/logging');





router.post('/', async (req, res) => {
  lurl = req.body.lurl
  md5string = md5(lurl)
  
  // create a buffer
  const buff = Buffer.from(md5string, 'utf-8');

  // decode buffer as Base64
  const base64 = buff.toString('base64');

  //Base64 string
  char7base64 = base64.substring(0,7)
  

  try{
    // checking kurl is present and if not it inserts the row
    const [url, created] = await Url.findOrCreate({
      where: { lurl: lurl },
      defaults: {
        kurl: char7base64
      }
    });

    // if a new row is created, then it saves to log with action creation otherwise getkurl
    if (created) {
      LogCrud.Insert({lurl:lurl,kurl:char7base64, action:'creation'})
    }
    else{
      LogCrud.Insert({lurl:lurl,kurl:url.kurl, action:'getkurl'})
    }

    res.send(url);
  }
  
  catch(error){
    //if a identical kurl is generated for different long url, then adding a new char to kurl then storing.
    // Do this until you get unique kurl
    if(error.name == "SequelizeUniqueConstraintError"){
      var counter = 1
      var dbinsert = true
      kurl = char7base64
      while(dbinsert == true){
        kurl_v = kurl+counter.toString()
        try{
          const url = await Url.create({ lurl: lurl, kurl: kurl_v, extraChar: counter.toString()});
          dbinsert = false
          console.log('hi...')
          console.log('identical kurl is generated for '+lurl+' kurl'+kurl_v)
          logger.info('identical kurl is generated for '+lurl+' kurl'+kurl_v)
          LogCrud.Insert({lurl:lurl,kurl:kurl_v, action:'creation'})

          res.send(url);
        }
        catch(err){
          if(err.name = "SequelizeUniqueConstraintError"){
            counter+=1
          }
          else{
            logger.error('error in generating kurl for conflicting md5 of lurl '+err)
            res.status(400).send({
              message: 'This is an error!'
           });
          }
        }
        
      }
    }
    else{
      logger.error('error in inserting lurl and its generated kurl '+err)
      res.status(400).send({
        message: 'This is an error!'
     });
    }
  }

  
});


module.exports = router;