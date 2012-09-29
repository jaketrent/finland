var sec = require('./../lib/sec');

module.exports = function (app) {
  app.get('/admin/login', function (req, res) {
    res.render('admin/login');
  });

  app.get('/admin', sec.isInTheClub, function (req, res) {
    res.render('admin/index');
  });

  app.get('/admin/:refreshedPartial', sec.isInTheClub, function (req, res) {
    res.render('admin/index');
  });
};