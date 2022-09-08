const { default: mongoose } = require("mongoose");

const ExperienceSchema = new mongoose.Schema({
  detail: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: false,
  },
  order: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Experience", ExperienceSchema);
