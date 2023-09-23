const db = require('../database');

const recipe = {
  getAll: function (callback) {
    return db.query('select * from recipe', callback);
  },
  getById: function (ids, callback) {
    // Convert the array of IDs into a comma-separated string
    if(Array.isArray(ids)) {
      ids.join(',');
    }
    console.log(ids);

    //select all recipes that contain the keywords
    const query = 'SELECT DISTINCT r.* FROM recipe r ' +
    'INNER JOIN recipe_ingredient ri ON r.id = ri.recipe_id ' +
    'WHERE ri.name IN (?)';
    const params = [ids];

    // Execute the query
    return db.query(query, params, callback);
  },
};
module.exports = recipe;