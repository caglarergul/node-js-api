var ObjectID = require("mongodb").ObjectID;

module.exports = function(app, db) {
  /*app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });*/

  app.post("/article", (req, res) => {
    const articleObj = {
      title: req.body.title,
      body: req.body.body,
      author: req.body.author
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

  
  app.get("/articles", (req, res) => {
    var cursor = db.collection("article");
    cursor.find({}).toArray(function(err, result) {
      if (err) throw err;
      res.send(result);
    });
  });

  app.get("/customer/:id", (req, res) => {
    const id = req.params.id;
    const details = { _id: new ObjectID(id) };
    db.collection("customer").findOne(details, (err, item) => {
      if (err) {
        res.send({ error: "An error has occurred" });
        console.log(details);
      } else {
        res.send(item);
      }
    });
  });

  app.get("/customers", (req, res) => {
    var cursor = db.collection("customer");
    cursor.find({}).toArray(function(err, result) {
      if (err) throw err;
      res.send(result);
    });
  });

  app.post("/customer", (req, res) => {
    const customerobj = {
      birthday: req.body.birthday,
      customerLifetimeValue: req.body.customerLifetimeValue,
      lastContact: req.body.lastContact,
      gender: req.body.gender,
      name: {
        first: req.body.firstname,
        last: req.body.lastname
      }
    };

    db.collection("customer").insert(customerobj, (err, result) => {
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

  app.delete("/customer/:id", (req, res) => {
    const id = req.params.id;
    const details = { _id: new ObjectID(id) };
    db.collection("customer").remove(details, (err, item) => {
      if (err) {
        res.send({ error: "An error has occurred" });
      } else {
        res.send("Customer " + id + " deleted!");
      }
    });
  });

  app.put("/customer/:id", (req, res) => {
    const id = req.params.id;

    const details = { _id: new ObjectID(id) };

    const customerobj = {
      birthday: req.body.birthday,
      customerLifetimeValue: req.body.customerLifetimeValue,
      lastContact: req.body.lastContact,
      gender: req.body.gender,
      name: {
        first: req.body.firstname,
        last: req.body.lastname
      }
    };

    console.log(customerobj);
    db.collection("customer").update(details, customerobj, (err, result) => {
      if (err) {
        res.send({ error: "An error has occurred" });
      } else {
        res.send(customerobj);
      }
    });
  });
};
