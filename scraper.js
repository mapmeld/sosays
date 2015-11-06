var request = require('request');
var cheerio = require('cheerio');
var Entities = require('html-entities').AllHtmlEntities;
var soParser = require('stackoverflow-parser');
var si = require('search-index')({
  deletable: false
});

var entities = new Entities();

function mapPage(pageNum) {
  var scrape = 'http://stackoverflow.com/questions/tagged/command-line?sort=votes&page=' + pageNum + '&pagesize=50';
  request(scrape, function (err, response, body) {
    if (err) {
      throw err;
    }

    var $ = cheerio.load(body);

    var questions = $('.question-summary h3');
    var summaries = $('.question-summary .excerpt');
    var qlinks = $('.question-summary .question-hyperlink');

    function loadQuestion (q) {
      var qdata = {
        title: $(questions[q]).text(),
        sum: $(summaries[q]).text(),
        href: 'http://stackoverflow.com' + $(qlinks[q]).attr('href')
      }
      soParser.parse('http://stackoverflow.com' + $(qlinks[q]).attr('href'), function (err, parsed) {
        if (err) {
          throw err;
        }

        if (parsed.answers.length && (parsed.answers[0].content.indexOf('<code>') > -1) && (parsed.answers[0].content.indexOf('</code>') > -1)) {
          var cmd = entities.decode(parsed.answers[0].content.split('<code>')[1].split('</code>')[0]);
          qdata.cmd = cmd;

          si.add(qdata, null, function (err) {
            if (err) {
              throw err;
            }
          });
        }

        if (q + 1 < questions.length) {
          setTimeout(function() {
            loadQuestion(q + 1);
          }, 750);
        } else if (questions.length >= 50 && pageNum < 15) {
          console.log('finished page ' + pageNum);
          pageNum++;
          setTimeout(function() {
            mapPage(pageNum);
          }, 750);
        }
      });
    }

    loadQuestion(0);
  });
}

mapPage(1);
