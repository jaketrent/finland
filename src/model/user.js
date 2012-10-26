var mongoose = require('mongoose');

mongoose.set('debug', true);
var databaseUrl = process.env.MONGOHQ_URL || 'mongodb://localhost:27017/finland';
var db = mongoose.createConnection(databaseUrl);
db.on('error', handleError);

function handleError(data) {
  console.log('ERROR IN MONGO!');
  console.log(data);
}

var Schema = mongoose.Schema
  , ObjectId = Schema.ObjectID;

var UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    trim: true,
    unique: true
  }
});

var User = db.model('user', UserSchema);

module.exports.add = function (userData, next) {
  var user = new User(userData);
  user.save(function (error, data) {
    if (error) {
      next(error);
    } else {
      next(null, data);
    }
  });
};

module.exports.save = function (id, userData, next) {
  User.update({
      _id: id
    },
    _.omit(userData, '_id'),
    function (err, numberAffected, raw) {
      if (err) {
        next(err);
      } else {
        next(null, userData);
      }
    });
};

module.exports.remove = function (id, next) {
  User.findById(id, function (err, user) {
    if (err) {
      next(err);
    } else {
      user.remove(function (err, user) {
        if (err) {
          next(false);
        } else {
          next(true);
        }
      });
    }
  });
};

module.exports.findAll = function (next) {
  User.find({}, function (error, data) {
    if (error) {
      next(error);
    } else {
      next(null, data);
    }
  });
};

module.exports.findOne = function (attrs, next) {
  User.find(attrs, function (error, data) {
    if (error) {
      next(error);
    } else {
      next(null, data[0]);
    }
  });
};
