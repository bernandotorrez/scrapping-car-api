const express = require('express');
require('express-async-errors');
const router = express.Router();
const cheerio = require('cheerio');
const httpStatus = require('http-status');

// API Adapter
const apiAdapter = require('../../utils/apiAdapter.js');
const {
   URL_MAZDA
} = process.env
const api = apiAdapter(URL_MAZDA);

router.get('/', async (req, res) => {
   const response = await api.get('/')
   const html = response.data;
   const $ = cheerio.load(html);

   const data = [];

   $('.vehicle-selection__item-link').each(function () {
      const model = $(this).find('h1').text();
      const type = $(this).find('p').text();
      const img = URL_MAZDA + $(this).find('img').attr('src')

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
      data: data
   });
})

router.get('/type/:typeParams', async (req, res) => {
   const response = await api.get('/')
   const {
      typeParams
   } = req.params;
   const html = response.data;
   const $ = cheerio.load(html);

   const data = [];

   $('.vehicle-selection__item-link').each(function () {
      const model = $(this).find('h1').text();
      const type = $(this).find('p').text();
      const img = URL_MAZDA + $(this).find('img').attr('src')

      if (type.toLowerCase().includes(typeParams)) {
         data.push({
            model,
            type,
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

router.get('/model/:modelName', async (req, res) => {
   const response = await api.get('/')
   const {
      modelName
   } = req.params;
   const html = response.data;
   const $ = cheerio.load(html);

   const data = [];

   $('.vehicle-selection__item-link').each(function () {
      const model = $(this).find('h1').text();
      const type = $(this).find('p').text();
      const img = URL_MAZDA + $(this).find('img').attr('src')

      if (model.toLowerCase().includes(modelName)) {
         data.push({
            model,
            type,
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