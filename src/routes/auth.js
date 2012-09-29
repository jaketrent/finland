var persona = require('./../lib/persona');

module.exports = function (app) {

  app.get('/admin/login', function (req, res) {
    res.render('admin/login.jade');
  });

  app.post('/admin/login', persona.login);

  app.get('/admin/logout', persona.logout);

};