#!/usr/bin/env node

/* eslint-disable no-console */
const fs = require("fs/promises");
const mongoose = require("mongoose");
const path = require("path");

const Video = require("../models/video");

/**
 * Add hyphens to a date string such that `YYYYMMDD` becomes `YYYY-MM-DD`. This
 * function is idempotent; repeated applications have no effect.
 *
 * @param {string} date
 * @returns {string} the date with hyphens
 */
function hyphenDate(date) {
  return date.replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3");
}

const dir = process.argv[2];

mongoose.connect("mongodb://localhost:27017/youtube");

fs.readdir(dir).then((files) => {
  Promise.all(
    files
      .filter((file) => file.endsWith(".info.json"))
      .map((file) =>
        fs.readFile(path.join(dir, file), "utf8").then((text) => {
          const obj = JSON.parse(text);
          obj.upload_date = hyphenDate(obj.upload_date);
          return Video.create(obj).catch(() => null);
        })
      )
  )
    .then((result) => {
      const videos = result.filter((x) => x !== null);
      videos.forEach((video) => console.log(video));
      console.log("Added", videos.length, "videos");
    })
    .finally(mongoose.disconnect);
});
