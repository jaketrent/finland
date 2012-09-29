
var user = require('./../model/user');


var isAuthorized = function (req, res, next) {
  user.findOne({ email: req.session.email }, function (err, data) {
    if (err || !data) {
      res.redirect('/error/403');
    } else {
      next();
    }
  });
};

module.exports.isInTheClub = function (req, res, next) {
  if (req.session.email !== undefined) {
    isAuthorized(req, res, next);
  } else {
    res.redirect('/admin/login');
  }
};
