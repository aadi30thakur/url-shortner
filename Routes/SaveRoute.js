const express = require("express");

const router = express.Router();

// const save =

router.get("/", function (req, res) {
  res.json({ hey: "welcome" });
});

module.exports = router;
