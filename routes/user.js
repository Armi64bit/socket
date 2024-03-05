const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const validate = require("../midill/validate");

router.get("/show", (req, res, next) => {
  res.send("bonjour 4Twin 8");
});
/*router.get("/add/:name/:email/:cin", function (req, res, next) {
  console.log(req.params);
  new user({
    name: req.params.name,
    email: req.params.email,
    cin: req.params.cin,
  }).save((err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log(data);
      res.json(data);
    }
  });
});*/

router.put("/update/:id", async function (req, res) {
  try {
    await user.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send("updated");
  } catch (err) {
    res.send(err);
  }
});

router.delete("/delete/:id", async function (req, res) {
  try {
    await user.findByIdAndRemove(req.params.id);
    res.send("deleted");
  } catch (err) {
    res.send(err);
  }
});
/*router.get("/getall", async function (req, res) {
  try {
    const data = await user.find();
    res.send(data);
  } catch (err) {
    res.send(err);
  }
});*/
/*router.get("/getbyid/:id", async function (req, res) {
  try {
    const data = await user.findById(req.params.id);
    res.send(data);
  } catch (err) {
    res.send(err);
  }
});*/

router.get("/getall", userController.getall);
router.post("/new", validate, userController.add);
router.get("/chat", (req, res, next) => {
  res.render("chat");
});
router.get("/getbyusername/:username", async (req, res) => {
  try {
    const data = await user.findOne({ name: req.params.username });
    if (!data) {
      res.status(404).send("User not found");
      return;
    }
    res.send(data);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
