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

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzE3NmJjOGMwZGMwYjU0ODI3MjZkY2UiLCJpYXQiOjE2NjI0ODY0ODEsImV4cCI6MTY2MzA5MTI4MX0.3hxw_ntmqhROj5VxYxGTIM_FEY8vXYwWZXVZlD4Ol4o
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzE3OTQ3YTMwNzhhM2NjZDVjODdiMDkiLCJpYXQiOjE2NjI0ODk3NDMsImV4cCI6MTY2MzA5NDU0M30.PEuoAZLHqrzpgy_FffmzyLsOSCVNPxZhfDovLdYsMhA
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
  const article = { ...req.body, owner: req.user._id };
  console.log('article1:', article);
  Article.create(article)
    .then((article) => {
      console.log('article:', article);

      return res.send(article);
    })
    .catch((err) => {
      next(err);
    });
};
