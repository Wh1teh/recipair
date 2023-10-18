const db = require('../database');

const recipe = {
  getAll: function (callback) {
    return db.query('select * from recipe', callback);
  },
  getById: function (id, callback) {
    var query = `
    SELECT *
FROM recipe 
WHERE id = ?;
    `;

    return db.query(query, [id], callback);
  },
  getIngredientsById: function (id, callback) {
    var query = `
    SELECT ri.name, ri.amount, ri.unit, ri.optional, ri.snippet 
    FROM recipe_ingredient ri 
    WHERE ri.recipe_id = ?;
    `;

    return db.query(query, [id], callback);
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