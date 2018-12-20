const mongoose = require('mongoose');

const dbInit = () => {
  mongoose
    .connect(`mongodb://finch:Finch2048@ds131711.mlab.com:31711/finch-people`)
    .then(() => console.log('mongoDB connected'))
    .catch(err => console.log(err));
};

module.exports = {
  init: dbInit
};
