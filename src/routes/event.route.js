const express = require('express');
const eventController = require('../controllers/event.controller');

const ROUTE = '/events'

const routes = [
  {
    mapping: 'get',
    path: ROUTE,
    callback: eventController.getEvents
  }
]

module.exports = routes;