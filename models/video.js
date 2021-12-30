const mongoose = require("mongoose");

const { Schema } = mongoose;

const VideoSchema = new Schema({
  id: {
    type: String,
    index: true,
    unique: true,
    required: true,
    minlength: 11,
    maxlength: 11,
  },
  title: { type: String, maxlength: 100 },
  description: { type: String, maxlength: 5000 },
  upload_date: { type: Date },
  channel_id: { type: String, minlength: 24, maxlength: 24 },
  duration: { type: Number, get: Math.round, set: Math.round, min: 0 },
  view_count: { type: Number, get: Math.round, set: Math.round, min: 0 },
  thumbnail: { type: String, maxlength: 255 },
  ext: { type: String, maxlength: 4 },
});

module.exports = mongoose.model("Video", VideoSchema);
