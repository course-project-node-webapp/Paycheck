'use strict';

module.exports = function(data) {
  function search(req, res) {
    const query = req.query;

    const searchTerm = query.searchTerm;
    const searchCategory = query.searchCategory;
  }

  return {
    search
  };
};