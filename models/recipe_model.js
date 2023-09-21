const db = require('../database');

const recipe = {
  getAll: function(callback) {
    return db.query('select * from recipe', callback);
  },
  getById: function(id, callback) {
    return db.query('select * from recipe where id=?', [id], callback);
  },
};
module.exports = recipe;