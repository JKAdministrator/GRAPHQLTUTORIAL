const { default: mongoose } = require("mongoose");

const FrameSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  detail: {
    type: String,
    required: false,
  },
  order: {
    type: Number,
    required: true,
  },
  serieId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Serie",
  },
});

module.exports = mongoose.model("Frame", FrameSchema);
