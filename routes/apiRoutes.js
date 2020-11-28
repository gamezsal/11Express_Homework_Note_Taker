// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// ===============================================================================
const fs = require("fs");
const path = require("path");
var notesData = require("../db/db.json");

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function (app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  app.get("/api/notes", function (req, res) {
    console.log(notesData);
    res.json(
      notesData.map(function (note, index) {
        return { ...note, id: index };
      })
    );
  });

  app.post("/api/notes", function (req, res) {
    notesData.push(req.body);
    fs.writeFile(
      path.resolve(__dirname, "../db/db.json"),
      JSON.stringify(notesData),
      function (error) {
        if (error) console.error(error);
        res.json(notesData);
      }
    );
  })
  app.delete("/api/notes/:id", function (req, res) {
    notesData.splice(req.params.id, 1);
    fs.writeFile(
      path.resolve(__dirname, "../db/db.json"),
      JSON.stringify(notesData),
      function (error) {
        if (error) console.error(error);
        res.json(notesData);
      }
    );
  });

};
