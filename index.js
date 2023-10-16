require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
const bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
	res.send("Welcome to my Authentication app");
});

app.listen(process.env.PORT, () => {
	console.log("Server is running on port ", process.env.PORT);
});
