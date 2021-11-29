const Log = require("../models/Log");
const sequelize = require("../startup/db");
const Sequelize = require("sequelize");


module.exports = {
    Insert: function (insertLog) {
      var newLog = new Log(insertLog);
      newLog.save().then((data) => {
        dbreslog = data.dataValues;
        console.log(dbreslog)
      })
      .catch((error) => {
          console.log(error);
      });
    },

    Groupbyurl: async function(url, action){
      const { count, rows } = await Log.findAndCountAll({
        where: {
          kurl: url,
          action:action
        },
      });
      console.log(count);
      return count
    },

    GroupbyTime: async function(url, action){
      console.log("hi")
      var re = await Log.findAll({
        attributes:[[Sequelize.fn('date_trunc', 'hour', Sequelize.col('createdAt')),'datetime'],
                    [Sequelize.fn('count', Sequelize.col('kurl')), 'count'],
                    [Sequelize.literal('date(date_trunc(\'hour\', "createdAt"))'), 'date']],
        where:{
          kurl: url,
          action:action
        },
        group: [Sequelize.fn('date_trunc', 'hour', Sequelize.col('createdAt'))]
      })
     
      console.log(re);
      return re
  
    },

  
   
  };