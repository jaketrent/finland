var sec = require('./../lib/sec');

module.exports = function (app) {
  app.get('/admin/partial/:tmplName', sec.isInTheClub, function (req, res) {
    res.render('admin/partial/' + req.params.tmplName + '.jade');
  });
};