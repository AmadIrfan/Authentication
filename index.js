const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const db = require("./utils/db");
const usersRoute = require("./routes/user");
const verify = require("./routes/verifyRoutes");
const authRoute = require("./routes/authRoute");
const app = express();
const email = require("./routes/emailSendRoute");

const bodyParser = require("body-parser");
require("dotenv").config();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
	res.send("Welcome to my Authentication app");
});
app.use("/api", usersRoute);
app.use("/verify", verify);
app.use("/auth", authRoute);
app.use("/sendEmail", email);

app.listen(process.env.PORT, () => {
	console.log("Server is running on port ", process.env.PORT);
});
