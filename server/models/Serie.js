const { default: mongoose } = require("mongoose");

const SerieSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  detail: {
    type: String,
  },
  order: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Serie", SerieSchema);
