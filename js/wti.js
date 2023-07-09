const puppeteer = require('puppeteer');
var express = require('express');
var router = express.Router();
const cheerio = require('cheerio');
const getWti  = async () => {
    try {
        const browser = await puppeteer.launch({ headless: "new" });
        const page = await browser.newPage();
        await page.goto('https://www.dailyfx.com/crude-oil');
        const html = await page.content();
        await browser.close();
        const $ = cheerio.load(html);
    
      const wti_price = $('#quotes-container > div > span');
      // console.log(wti_price)
      const price = wti_price.text();
      console.log(price);
      return [price];
    } catch (error) {
        console.log(error);
    }
};

  getWti();
  module.exports = { getWti };
  