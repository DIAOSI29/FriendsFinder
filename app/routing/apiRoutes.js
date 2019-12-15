var friendsMale = require("../data/friendsMale");
var friendsFemale = require("../data/friendsFemale");

function matchingCompare(a, b) {
  var matchingScore = 0;
  for (let i = 0; i < a.scores.length; i++) {
    matchingScore += Math.abs(
      parseInt(a.scores[i].val()) - parseInt(b.scores[i].val())
    );
  }
  return matchingScore;
}

module.exports = function(app) {
  app.get("/api/friendsmale", function(req, res) {
    res.json("../data/friendsMale.js");
  });
  app.get("/api/friendsfemale", function(req, res) {
    res.json("../data/friendsFemale.js");
  });

  app.post("/api/friendsmale", function(req, res) {
    friendsMale.push(req.body);
    var comparisonArray = [];
    for (let i = 0; i < friendsFemale.length; i++) {
      comparisonArray.push(matchingCompare(req.body, friendsFemale[i]));
    }
    let bestMatchScore = Math.min(comparisonArray);
    let bestMatchIndex = comparisonArray.findIndex(s => s == bestMatchScore);
    res.json(friendsFemale[bestMatchIndex]);
    comparisonArray = [];
  });

  app.post("/api/friendsfemale", function(req, res) {
    friendsFemale.push(req.body);
    var comparisonArray = [];
    for (let i = 0; i < friendsMale.length; i++) {
      comparisonArray.push(matchingCompare(req.body, friendsMale[i]));
    }
    let bestMatchScore = Math.min(comparisonArray);
    let bestMatchIndex = comparisonArray.findIndex(s => s == bestMatchScore);
    res.json(friendsMale[bestMatchIndex]);
    comparisonArray = [];
  });
};
