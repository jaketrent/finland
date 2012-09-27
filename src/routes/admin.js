var sec = require('./../sec');
module.exports = function (app) {
  app.get('/admin/login', function (req, res) {
    res.render('admin/login');
  });
  app.get('/admin', sec.authenticate, function (req, res) {
    res.render('admin/index');
  });
};