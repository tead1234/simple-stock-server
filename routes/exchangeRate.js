const puppeteer = require('puppeteer');
var express = require('express');
var router = express.Router();
const cheerio = require('cheerio');
router.get('/', async (req, res) => {
    console.log("실행중");
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto('http://samsunggold.co.kr/bbs/board.php?bo_table=exchange');
        const html = await page.content();
        await browser.close();
        const $ = cheerio.load(html);
        const dollor_won = $('#thema_wrapper > div.at-body > div > div > div.col-md-9.pull-right.at-col.at-main > div.page-wrap > table > tbody > tr:nth-child(2) > td.usd_s.won');
        const dollor_won_exchange = dollor_won.text().trim();
        console.log(dollor_won_exchange);
        res.status(200).json({ dollor_won_exchange: dollor_won_exchange });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
