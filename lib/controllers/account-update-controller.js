'use strict';

module.exports = function(userData) {
  function addSkill(req, res) {
    const skill = req.body;
    console.log(skill);
  }

  return {
    addSkill
  };
};