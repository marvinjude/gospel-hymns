var express = require("express");
var cors = require("cors");
var rateLimit = require("express-rate-limit");
var app = express();
var {
  getHymnByNumber,
  getCategories,
  getHymnsInCategory,
  searchHymn
} = require("./utils/APIFunctions");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    success: false,
    message:
      "Too many requests! Please try again in the next 15-20 mins or contact @marvinjudehk on twitter if this perists longer"
  }
});

app.use(cors());
app.use(express.urlencoded());
app.use(express.json());
app.use(limiter);

app.get("/api/v1/hymn/:id", function(req, res) {
  const hymn = getHymnByNumber(req.params.id);
  if (!hymn)
    res.status(404).send({
      success: false,
      message: "couln't find anything"
    });

  res.status(200).send({
    success: true,
    data: hymn
  });
});

app.get("/downloads", (req, res) => {
  res.sendFile(`${__dirname}/views/download.html`);
});

app.get("/download", (req, res) => {
  res.download(`${__dirname}/content/db.json`, "hymns.json");
});

app.get("/api/v1/category", function(req, res) {
  res.status(200).send(getCategories());
});

app.get("/api/v1/category/:category", function(req, res) {
  const list = getHymnsInCategory(req.params.category);
  if (!list)
    res.status(404).json({
      success: false,
      message: "couln't find anything"
    });

  return res.status(404).send({
    success: true,
    data: list
  });
});

app.get("/api/v1/search/:term", function(req, res) {
  const matches = searchHymn(req.params.term);
  res.status(200).json({
    success: true,
    data: matches
  });
});

module.exports = app;
