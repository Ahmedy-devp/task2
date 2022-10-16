const express = require("express");
const hbs = require("hbs");
const path = require("path");
require("dotenv").config();
const app = express();
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "../frontend/views"));
hbs.registerPartials(path.join(__dirname, "../frontend/layouts"));
app.use(express.static(path.join(__dirname, "../frontend/public")));

const taskRoutes = require("../app/routes/routes");
app.use(taskRoutes);

app.all("*", (req, res) =>
  res.render("error404", { pageTitle: "page not found" })
);
module.exports = app;
