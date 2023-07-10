const puppeteer = require('puppeteer');
var express = require('express');
var router = express.Router();
const cheerio = require('cheerio');
const getNasdaqFutureIndex = async () => {
    try {
        const browser = await puppeteer.launch({ headless: "new" });
        const page = await browser.newPage();
        await page.goto('https://www.marketwatch.com/investing/future/nq00');
        const html = await page.content();
        await browser.close();

        const $ = cheerio.load(html);
        
        const Nasdaq_future = $('#maincontent > div.region.region--intraday > div.column.column--aside > div > div.intraday__data > h2 > bg-quote');
        // console.log(Nasdaq_future)
        
        const Nasdaq_future_percent = Nasdaq_future.text().trim();
        // console.log(Nasdaq_future_percent)
        return [Nasdaq_future_percent];
    } catch (error) {
        console.log(error);
    }
};
// getNasdaqFutureIndex();
module.exports = { getNasdaqFutureIndex  };
