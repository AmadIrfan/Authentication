// @ts-nocheck
require("dotenv").config();
const cors = require("cors");
const path = require('path');
const morgan = require("morgan");
const db = require("./utils/db");
const express = require("express");
const bodyParser = require("body-parser");
const usersRoute = require("./routes/user");
const verify = require("./routes/verifyRoutes");
const authRoute = require("./routes/authRoute");
const email = require("./routes/emailSendRoute");
const { verifyToken, checkRoles } = require("./utils/middleWare");
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
	res.render('index');
});

app.use("/v1/api", usersRoute);
app.use("/v1/verify", verify);
app.use("/v1/auth", authRoute);
app.use("/v1/sendEmail", email);

app.use('/api/node', verifyToken, checkRoles(['admin']), createProxyMiddleware({
	target: 'http://localhost:3001',
	changeOrigin: true,
	on: {
		proxyReq: (proxyReq, req, res) => {
			const requestBody = JSON.stringify(req.body);
			proxyReq.setHeader('Content-Type', 'application/json');
			proxyReq.setHeader('Content-Length', Buffer.byteLength(requestBody));
			proxyReq.write(requestBody);
		},
	}
}));


app.use('/v1/python', verifyToken, checkRoles(['admin']), createProxyMiddleware({
	target: 'http://127.0.0.1:3003/',
	changeOrigin: true,
	on: {
		proxyReq: (proxyReq, req, res) => {
			const requestBody = JSON.stringify(req.body);
			proxyReq.setHeader('Content-Type', 'application/json');
			proxyReq.setHeader('Content-Length', Buffer.byteLength(requestBody));
			proxyReq.write(requestBody);
		},
	}
}));


app.use('/api/go', createProxyMiddleware({
	target: 'http://localhost:8080',
	changeOrigin: true,
}));

app.listen(process.env.PORT, () => {
	console.log("Server is running on port ", process.env.PORT);
});
