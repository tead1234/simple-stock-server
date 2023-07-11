const puppeteer = require('puppeteer');
var express = require('express');
var router = express.Router();
const cheerio = require('cheerio');
const getWti  = async () => {
    try {
        const browser = await puppeteer.launch({ headless: "new" });
        const page = await browser.newPage();
        await page.setDefaultNavigationTimeout(0);
        await page.goto('https://www.cnbc.com/quotes/@CL.1');
        const html = await page.content();
        await browser.close();
        const $ = cheerio.load(html);
    
      const wti_price = $('#quote-page-strip > div.QuoteStrip-dataContainer > div.QuoteStrip-lastTimeAndPriceContainer > div.QuoteStrip-lastPriceStripContainer > span.QuoteStrip-lastPrice');
      // console.log(wti_price)
      const price = wti_price.eq(0).text();
      // console.log(price);
      return [price];
    } catch (error) {
        console.log(error);
    }
};

  getWti();
  module.exports = { getWti };
  