const router = require('express').Router();
const { celebrate } = require('celebrate');

const {
  getArticles,
  createArticle,
  deleteArticle,
} = require('../controllers/articles');
const {
  getCreateArticleSchema,
  getDeleteArticleSchema,
} = require('../utils/validations');

router.get('/', getArticles);
router.post('/', celebrate(getCreateArticleSchema), createArticle);
router.delete('/:cardId', celebrate(getDeleteArticleSchema), deleteArticle);

module.exports = router;
