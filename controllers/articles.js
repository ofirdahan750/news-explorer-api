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
    .catch((err) => new ErrorHandler(404, `No card found, Error: ${err}`));
};

module.exports.deleteArticle = (req, res, next) => {
  Article.findById(req.params.articleId)
    .select('owner')
    .then((foundArticle) => {
      if (!foundArticle) {
        next(
          new ErrorHandler(
            404,
            `No card found with ID ${req.params.articleId}`,
          ),
        );
        return;
      }
      if (req.user._id !== String(foundArticle.owner)) {
        next(new ErrorHandler(401, 'unauthorized'));
        return;
      }
      Article.findByIdAndRemove(req.params.articleId)
        .then(() => {
          Article.find({}).then((userArticles) => res.send(userArticles));
        })
        .catch((err) => next(new ErrorHandler(404, `No card found, Error: ${err}`)));
    })
    .catch((err) => next(new ErrorHandler(401, `No card found with ID ${req.params.articleId} Error : ${err}`)));
};
module.exports.createArticle = (req, res, next) => {
  Article.create({ ...req.body, owner: req.user._id })
    .then((article) => res.send(article))
    .catch((err) => {
      next(err);
    });
};
