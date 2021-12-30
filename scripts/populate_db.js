#!/usr/bin/env node

/* eslint-disable no-console */
const fs = require("fs/promises");
const mongoose = require("mongoose");
const path = require("path");

const Video = require("../models/video");

const dir = process.argv[2];

mongoose.connect("mongodb://localhost:27017/youtube");

fs.readdir(dir).then((files) => {
  Promise.all(
    files
      .filter((file) => file.endsWith(".info.json"))
      .map((file) =>
        fs
          .readFile(path.join(dir, file), "utf8")
          .then((text) => Video.create(JSON.parse(text)).catch(() => null))
      )
  )
    .then((result) => {
      const videos = result.filter((x) => x !== null);
      videos.forEach((video) => console.log(video));
      console.log("Added", videos.length, "videos");
    })
    .finally(mongoose.disconnect);
});
