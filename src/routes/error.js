
module.exports = function (app) {
  app.get('/error/:code', function (req, res) {
    res.render('error/' + req.params.code + '.jade');
  });
};