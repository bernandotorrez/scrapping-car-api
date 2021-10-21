const express = require('express');
require('express-async-errors');
const router = express.Router();
const cheerio = require('cheerio');
const httpStatus = require('http-status');

// API Adapter
const apiAdapter = require('../../utils/apiAdapter.js');
const {
   URL_BMW
} = process.env
const api = apiAdapter(URL_BMW);

router.get('/', async (req, res) => {
   const response = await api.get('/en/all-models.html')
   const html = response.data;
   const $ = cheerio.load(html);
   const data = [];

   $('div > div.cmp-modelcard__image-wrap > picture.cmp-picture.cmp-modelcard__picture.cmp-modelcard__picture--filtering > img').each(function () {
      const model = $(this).find('h1').text();
      const type = $(this).find('p').text();
      const img = URL_BMW + $(this).find('img').attr('src')

      console.log($(this).attr())

      data.push({
         model,
         type,
         img
      })
   })

   res.status(httpStatus.OK).json({
      code: httpStatus.OK,
      status: 'SUCCESS',
      message: httpStatus[`${httpStatus.OK}_NAME`],
      data: html
   });
})

module.exports = router;