import express from "express";

import { Channel } from "../models";

const router = express.Router();

router.get("/", (req, res) => {
  Channel.findAll().then((channels) => {
    res.render("index", {
      channels: channels.map((channel) => ({
        id: channel.id,
        name: channel.name ?? "",
      })),
    });
  });
});

export default router;
