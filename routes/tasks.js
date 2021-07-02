const express = require("express");
const router = express.Router();
const Task = require("./models/tasks");

router
  .route("/tasks")
  .get((req, res) => {
    Task.find((err, tasks) => {
      if (!err) {
        res.send(tasks);
      } else {
        res.send(err);
      }
    });
  })
  .post((req, res) => {
    const newTask = new Task({
      name: req.body.name,
      description: req.body.description,
    });
  })
  .delete((req, res) => {
    Task.deleteMany(err => {
      if (!err) {
        res.send("Successfully deleted all tasks.");
      } else {
        res.send(err);
      }
    });
  });

// ======================

router
  .route("/tasks/:id")
  .get((req, res) => {
    Task.findOne({ _id: req.params.id }, (err, foundTask) => {
      if (foundTask) {
        res.send(foundTask);
      } else {
        res.send(err);
      }
    });
  })
  .put((req, res) => {
    Task.update(
      { _id: req.params.id },
      { name: req.body.name, description: req.body.description },
      { overwrite: true },
      err => {
        if (!err) {
          res.send(`Successfully updated ${req.body.name} task`);
        } else {
          res.send(err);
        }
      }
    );
  })
  .patch((req, res) => {
    Task.updated({ _id: req.params.id }, { $set: req.body }, err => {
      if (!err) {
        res.send(`Successfully updated ${req.body.name} task`);
      } else {
        res.send(err);
      }
    });
  })
  .delete((req, res) => {
    Task.deleteOne({ _id: req.params.id }, err => {
      if (!err) {
        res.send(`Successfully deleted ${req.body.name} task`);
      } else {
        res.send(err);
      }
    });
  });
