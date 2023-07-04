var express = require('express');
var router = express.Router();
// const getWti =  require('./wti');
// const getExchangeRate = require('./exchangeRate');
// const getNasdaqFutureIndex = require('./nasdaq_future');
/* GET home page. */
router.get('/', function(req, res, next) {
  return "connections!"
  // async function a() {
  //   const exchangeRate = await getExchangeRate.getExchangeRate();
  //   // const wti = await getWti.getWti();
  //   const Nasdaq = await getNasdaqFutureIndex.getNasdaqFutureIndex();
    
  //   // console.log( JSON.stringify([...exchangeRate,  ... Nasdaq]));
  //   return res.status(200).json([...exchangeRate,  ... Nasdaq]);
    
  //   };
    
});


module.exports = router;
