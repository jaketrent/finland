var qs = require('qs')
  , https = require('https')
  , os = require('os');

module.exports.login = function(req, res){
  var audience = req.headers.host;
  function onVerifyResp(bidRes) {
    var data = "";
    bidRes.setEncoding('utf8');
    bidRes.on('data', function (chunk) {
      data += chunk;
    });
    bidRes.on('end', function () {
      var verified = JSON.parse(data);
      res.contentType('application/json');
      if (verified.status == 'okay') {
        console.info('browserid auth successful, setting req.session.email');
        req.session.email = verified.email;
        res.redirect('/admin');
      } else {
        console.error(verified.reason);
        res.writeHead(403);
      }
      res.write(data);
      res.end();
    });
  };

  var assertion = req.body.assertion;

  var body = qs.stringify({
    assertion: assertion,
    audience: audience
  });
  console.info('verifying with browserid');
  var request = https.request({
    host: 'browserid.org',
    path: '/verify',
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'content-length': body.length
    }
  }, onVerifyResp);
  request.write(body);
  request.end();
};


module.exports.logout = function (req, res) {
  req.session.destroy();
  res.redirect('/');
};