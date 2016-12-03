'use strict';

module.exports = function(userData) {
  function addSkill(req, res) {
    const skill = req.body.skill;
    const userId = req.user._id;

    userData.getUserById(userId)
      .then((user) => {
        if (!user) {
          return res.status(401).send();
        }

        user.skills.push({ name: skill });
        return userData.updateUser(user);
      })
      .then(() => {
        res.status(201).send();
      })
      .catch((err) => {
        res.status(502).send(err.message);
      });
  }

  function removeSkill(req, res) {
    const skill = req.body.skill;
    const userId = req.user._id;

    userData.getUserById(userId)
      .then((user) => {
        if (!user) {
          return res.status(401).send();
        }

        let skillIndex = user.skills
          .findIndex(s => s.name === skill);
        user.skills.splice(skillIndex, 1);

        return userData.updateUser(user);
      })
      .then(() => {
        res.status(201).send();
      })
      .catch((err) => {
        res.status(502).send(err.message);
      });
  }

  function updateSummary(req, res) {
    const summary = req.body.summary;
    const userId = req.user._id;

    userData.getUserById(userId)
      .then((user) => {
        if (!user) {
          return res.status(401).send();
        }

        user.summary = summary;
        return userData.updateUser(user);
      })
      .then(() => {
        res.status(201).send();
      })
      .catch((err) => {
        res.status(502).send(err.message);
      });
  }

  function updateSpecialty(req, res) {
    const specialty = req.body.specialty;
    const userId = req.user._id;

    userData.getUserById(userId)
      .then((user) => {
        if (!user) {
          return res.status(401).send();
        }

        user.specialty = specialty;
        return userData.updateUser(user);
      })
      .then(() => {
        res.status(201).send();
      })
      .catch((err) => {
        res.status(502).send(err.message);
      });
  }

  return {
    addSkill,
    removeSkill,
    updateSummary,
    updateSpecialty
  };
};