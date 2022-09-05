const validator = require('validator');
const { Segments } = require('celebrate');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const isUrlVaild = (value, helpers) => (validator.isURL(value) ? value : helpers.error('string.uri'));

const getUserAuthSchema = {
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required().min(2).max(200)
      .required(),
    name: Joi.string().min(2).max(30),
  }),
};

const getCreateArticleSchema = {
  body: Joi.object().keys({
    keyword: Joi.string().max(42).min(2).required(),

    title: Joi.string().max(30).min(2).required(),

    text: Joi.string().required(),

    date: Joi.string().required(),

    source: Joi.string().required(),

    link: Joi.string().required().custom(isUrlVaild),

    image: Joi.string().required().custom(isUrlVaild),
  }),
};

const getDeleteArticleSchema = {
  [Segments.PARAMS]: Joi.object().keys({
    userId: Joi.objectId().required(),
  }),
  body: Joi.object().keys({
    owner: Joi.objectId().required(),
  }),
};

module.exports = {
  getUserAuthSchema,
  getCreateArticleSchema,
  getDeleteArticleSchema,
};
