var client = require('cheerio-httpcli');
var URL = require('url');
var request = require('request');
var fs = require('fs');

// get html page
var url = "https://en.wikipedia.org/wiki/Main_Page";
var param = {};
client.fetch(url, param, function(err, $, res) {
  
  if (err) { console.log("error"); return; }
  
  $("img").each( function(idx) {
    
    var src = $(this).attr('src');
    absUrl = url + src; // convert to absolute path
    
    var fname = URL.parse(absUrl).pathname; // filename
    fname = "./img/" + fname.replace(/[^a-zA-Z0-9\.]+/g, '_');

    request(absUrl).pipe(fs.createWriteStream(fname)); // download image

  });
});