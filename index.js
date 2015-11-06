var rebootSI = true;
var si = require('search-index')({
  deletable: false
});

function sosays (searchbox, callback, globalInstall) {
  var queryObj = {
    query: {
      '*': searchbox.split(/\s+/)
    }
  };

  if (globalInstall && rebootSI) {
    rebootSI = false;
    var p = '/usr/local/lib/node_modules/sosays/si';
    if (process.platform.indexOf('win') === 0) {
      p = '%AppData%\\npm\\node_modules\\sosays\\si';
    }
    si = require('search-index')({
      deletable: false,
      indexPath: p
    });
  }

  try {
    si.search(queryObj, function (err, searchResults) {
      if (err) {
        // return regular errors
        return callback(err, null);
      }
      // return any hits
      return callback(null, searchResults.hits.map(function (hit) {
        return hit.document;
      }));
    });
  } catch(e) {
    // catch LevelDB lock error
    return callback(err, null);
  }
}

module.exports = sosays;
