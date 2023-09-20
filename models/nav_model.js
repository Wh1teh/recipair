const db = require('../database');

const nav = {
  getGenericNav: function(callback) {
    return db.query('select * from course', callback);
  },
};
module.exports = course;