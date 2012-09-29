var mongoose = require('mongoose'),
  _ = require('underscore');

mongoose.set('debug', true);
var db = mongoose.createConnection('localhost', 'finland');
db.on('error', handleError);

function handleError(data) {
  console.log('ERROR IN MONGO!');
  console.log(data);
}

var Schema = mongoose.Schema
  , ObjectId = Schema.ObjectID;

var ArtistSchema = new Schema({
  name: {
    type: String
  },
  photo: {
    type: String
  },
  bio: {
    type: String
  }
});

var Artist = db.model('artist', ArtistSchema);

module.exports.add = function (data, next) {
  var user = new Artist(data);
  user.save(function (error, data) {
    if (error) {
      next(error);
    } else {
      next(null, data);
    }
  });
};

module.exports.save = function (id, data, next) {
  Artist.update({
      _id: id
    },
    _.omit(data, '_id'),
    function (err, numberAffected, raw) {
      if (err) {
        next(err);
      } else {
        next(null, data);
      }
    });
};

module.exports.remove = function (id, next) {
  Artist.findById(id, function (err, user) {
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
  Artist.find({}, function (error, data) {
    if (error) {
      next(error);
    } else {
      next(null, data);
    }
  });
};

module.exports.findOne = function (attrs, next) {
  Artist.find(attrs, function (error, data) {
    if (error) {
      next(error);
    } else {
      next(null, data[0]);
    }
  });
};
