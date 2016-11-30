'use strict';

module.exports = function(data) {
  function search(req, res) {
    console.log(req.headers);

    const query = req.query;

    const searchTerm = query.searchTerm;
    const searchCategory = query.searchCategory;

    // console.log(searchTerm);
    // console.log(searchCategory);
  }

  return {
    search
  };
};