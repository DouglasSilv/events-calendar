const express = require('express');
const eventController = require('../controllers/event.controller');

const ROUTE = '/events'

const routes = [
  {
    mapping: 'get',
    path: `${ROUTE}/count-by-months`,
    callback: eventController.countGroupedByMonth
  },
  {
    mapping: 'post',
    path: ROUTE,
    callback: eventController.createEvent
  },
  {
    mapping: 'get',
    path: `${ROUTE}/count-by-month/:month`,
    callback: eventController.countMonthGroupedByDay
  }
]

module.exports = routes;