import express from "express";

import mongoose from "mongoose";
import bodyParser from "body-parser";
import jsonwebtoken from "jsonwebtoken";
import routes from "./src/routes";
import { dbUrl } from "./src/controllers/apiSecrets";

const app = express();
const PORT = 3000;
mongoose.Promise = global.Promise;



mongoose.connect(
	dbUrl,
	{ useNewUrlParser: false, useUnifiedTopology: true },
	(err) => {
		console.log(`err`, err);
	}
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//	JWT setup

app.use((req, res, next) => {
	if (
		req.headers &&
		req.headers.authorization &&
		req.headers.authorization.split(" "[0] === "JWT")
	) {
		jsonwebtoken.verify(
			req.headers.authorization.split(" ")[1],
			"RESTFULAPIs",
			(err, decode) => {
				if (err) req.user = undefined;
				req.user = decode;
				next();
			}
		);
	} else {
		req.user = undefined;
		next();
	}
});

routes(app);

app.get("/", (req, res) => res.send(`Node running on port ${PORT}`));

app.listen(PORT, () => {
	console.log("Server started at port", PORT);
});
