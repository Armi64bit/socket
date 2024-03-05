const mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Employe = new Schema({ FullName: String, Rank: Number, Salary: Number });
module.exports = mongoose.model("employe", Employe);
