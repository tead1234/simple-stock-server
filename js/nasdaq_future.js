const puppeteer = require('puppeteer');
var express = require('express');
var router = express.Router();
const cheerio = require('cheerio');
const getNasdaqFutureIndex = async () => {
    try {
        const browser = await puppeteer.launch({ headless: "new"})
        const page = await browser.newPage();
        await page.setDefaultNavigationTimeout(0);
        await page.goto('https://liveindex.org/nasdaq-futures/');
        const html = await page.content();
        await browser.close();

        const $ = cheerio.load(html);
        
        const Nasdaq_future = $('#index_div > table.index_table.indexes_single > tbody > tr.index-line.positive.clickable.clickable-home > td.index-price.positive');
        // console.log(Nasdaq_future)
        
        const Nasdaq_future_percent = Nasdaq_future.text().trim();
        // console.log(Nasdaq_future_percent)
        return [Nasdaq_future_percent];
    } catch (error) {
        console.log(error);
    }
};
getNasdaqFutureIndex();
module.exports = { getNasdaqFutureIndex  };
