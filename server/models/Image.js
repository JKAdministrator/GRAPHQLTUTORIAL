const { default: mongoose } = require("mongoose");

const ImageSchema = new mongoose.Schema({
  public_id: {
    type: String,
  },
  secure_url: {
    type: String,
  },
  frameId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Frame",
  },
});

module.exports = mongoose.model("Image", ImageSchema);
