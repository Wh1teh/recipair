const db = require('../database');

const recipe = {
  getAll: function (callback) {
    return db.query('select * from recipe', callback);
  },
  getById: function (id, callback) {
    var query = 
    `SELECT r.*, 
    GROUP_CONCAT(
      JSON_OBJECT(
        'name', ri.name,
        'amount', ri.amount,
          'unit', ri.unit,
          'optional', ri.optional,
          'snippet', ri.snippet
      )
    ) AS ingredients
    FROM recipe r
    JOIN recipe_ingredient ri ON r.id = ri.recipe_id
    WHERE r.id = ?
    GROUP BY r.id;`;

    return db.query(query, id, callback);
  },
  getIngredientsById: function (id, callback) {
    return db.query('SELECT r.*, ri.* ' +
      'FROM recipe r ' +
      'JOIN recipe_ingredient ri ON r.id = ri.recipe_id ' +
      'WHERE r.id = 4', id, callback);
  },
  getByParameters: function (params, callback) {
    //select all recipes that contain the keywords
    var query =
      'SELECT DISTINCT r.* \n' +
      'FROM recipe r \n';

    var midQuery = 'INNER JOIN recipe_ingredient ri0 ON r.id = ri0.recipe_id \n';
    var tailQuery = 'WHERE ri0.name REGEXP ? \n';

    if (Array.isArray(params)) {
      for (let index = 1; index < params.length; index++) {
        midQuery += 'INNER JOIN recipe_ingredient ri' + index + ' ON r.id = ri' + index + '.recipe_id \n';
        tailQuery += 'AND ri' + index + '.name REGEXP ? \n';
      }
    }

    query += midQuery + tailQuery;

    console.log(query + ", " + params);

    // Execute the query
    return db.query(query, params, callback);
  },
};
module.exports = recipe;