const express = require("express");
const chat = require("../modele/chat");
const user = require("../modele/user")
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

module.exports = { getall, getbyid };
