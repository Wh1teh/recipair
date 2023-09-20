const db = require('../database');

const page = {
  getIndex: function(callback) {
    return db.query('select * from course', callback);
  },
};
module.exports = page;