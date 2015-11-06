var request = require('request');
var cheerio = require('cheerio');
var so = require('stackoverflow-parser');
var si = require('search-index')({
  deletable: false
});

function mapPage(pageNum) {
  var scrape = 'http://stackoverflow.com/questions/tagged/command-line?sort=votes&page=' + pageNum + '&pagesize=50';
  request(scrape, function (err, response, body) {
    if (err) {
      throw err;
    }

    var $ = cheerio.load(body);

    var questions = $('.question-summary h3');
    var summaries = $('.question-summary .excerpt');

    for (var q = 0; q < questions.length; q++) {
      var qdata = {
        title: $(questions[q]).text(),
        sum: $(summaries[q]).text()
      }
      si.add(qdata, null, function (err) {
        if (err) {
          throw err;
        }
      });
    }

    if (questions.length >= 50 && pageNum < 15) {
      console.log('finished page ' + pageNum);
      pageNum++;
      mapPage(pageNum);
    }
  });
}

mapPage(1);
