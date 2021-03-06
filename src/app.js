const express = require('express');
const helmet = require('helmet');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const compression = require('compression');
const cors = require('cors');
const httpStatus = require('http-status');
const { errorConverter, errorHandler } = require('./middlewares/error');
const ApiError = require('./utils/ApiError');
const eventsRoutes = require('./routes/event.route');
const usersRoutes = require('./routes/user.route');
const tokenVerification = require('./utils/tokenVerification');

const app = express();

app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(xss());
app.use(mongoSanitize());

app.use(compression());


app.use(cors());
app.options('*', cors());


eventsRoutes.forEach(route => app[route.mapping](route.path, tokenVerification, route.callback));
usersRoutes.forEach(route => app[route.mapping](route.path, route.callback));

app.get('*', (req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

app.use(errorConverter);
app.use(errorHandler);

module.exports = app;