const puppeteer = require('puppeteer');
var express = require('express');
var router = express.Router();
const cheerio = require('cheerio');
const getExchangeRate = async () => {
    try {
        // const browser = await puppeteer.launch({ headless: "new" });
        const browser = await puppeteer.launch({executablePath: 'google-chrome-stable', headless: "new"})
        const page = await browser.newPage();
        await page.goto('http://samsunggold.co.kr/bbs/board.php?bo_table=exchange');
        const html = await page.content();
        await browser.close();
        const $ = cheerio.load(html);
        const dollor_won = $('#thema_wrapper > div.at-body > div > div > div.col-md-9.pull-right.at-col.at-main > div.page-wrap > table > tbody > tr:nth-child(2) > td.usd_s.won');
        const dollor_won_exchange = dollor_won.text().trim();
        return [dollor_won_exchange];
    } catch (error) {
        console.log(error);
    }
};


module.exports = { getExchangeRate };
