var sec = require('./../lib/sec');

module.exports = function (app) {
  app.get('/admin/tmpl/:tmplName', sec.isInTheClub, function (req, res) {
    res.render('admin/partials/' + req.params.tmplName + '.jade');
  });
};