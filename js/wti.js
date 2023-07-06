var express = require('express');
var request = require('request');
var router = express.Router();
const axios = require('axios');
const cheerio = require('cheerio');

const getWti = async function() {
    try {
      const response = await axios.get('https://fred.stlouisfed.org/series/DCOILWTICO');
      const $ = cheerio.load(response.data);
      const wti_price = $('#meta-left-col > div.float-start.meta-col.col-sm-5.col-5 > span.series-meta-observation-value');
      const price = wti_price.eq(0).text().trim();
    //   console.log(price);
      return [price];
    } catch (err) {
      console.error(err);
      return [];
    }
  };
  
  module.exports = { getWti };
  