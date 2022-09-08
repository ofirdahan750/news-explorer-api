const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        /^https?:\/\/[w{3}.]?[A-Z0-9\-._~:?%#[\]/@!$&'()*+,;=]+[/#]?/gim.test(
          v,
        );
      },
      message: (props) => `${props.value} is not a valid URL`,
    },
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        /^https?:\/\/[w{3}.]?[A-Z0-9\-._~:?%#[\]/@!$&'()*+,;=]+[/#]?/gim.test(
          v,
        );
      },
      message: (props) => `${props.value} is not a valid URL`,
    },
  },
  owner: {
    type: mongoose.Types.ObjectId,
    select: false,
  },
});

module.exports = mongoose.model('article', articleSchema);
