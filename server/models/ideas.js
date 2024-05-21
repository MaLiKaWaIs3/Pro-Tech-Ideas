const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bcrypt = require("bcrypt");

const IdeaSchema = new Schema({
  ideaId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    default:null
  },
  name: {
    type: String,
  },
  idea_name: {
    type: String
  },
  idea_Description: {
    type: String
  },
  remarks: {
    type: String,
    default:null,
  },
  message: {
    type: String,
    default: null
  },
  status: {
    type: Boolean,
    default: false,
  },
  expertId: {
    type: mongoose.Schema.Types.ObjectId,

  }
});
const Ideas = mongoose.model("Idea", IdeaSchema);

module.exports = Ideas;
