const router = require("express").Router();
const myConnection = require("../controllers/task.controllers");

router.get("/", myConnection.home);
router.get("/add", myConnection.add);
router.post("/add", myConnection.addMethod);

router.get("/single/:id", myConnection.single);
router.post("/single/:id", myConnection.singleLogic);

router.get("/edit/:id", myConnection.edit);
router.post("/edit/:id", myConnection.editLogic);

router.get("/del/:id", myConnection.del);

module.exports = router;
