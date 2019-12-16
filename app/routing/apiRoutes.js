var friendsMale = require("../data/friendsMale");
var friendsFemale = require("../data/friendsFemale");

module.exports = function(app) {
  function matchingCompare(a, b) {
    var matchingScore = 0;
    for (let i = 0; i < a.scores.length; i++) {
      matchingScore += Math.abs(parseInt(a.scores[i]) - parseInt(b.scores[i]));
    }
    return matchingScore;
  }
  app.get("/api/friendsmale", function(req, res) {
    res.json(friendsMale);
  });
  app.get("/api/friendsfemale", function(req, res) {
    res.json(friendsFemale);
  });

  app.post("/api/friendsmale", function(req, res) {
    friendsMale.push(req.body);
    var comparisonArray = [];
    for (let i = 0; i < friendsFemale.length; i++) {
      comparisonArray.push(matchingCompare(req.body, friendsFemale[i]));
      //   console.log(friendsFemale.length);
      //   console.log(req.body);
      //   console.log(friendsFemale[i]);
    }
    // console.log(comparisonArray);
    let bestMatchScore = Math.min(...comparisonArray);

    let bestMatchIndex = comparisonArray.findIndex(s => s == bestMatchScore);
    res.json(friendsFemale[bestMatchIndex]);
    // console.log(bestMatchIndex);
    // console.log(bestMatchScore);
    // console.log(friendsFemale[bestMatchIndex]);
    // console.log("testhere");
    comparisonArray = [];
  });

  app.post("/api/friendsfemale", function(req, res) {
    friendsFemale.push(req.body);
    var comparisonArray = [];
    for (let i = 0; i < friendsMale.length; i++) {
      comparisonArray.push(matchingCompare(req.body, friendsMale[i]));
    }
    let bestMatchScore = Math.min(...comparisonArray);
    let bestMatchIndex = comparisonArray.findIndex(s => s == bestMatchScore);
    res.json(friendsMale[bestMatchIndex]);
    // console.log(friendsMale[bestMatchIndex]);
  });
};
