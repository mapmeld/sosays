var path = require('path');

var si = require('search-index')({
  deletable: false,
  indexPath: path.join(__dirname, 'si')
});

function sosays (searchbox, callback, globalInstall) {
  var queryObj = {
    query: {
      '*': searchbox.split(/\s+/)
    }
  };

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
