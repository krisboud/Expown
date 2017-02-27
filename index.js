var express = require('express');
var app = express();
var showdown  = require('showdown'),
    converter = new showdown.Converter(),
    fs = require('fs');

app.set('view engine', 'ejs');
app.use('/assets', express.static('views/public/assets'))

app.get('/', function (req, res) {

  fs.readFile('markdown/home.md', 'utf8', function (err, data) {
    
    if (err) {
      res.send();
      return console.log(err);
    }
    
    var html = converter.makeHtml(data);
    res.render('public/index', {
        content: html
    });

  }); // end readfile

});

app.get('/pages/*', function (req, res) {
  var path = req.path.replace('/pages', '');

  fs.readFile('markdown' + path + ".md", 'utf8', function (err, data) {

    if (err) {
      res.send();
      return console.log(err);
    }
    
    var html = converter.makeHtml(data);
    res.render('public/index', {
        content: html
    });

  }); // end readfile

});

app.listen(3000, function () {
  console.log('App is listening on port 3000!')
})