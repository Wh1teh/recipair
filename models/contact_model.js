const db = require('../database');

const path = __dirname + '/../public/html/';

const contact = {
  getContactPage: function(response) {
    return response.sendFile('contact.html', { root:  path });
    return db.query('select * from course', callback);
  },
};
module.exports = contact;