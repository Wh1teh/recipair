const db = require('../database');

const recipe = {
  getAll: function (callback) {
    return db.query('select * from recipe', callback);
  },
  getById: function (ids, callback) {
    //select all recipes that contain the keywords
    var query =
      'SELECT DISTINCT r.* \n' +
      'FROM recipe r \n';

    var midQuery = 'INNER JOIN recipe_ingredient ri0 ON r.id = ri0.recipe_id \n';
    var tailQuery = 'WHERE ri0.name REGEXP ? \n';

    if(Array.isArray(ids)) {
      for (let index = 1; index < ids.length; index++) {
        midQuery += 'INNER JOIN recipe_ingredient ri' + index + ' ON r.id = ri' + index + '.recipe_id \n';
        tailQuery += 'AND ri' + index +'.name REGEXP ? \n';
      }
    }

    query += midQuery + tailQuery;

    console.log(query + ", " + ids);

    // Execute the query
    return db.query(query, ids, callback);
  },
};
module.exports = recipe;