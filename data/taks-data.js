/* globals Promise */

'use strict';

module.exports = function ({models, validator}) {
  const {
    Task
  } = models;

  function createTask(task) {
    const newTask = Task.getTask(task);

    return new Promise((resolve, reject) => {
      newTask.save((err) => {
        if (err) {
          return reject(err);
        }

        return resolve(newTask);
      });
    });
  }

  function findPage(page, size) {
    const promiseData = new Promise((resolve, reject) => {
      Task.find()
        .skip(page * size)
        .limit(size)
        .exec((err, tasks) => {
          if (err) {
            return reject(err);
          }

          return resolve(tasks);
        });
    });

    const promiseCount = new Promise((resolve, reject) => {
      Task.count((err, count) => {
        if (err) {
          return reject(err);
        }

        const pageCount = Math.ceil(count / size);
        return resolve(pageCount);
      });
    });

    return Promise.all([
      promiseData,
      promiseCount
    ]);
  }

  function findById(id) {
    return new Promise((resolve, reject) => {
      Task.findOne({
        _id: id
      }, (err, task) => {
        if (err) {
          return reject(err);
        }

        return resolve(task);
      });
    });
  }

  function findByName(name) {
    return new Promise((resolve, reject) => {
      Task.findOne({
        name
      }, (err, task) => {
        if (err) {
          return reject(err);
        }

        return resolve(task);
      });
    });
  }

  function updateTask(task) {
    return new Promise((resolve, reject) => {
      task.save((err, updated) => {
        if (err) {
          return reject(err);
        }

        return resolve(updated);
      });
    });
  }

  return {
    createTask,
    findPage,
    findById,
    findByName,
    updateTask
  };
};