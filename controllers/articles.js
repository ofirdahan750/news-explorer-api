const Article = require('../models/article');
const { ErrorHandler } = require('../utils/error');

module.exports.getArticles = (req, res, next) => {
  Article.find({})
    .select('+owner')
    .then((articles) => {
      const userArticles = articles.filter(
        (article) => String(article.owner) === req.user._id,
      );
      res.send(userArticles);
    })
    .catch((err) => {
      next(err);
    });
};

module.exports.deleteArticle = (req, res, next) => {
  Article.findById(req.params.articleId)
    .select('owner')
    .then((foundArticle) => {
      if (!foundArticle) {
        next(new ErrorHandler(404, 'No card found'));
        return;
      }
      if (req.user._id !== String(foundArticle.owner)) {
        next(new ErrorHandler(404, 'No card found'));
        return;
      }
      Article.findByIdAndRemove(req.params.articleId)
        .then(() => {
          Article.find({}).then((userArticles) => res.send(userArticles));
        })
        .catch(next);
    })
    .catch(next);
};
module.exports.createArticle = (req, res, next) => {
  Article.create({ ...req.body, owner: req.user._id })
    .then((article) => res.send(article))
    .catch((err) => {
      next(err);
    });
};
