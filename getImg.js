// モジュールの読込
var client = require('cheerio-httpcli');
var URL = require('url');
var request = require('request');
var fs = require('fs');
var savedir = __dirname + "/img"; //

var url = "https://en.wikipedia.org/wiki/Main_Page";
// ダウンロード
// var param = {};
// client.fetch(url, param, function(err, $, res) {
//   if (err) { console.log("error"); return; }
//   // リンクを抽出して表示
//   $("img").each(function(idx) {
//     var src = $(this).attr('src');
//     src = URL.resolve(url, src);
//     console.log(src);
//   });
// });

// HTMLファイルの指定
// var url = "http://ja.wikipedia.org/wiki/イヌ";
var param = {};
// HTMLファイルの取得 --- (※4)
client.fetch(url, param, function(err, $, res) {
  
  if (err) { console.log("error"); return; }
  
  // console.log( $("img").attr('src') );

  $("img").each( function(idx) {
    
    var src = $(this).attr('src');
    // 相対パスを絶対パスに変更 --- (※6)
    // src = url + src
    
    absUrl = url + src; 
    
    // 保存用のファイル名を作成 --- (※7)
    var fname = URL.parse(absUrl).pathname;
    fname = savedir + "/" + fname.replace(/[^a-zA-Z0-9\.]+/g, '_');
    // ダウンロード --- (※8)
    request(absUrl).pipe(fs.createWriteStream(fname));

  });
});