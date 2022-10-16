const connect = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;
class task {
  static home = (req, res) => {
    connect(async (error, db) => {
      if (error)
        return res.render("error404", { pageTitle: "error database 1" });
      try {
        const data = await db.collection("tasks").find().toArray();
        res.render("home", { pageTitle: "home", data, isEmpty: !data.length });
      } catch (e) {
        res.send(e.message);
      }
    });
  };
  static add = (req, res) => {
    res.render("add", { pageTitle: "Add  task" });
  };
  static addMethod = (req, res) => {
    connect(async (error, db) => {
      if (error)
        return res.render("error404", { pageTitle: "error database 1" });
      try {
        req.body.status ? (req.body.status = true) : (req.body.status = false);
        const data = await db
          .collection("tasks")
          .findOne({ title: req.body.title });
        if (data) throw new Error("title used before");

        await db.collection("tasks").insertOne(req.body);
        res.redirect("/");
      } catch (e) {
        res.render("error404", { pageTitle: "error database 2" });
      }
    });
  };
  static single = (req, res) => {
    connect(async (err, db) => {
      if (err) res.render("err404", { pageTitle: "database error 1" });
      try {
        const taskData = await db
          .collection("tasks")
          .findOne({ _id: new ObjectId(req.params.id) });
        res.render("single", {
          pageTitle: "single page",
          taskData,
          isFound: !taskData.length,
        });
      } catch (e) {
        res.send(e.message);
      }
    });
  };
  static singleLogic = (req, res) => {
    connect(async (err, db) => {
      if (err) res.render("err404", { pageTitle: "database error 1" });
      try {
        if (req.body.status) {
          await db.collection("tasks").updateOne(
            { _id: new ObjectId(req.params.id) },
            {
              $set: {
                status: true,
              },
            },
            { upsert: true }
          );
        } else {
          await db.collection("tasks").updateOne(
            { _id: new ObjectId(req.params.id) },
            {
              $set: {
                status: false,
              },
            },
            { upsert: true }
          );
        }
        res.redirect("/");
      } catch (e) {
        res.send(e.message);
      }
    });
  };
  static edit = (req, res) => {
    connect(async (err, db) => {
      if (err) res.render("err404", { pageTitle: "database error 1" });
      try {
        const data = await db
          .collection("tasks")
          .findOne({ _id: new ObjectId(req.params.id) });
        res.render("edit", { pageTitle: "edit page", data });
      } catch (e) {
        res.send(e.message);
      }
    });
  };
  static editLogic = (req, res) => {
    connect(async (err, db) => {
      if (err) res.render("err404", { pageTitle: "database error 1" });
      try {
        await db.collection("tasks").updateMany(
          { _id: new ObjectId(req.params.id) },
          {
            $set: {
              title: req.body.title,
              content: req.body.content,
              dueDate: req.body.dueDate,
            },
          },
          { upsert: true }
        );
        res.redirect("/");
      } catch (e) {
        res.send(e.message);
      }
    });
  };
  static del = (req, res) => {
    connect(async (err, db) => {
      if (err) res.render("err404", { pageTitle: "database error 1" });
      try {
        await db
          .collection("tasks")
          .deleteOne({ _id: new ObjectId(req.params.id) });
        res.redirect("/");
      } catch (e) {
        res.send(e.message);
      }
    });
  };
}

module.exports = task;
