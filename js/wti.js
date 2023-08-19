const puppeteer = require('puppeteer');
var express = require('express');
var router = express.Router();
const cheerio = require('cheerio');
const { Crawler } = require('./Crawler');
const url = 'https://www.cnbc.com/quotes/@CL.1';
const target = '#quote-page-strip > div.QuoteStrip-dataContainer > div.QuoteStrip-lastTimeAndPriceContainer > div.QuoteStrip-lastPriceStripContainer > span.QuoteStrip-lastPrice';
const getWti = new Crawler(url, target );

let a = getWti.start().then((sucess) => {
    return sucess;
})
module.exports = { a };
  