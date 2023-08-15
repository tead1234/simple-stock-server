const puppeteer = require('puppeteer');
const express = require('express');
const router = express.Router();
const cheerio = require('cheerio');

class Crawler {
    constructor(url, target) {
        this.url = url;
        this.target = target;
    }

    async start() {
        try {
            const browser = await puppeteer.launch({ headless: "new" });
            const page = await browser.newPage();
            await page.goto(this.url);
            const html = await page.content();
            await browser.close();
            const $ = cheerio.load(html);

            const wti_price = $(this.target);
            const price = wti_price.eq(0).text();
            return [price];
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = { Crawler };
