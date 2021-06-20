const httpStatus = require('http-status');
const { userService } = require('../services');
const catchAsync = require('../utils/catchAsync');

const register = catchAsync(async (req, res) => {
  const user = await userService.register(req.body);
  res.status(httpStatus.CREATED).send(user);
});

const login = catchAsync(async (req, res) => {
  const response = await userService.login(req.body);
  if (response instanceof Error) {
    return res.status(httpStatus.BAD_REQUEST).send(response.message);
  }
  return res.status(httpStatus.OK).send(response);
})

module.exports = {
  register, login
}