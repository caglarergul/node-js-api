var ObjectID = require("mongodb").ObjectID;

module.exports = function(app, db) {
  // Post an article to the server
  app.post("/article", (req, res) => {
    const articleObj = {
      title: req.body.title,
      body: req.body.body,
      author: req.body.author,
      date: req.body.date
    };

    db.collection("article").insert(articleObj, (err, result) => {
      if (err) {
        res.send({
          error: "An error has occurred"
        });
        console.log(err);
      } else {
        res.send(result.ops[0]);
      }
    });
  });

  // Get all articles from the server
  app.get("/articles", (req, res) => {
    var cursor = db.collection("article");
    cursor.find({}).toArray(function(err, result) {
      if (err) throw err;
      res.send(result);
    });
  });

  // Get a specific article from the server

  app.get("/article/:id", (req, res) => {
    const id = req.params.id;
    const details = { _id: new ObjectID(id) };
    db.collection("article").findOne(details, (err, item) => {
      if (err) {
        res.send({ error: "An error has occurred" });
        console.log(details);
      } else {
        res.send(item);
      }
    });
  });

  // Delete an article from the server

  app.delete("/article/:id", (req, res) => {
    const id = req.params.id;
    const details = { _id: new ObjectID(id) };
    db.collection("article").remove(details, (err, item) => {
      if (err) {
        res.send({ error: "An error has occurred" });
      } else {
        res.send("Article is deleted!");
      }
    });
  });

  // Update an article on the server.
  app.put("/article/:id", (req, res) => {
    const id = req.params.id;

    const details = { _id: new ObjectID(id) };

    const articleObj = {
      title: req.body.title,
      body: req.body.body,
      author: req.body.author,
      date: req.body.date
    };

    db.collection("article").update(details, articleObj, (err, result) => {
      if (err) {
        res.send({ error: "An error has occurred" });
      } else {
        res.send(articleObj);
      }
    });
  });
};
