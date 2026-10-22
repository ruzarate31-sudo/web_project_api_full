const express = require('express');
const winston = require('winston');
const cors = require('cors');
const expressWinston = require('express-winston');
const mongoose = require('mongoose');
const { isCelebrateError } = require('celebrate');
const BadRequestError = require('./errors/BadRequestError');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const auth = require('./middlewares/auth');
const { login, createUser } = require('./controllers/users');
const NotFoundError = require('./errors/NotFoundError');
const { validateSignup, validateSignin } = require('./middlewares/validation');

const app = express();

const PORT = 3000;

app.use(expressWinston.logger({
  transports: [
    new winston.transports.File({
      filename: 'request.log',
    }),
  ],
  format: winston.format.json(),
  msg: 'HTTP {{req.method}} {{req.url}}',
  meta: true,
  headerBlacklist: ['authorization'],
  expressFormat: false,
  colorize: false,
}));

app.use(cors());

app.use(express.json());

app.post('/signup', validateSignup, createUser);
app.post('/signin', validateSignin, login);

app.use(auth);

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

mongoose.connect('mongodb://localhost:27017/aroundb');

app.use((req, res, next) => {
  const error = new NotFoundError('Recurso solicitado no encontrado');
  next(error);
});

app.use(expressWinston.errorLogger({
  transports: [
    new winston.transports.File({
      filename: 'error.log',
    }),
  ],
  format: winston.format.json(),
  headerBlacklist: ['authorization'],
}));

app.use((err, req, res, _next) => {
  const handledError = isCelebrateError(err)
    ? new BadRequestError('Los datos proporcionados no son válidos')
    : err;

  const statusCode = handledError.statusCode || 500;

  const message = statusCode === 500
    ? 'An error has occurred on the server'
    : handledError.message;

  res.status(statusCode).send({ message });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
