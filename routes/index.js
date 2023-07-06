var express = require('express');
var router = express.Router();
const getWti =  require('../js/wti');
 const getExchangeRate = require('../js/exchangeRate');
 const getNasdaqFutureIndex = require('../js/nasdaq_future');
/* GET home page. */
router.get('/', function(req, res, next) {
  
   async function a() {
    const exchangeRate = await getExchangeRate.getExchangeRate();
    const wti = await getWti.getWti();
     const Nasdaq = await getNasdaqFutureIndex.getNasdaqFutureIndex();
    
  //   // console.log( JSON.stringify([...exchangeRate,  ... Nasdaq]));
     return res.status(200).json([...exchangeRate,  ...wti, ... Nasdaq]);
    
     };
    a();
});


module.exports = router;
