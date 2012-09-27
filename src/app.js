var express = require('express')
  , http = require('http')
  , path = require('path')
  , flash = require('connect-flash');

var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
  function(username, password, done) {
    done(null, { id: 123, username: 'jaketrent', password: 'jaketrent' });
  }
));

var app = express();



app.configure(function(){
  app.set('port', process.env.PORT || 5000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger());

  app.use(express.cookieParser());
  app.use(express.bodyParser());
  app.use(express.session({ secret: 'keyboard cat' }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(flash());

  app.use(express.methodOverride());
  app.use(app.router);
  app.use(require('stylus').middleware(__dirname + '/static'));
  app.use(express.static(path.join(__dirname, 'static')));
});

app.configure('development', function () {
  app.use(express.errorHandler({
    dumpExceptions: true,
    showStack:true
  }));
});
app.configure('production', function () {
  app.use(express.errorHandler());
});

var admin = require('./routes/admin')(app);

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  done(null, { id: 123, username: 'jaketrent', password: 'jaketrent' });
});

//app.get('/', routes.index);
//app.get('/users', routes.user.list);
//app.get('/login', routes.auth.loginPg);
app.post('/admin/login',
  passport.authenticate('local', { successRedirect: '/',
    successRedirect: '/admin',
    failureRedirect: '/admin/login',
    failureFlash: true })
);
//app.get('/admin', protect, routes.admin.index);
/*function protect(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login')
}*/

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
