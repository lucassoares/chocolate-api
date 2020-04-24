const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:17017/chocolates', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = mongoose;
