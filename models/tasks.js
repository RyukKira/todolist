// Schema
const mongoose = require("mongoose");
const { Schema } = mongoose;

const taskSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name field is required!"],
  },
  description: String,
});

const Task = mongoose.model("task", taskSchema);

module.exports = Task;
