
var express = require('express');
var superagent = require('superagent');
var cheerio = require('cheerio');
var app = express();
app.get('/',function (req, res, next) {
  // res.send('hello world');
  superagent.get('http://dig.chouti.com')
    .end(function (err, sres) {
      if(err){
        return next(err);
      }
      var $ = cheerio.load(sres.text);
      var items = [];
      $('#content-list .part2').each(function (idx, element){
        var $element = $(element);
        items.push({
          title: $element.attr('share-title'),
          href: $element.attr('href'),
          img: $element.attr('share-pic')
        });
      });
      res.send(items);
    });
});

app.listen(3000, function () {
  console.log('app is listening at port 3000');
});
