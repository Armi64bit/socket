const express = require("express");
const user = require("../modele/user");

async function getall(req, res) {
  try {
    const data = await user.find();
    res.send(data);
  } catch (err) {
    res.send(err);
  }
}

async function getbyid(req, res) {
  try {
    const data = await user.findById(req.params.id);
    res.send(data);
  } catch (err) {
    res.send(err);
  }
}



async function add(req, res, next) {
  try {
    const User = new user(req.body);
    //console.log("resultat:" + JSON.stringify(req.body));
   // console.log("resultat:" + JSON.stringify(User));
    await User.save();
    res.status(200).send("add success");
  } catch (err) {
    res.status(400).send({ error: error.toString() });
  }
}

module.exports = { getall, getbyid , add };
