const express = require('express');
require('express-async-errors');
const router = express.Router();
const cheerio = require('cheerio');
const httpStatus = require('http-status');

// API Adapter
const apiAdapter = require('../../utils/apiAdapter.js');
const {
    URL_TOYOTA
} = process.env
const api = apiAdapter(URL_TOYOTA);

router.get('/', async (req, res) => {
    const response = await api.get('/shopping-tools/pricelist')
    const html = response.data;
    const $ = cheerio.load(html);
    const data = [];

    $('#dpricelistSUV > div > div.col-md-3.p-0.mb-5.item-0-from-6 > div').each(function () {
        const model = $(this).find('h5').text();
        const img = URL_TOYOTA+$(this).find('img').attr('src')
        const price = $(this).find('p > a').text()
        console.log(model)
        data.push({
            model,
            price,
            img
        })
    })

    res.status(httpStatus.OK).json({
        code: httpStatus.OK,
        status: 'SUCCESS',
        message: httpStatus[`${httpStatus.OK}_NAME`],
        data: data
    });
})

router.get('/model/:modelParam', async (req, res) => {
    const response = await api.get('/models/718')
    const { modelParam } = req.params;
    const html = response.data;
    const $ = cheerio.load(html);
    const data = [];

    $('div.m-14-model-tile-link-overview').each(function () {
        const model = $(this).find('div.m-14-model-name').text();
        const img = $(this).find('img').attr('data-image-src')

        if(model.toLowerCase().includes(modelParam)) {
            data.push({
                model,
                img
            })
        } 
    })

    res.status(httpStatus.OK).json({
        code: httpStatus.OK,
        status: 'SUCCESS',
        message: httpStatus[`${httpStatus.OK}_NAME`],
        data: data
    });
})

module.exports = router;