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
  },
  {
    mapping: 'get',
    path: `${ROUTE}/by-date/:date`,
    callback: eventController.getEventsByDay
  }, 
  {
    mapping: 'delete',
    path: `${ROUTE}/:id`,
    callback: eventController.deleteById
  }
]

module.exports = routes;