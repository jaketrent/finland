var sec = require('./../lib/sec')
  , artist = require('./../model/artist');

module.exports = function (app) {

  app.get('/ws/artist', function (req, res) {
    artist.findAll(function (err, artists) {
      res.send(artists);
    });
  });

  app.get('/ws/artist/:id', function (req, res) {
    artist.findOne({ _id: req.params.id }, function (artist) {
      res.send(artist);
    });
  });

  app.post('/ws/artist', sec.isInTheClub, function (req, res) {
    artist.add(req.body, function (err, data) {
      res.send(data);
    });
  });

  app.put('/ws/artist/:id', sec.isInTheClub, function (req, res) {
    artist.save(req.params.id, req.body, function (err, data) {
      res.send(data);
    });
  });

  app.delete('/ws/artist/:id', sec.isInTheClub, function (req, res) {
    artist.remove(req.params.id, function (success) {
      if (success) {
        res.status(204).send();
      } else {
        res.status(400).send();
      }
    });
  });

};