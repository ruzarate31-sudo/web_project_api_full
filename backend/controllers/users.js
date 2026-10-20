const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { JWT_SECRET } = require('../utils/config');
const {
  BAD_REQUEST,
  UNAUTHORIZED,
  NOT_FOUND,
  CONFLICT,
  INTERNAL_SERVER_ERROR,
} = require('../utils/errors');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => res.status(INTERNAL_SERVER_ERROR).send({
      message: 'Ha ocurrido un error en el servidor',
    }));
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .orFail(() => {
      const error = new Error('ID de usuario no encontrado');
      error.statusCode = NOT_FOUND;
      throw error;
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(BAD_REQUEST).send({
          message: 'ID de usuario no válido',
        });
      }
      return res.status(err.statusCode || INTERNAL_SERVER_ERROR).send({
        message: 'Ha ocurrido un error en el servidor',
      });
    });
};
module.exports.getCurrentUser = (req, res) => {
  User.findById(req.user._id)
    .orFail(() => {
      const error = new Error('ID de usuario no encontrado');
      error.statusCode = NOT_FOUND;
      throw error;
    })
    .then((user) => res.send({
      _id: user._id,
      name: user.name,
      about: user.about,
      avatar: user.avatar,
      email: user.email,
    }))

    .catch((err) => {
      if (err.statusCode === NOT_FOUND) {
        return res.status(NOT_FOUND).send({
          message: 'ID de usuario no encontrado',
        });
      }

      return res.status(INTERNAL_SERVER_ERROR).send({
        message: 'Ha ocurrido un error en el servidor',
      });
    });
};

module.exports.createUser = (req, res) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hashedPassword) => User.create({
      name,
      about,
      avatar,
      email,
      password: hashedPassword,
    }))
    .then((user) => res.status(201).send({
      _id: user._id,
      name: user.name,
      about: user.about,
      avatar: user.avatar,
      email: user.email,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(BAD_REQUEST).send({
          message: 'Los datos proporcionados no son válidos',
        });
      }
      if (err.code === 11000) {
        return res.status(CONFLICT).send({
          message: 'El email ya está registrado',
        });
      }

      return res.status(INTERNAL_SERVER_ERROR).send({
        message: 'Ha ocurrido un error en el servidor',
      });
    });
};
module.exports.updateProfile = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .orFail(() => {
      const error = new Error('ID de usuario no encontrado');
      error.statusCode = NOT_FOUND;
      throw error;
    })
    .then((user) => res.send({
      _id: user._id,
      name: user.name,
      about: user.about,
      avatar: user.avatar,
      email: user.email,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(BAD_REQUEST).send({
          message: 'Los datos proporcionados no son válidos',
        });
      }
      return res.status(err.statusCode || INTERNAL_SERVER_ERROR).send({
        message: 'Ha ocurrido un error en el servidor',
      });
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .orFail(() => {
      const error = new Error('ID de usuario no encontrado');
      error.statusCode = NOT_FOUND;
      throw error;
    })
    .then((user) => res.send({
      _id: user._id,
      name: user.name,
      about: user.about,
      avatar: user.avatar,
      email: user.email,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(BAD_REQUEST).send({
          message: 'Los datos proporcionados no son válidos',
        });
      }
      return res.status(err.statusCode || INTERNAL_SERVER_ERROR).send({
        message: 'Ha ocurrido un error en el servidor',
      });
    });
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;
  let foundUser;

  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        const error = new Error('Email o contraseña incorrectos');
        error.statusCode = UNAUTHORIZED;
        throw error;
      }

      foundUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then((matched) => {
      if (!matched) {
        const error = new Error('Email o contraseña incorrectos');
        error.statusCode = UNAUTHORIZED;
        throw error;
      }

      const token = jwt.sign(
        { _id: foundUser._id },
        JWT_SECRET,
        { expiresIn: '7d' },
      );

      return res.send({ token });
    })
    .catch((err) => {
      if (err.statusCode === UNAUTHORIZED) {
        return res.status(UNAUTHORIZED).send({
          message: 'Email o contraseña incorrectos',
        });
      }

      return res.status(INTERNAL_SERVER_ERROR).send({
        message: 'Ha ocurrido un error en el servidor',
      });
    });
};
