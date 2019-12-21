var express = require("express");
var app = express();
const path = require("path");

var PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("app/public"));

// app.get("/static/:filename", (req, res) => {
//   var fileName = req.params.filename;
//   res.sendFile(path.join(__dirname, "app", "public", fileName));
// });

require("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoutes")(app);

app.listen(PORT, function() {
  console.log("App listening on port" + PORT);
});
