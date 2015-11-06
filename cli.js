#! /usr/bin/env node

var exec = require('child_process').exec;
var sosays = require('./index.js');

if (process.argv.length > 2) {
  console.log('searching...');
  var remainder = process.argv.slice(2).join(' ');
  sosays(remainder, function (err, results) {
    if (err) {
      console.log('search failed, check it out: ' + JSON.stringify(err));
    } else if (!results.length) {
      console.log('search had no results :-(');
      console.log('go to the live StackOverflow site to make searches');
    } else {
      function printResult (result) {
        console.log('Q: ' + result.title);
        console.log('-----------------');
        console.log(result.cmd);
        console.log('-----------------');
      }

      if (results.length > 1) {
        console.log('there were multiple answered questions:');
      }
      for (var q = 0; q < 5 && q < results.length; q++) {
        printResult(results[q]);
      }
      if (results.length === 1) {
        console.log('enter 1 to load URL, 42 to run, any other to continue');

        process.stdin.on('data', function (text) {
          if ((text + '').trim() === '1') {
            var runner = 'gnome-open';
            if (process.platform === 'darwin') {
              runner = 'open';
            }
            if (process.platform.indexOf('win') === 0) {
              runner = 'start';
            }
            console.log(runner);
            exec(runner + ' ' + results[0].href);
          } else if ((text + '').trim() === '42') {
            console.log('here we go!');
            exec(result[0].cmd);
          }
          process.exit();
        });
      }
    }
  });
} else {
  console.log('no search was made: keep typing after \'sosays\'.');
}
