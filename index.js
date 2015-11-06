var si = require('search-index')({
  deletable: false
});

function sosays (searchbox, callback) {
  try {
    si.search({ query: { '*': searchbox.split(/\s+/) } }, function (err, searchResults) {
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
