const express = require("express");
const Router = express.Router();
const { Get_url, Post_url } = require("../controllers/Controllers");

Router.get("/:id", Get_url);

Router.post("/url", Post_url);

module.exports = Router;
