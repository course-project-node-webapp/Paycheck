'use strict';

module.exports = function(userData) {
  function addSkill(req, res) {
    const skill = req.body.skill;
    const userId = req.user._id;

    userData.getUserById(userId)
      .then((user) => {
        if (!user) {
          return res.status(401);
        }

        user.skills.push({ name: skill });
        return userData.updateUser(user);
      })
      .then(() => {
        res.status(201).send();
      })
      .catch((err) => {
        res.send(err.message);
      });
  }

  return {
    addSkill
  };
};