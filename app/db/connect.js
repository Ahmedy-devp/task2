const MongoClient = require("mongodb").MongoClient;
const DBURL = process.env.DBURL;
const DBNAME = process.env.DBNAME;
const taskConnect = (cb) => {
  MongoClient.connect(DBURL, (error, client) => {
    if (error) return cb(error, null);
    const db = client.db(DBNAME);
    cb(null, db);
  });
};

module.exports = taskConnect;
