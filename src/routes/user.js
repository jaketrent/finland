var mongoose = require('mongoose');

mongoose.set('debug', true);
var db = mongoose.createConnection('localhost', 'finland'); // todo: put mongohq url here
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
  }
  // todo: include bcrypt password
});

var User = db.model('user', UserSchema);

function allFieldsMinusId(obj) {
  var newObj = {};
  for (field in obj) {
    if (field !== '_id') {
      newObj[field] = obj[field];
    }
  }
  return newObj;
}

module.exports.add = function (userData, next) {
  var user = new User(userData);
  user.save(function (error, data) {
    if (error) {
      next(error);
    } else {
      next(data);
    }
  });
};

module.exports.save = function (id, userData, next) {
  User.update({
      _id: id
    },
    allFieldsMinusId(userData),
    function (err, numberAffected, raw) {
      if (err) {
        next(err);
      } else {
        next(userData);
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
      next(data);
    }
  });
};

module.exports.findByUsername = function (username, next) {
  User.find({
    username: username
  }, function (error, data) {
    if (error) {
      next(error);
    } else {
      next(data[0]);
    }
  });
};
