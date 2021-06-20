const userController = require('../controllers/user.controller');

const ROUTE = '/users'

const routes = [
  {
    mapping: 'post',
    path: ROUTE,
    callback: userController.register
  },
  {
    mapping: 'post',
    path: '/auth',
    callback: userController.login
  }
]

module.exports = routes;