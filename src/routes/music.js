var path = require('path');
var mime = require('mime-component');
var fs = require('fs');

module.exports = function (app) {

  app.get('/download/music/:file', function (req, res) {

    console.log('download!!!...');
    var partialFileName = req.params.file;

    var file = process.cwd() + '/src/static/music/' + partialFileName;

    var filename = path.basename(file);
    var mimetype = mime.lookup(partialFileName.split('.').pop());

    res.setHeader('Content-disposition', 'attachment; filename=' + filename);
    res.setHeader('Content-type', mimetype);

    var filestream = fs.createReadStream(file);
    filestream.on('data', function(chunk) {
      res.write(chunk);
    });
    filestream.on('end', function() {
      res.end();
    });
  });

};