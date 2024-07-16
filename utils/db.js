const mongoose = require("mongoose");
require("dotenv").config();
mongoose.set("strictQuery", true);

const url = 'mongodb://127.0.0.1:27017/USERS';
mongoose.connect(url, {
});

const db = mongoose.connection;

db.on("error", (err) => {
	console.log("ERROR --> ", err.message);
});
db.once("open", () => {
	console.log("connected with db");
});  
