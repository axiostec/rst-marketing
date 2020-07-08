const express = require("express");
const path = require("path");
const routes = express.Router();
const { AuthNoVerify } = require("../middlewares/auth.middleware");
const { CLIENT_ID } = require('../config/index.config');

routes.get("/spotify", AuthNoVerify, (req, res) => {
  var scopes = "streaming user-read-private user-read-email";
  res.redirect(
    "https://accounts.spotify.com/authorize" +
      "?response_type=code" +
      "&client_id=" +
      CLIENT_ID +
      (scopes ? "&scope=" + encodeURIComponent(scopes) : "") +
      "&redirect_uri=" +
      encodeURIComponent('http://localhost:3000/inicio')
  );
});

module.exports = routes;
