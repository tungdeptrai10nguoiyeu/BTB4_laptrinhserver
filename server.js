var http = require('http');
var formidable = require('formidable');
var fs = require('fs');

http.createServer(function (req, res) {
  if (req.url == '/fileupload' && req.method.toLowerCase() === 'post') {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      var oldpath = files.filetoupload.path;
      var newpath = 'C:/Users/Your Name/' + files.filetoupload.name;
      fs.rename(oldpath, newpath, function (err) {
        if (err) throw err;
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write('<h1>File uploaded and moved!</h1>');
        res.write('<img src="/showimage?filename=' + files.filetoupload.name + '">');
        res.end();
      });
    });
  } else if (req.url == '/showimage' && req.method.toLowerCase() === 'get') {
    var filename = req.query.filename;
    var imagePath = 'C:/Users/Your Name/' + filename;
    var imgStream = fs.createReadStream(imagePath);
    res.writeHead(200, {'Content-Type': 'image/jpeg'});
    imgStream.pipe(res);
  } else {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
    res.write('<input type="file" name="filetoupload"><br>');
    res.write('<input type="submit">');
    res.write('</form>');
    return res.end();
  }
}).listen(2004);