const mongoose = require("mongoose");

const TODOSchema = new mongoose.Schema(
  {
    content: {
      required: true,
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Todo", TODOSchema);
