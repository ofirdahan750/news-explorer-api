const Article = require('../models/article');

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
  const { articleId } = req.params;
  const { owner } = req.body;

  Article.authAndDelete({ articleId, reqUserId: req.user._id, ownerId: owner })
    .then((article) => res.send(article))
    .catch((err) => {
      next(err);
    });
};

module.exports.createArticle = (req, res, next) => {
  Article.create({ ...req.body, owner: req.user._id })
    .then((article) => res.send(article))
    .catch((err) => {
      next(err);
    });
};
