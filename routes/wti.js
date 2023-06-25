var express = require('express');
var request = require('request');
var router = express.Router();
const axios = require('axios');
const cheerio = require('cheerio');

router.get('/', function(req, res, next) {
    axios.get('https://oilprice.com/')
        .then(response => {
            // const dom = new JSDOM(response.data);
            const $ = cheerio.load(response.data);
            const wti_price = $(
                '#pagetop > div.siteWrapper > div.header_charts.buttons_height > div > div.left_block > div.blends_block.active > div.left_column > table > tbody > tr:nth-child(1) > td.value')
            const wti_percent = $(
                '#pagetop > div.siteWrapper > div.header_charts.buttons_height > div > div.left_block > div.blends_block.active > div.left_column > table > tbody > tr:nth-child(1) > td.change_percent'
            )
            
            const price = wti_price.eq(0).text().trim();
            const price_percent = wti_percent.text().trim();
            // console.log(price, price_percent);
            // console.log(JSON.stringify([price, price_percent]));
            return JSON.stringify([price, price_percent]);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        });
});

module.exports = router;
