const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

const url = "mongodb://127.0.0.1:27017/USER_AUTH";
mongoose.connect(url, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", (err) => {
	console.log("Error");
	console.log(err);
});
db.once("open", () => {
	console.log("connected with db");
});
