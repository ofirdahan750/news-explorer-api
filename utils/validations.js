const Joi = require('joi');
const { Segments } = require('celebrate');
Joi.objectId = require('joi-objectid')(Joi);

// const isUrlVaild = (value, helpers) =>
// (validator.isURL(value) ? value : helpers.error('string.uri'));

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

    title: Joi.string().required(),

    text: Joi.string().required(),

    date: Joi.string().required(),

    source: Joi.string().required(),

    link: Joi.string().required(),

    image: Joi.string().required(),
  }),
};

const getDeleteArticleSchema = {
  [Segments.PARAMS]: Joi.object().keys({
    articleId: Joi.string().required().hex(),
  }),
};

module.exports = {
  getUserAuthSchema,
  getCreateArticleSchema,
  getDeleteArticleSchema,
};
