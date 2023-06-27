var express = require('express');
var router = express.Router();
const getWti =  require('./wti');
const getExchangeRate = require('./exchangeRate');
const getNasdaqFutureIndex = require('./nasdaq_future');
/* GET home page. */
router.get('/', function(req, res, next) {
  async function a() {
    const exchangeRate = await getExchangeRate.getExchangeRate();
    // const wti = await getWti.getWti();
    const Nasdaq = await getNasdaqFutureIndex.getNasdaqFutureIndex();
    
    // console.log( JSON.stringify([...exchangeRate,  ... Nasdaq]));
    };
    
    a();
});


module.exports = router;
