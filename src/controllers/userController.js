import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserSchema } from "../models/userModel";

const User = mongoose.model("User", UserSchema);

const validateInput = (username, password, minLenght = 5) => {
	if (!username || username.length < minLenght)
		throw new Error("Invalid username or password");
	if (!password || password.length < minLenght)
		throw new Error("Invalid username or password");
};

export const registerGroupAdmin = async (req, res) => {
	let newUser;
	try {
		validateInput(req.body.userName, req.body.password);

		newUser = new User(req.body);
		newUser.hashPassword = bcryptjs.hashSync(req.body.password);

		//	check if username / email exists in db
		const alreadyExists = await User.exists({ userName: req.body.userName });
		if (alreadyExists)
			return res
				.status(401)
				.json({ message: "Email / username already exists" });

		// 	create new user
		const user = await newUser.save();
		user.hashPassword = undefined;
		return res.json(user);
	} catch (err) {
		return res.status(400).send({ message: err.message });
	}
};
export const loginRequired = (req, res, next) => {
	if (req.user) return next();

	return res.status(401).json({ message: "Unauthorized User" });
};

export const login = async (req, res) => {
	try {
		validateInput(req.body.userName, req.body.password);

		const user = await User.findOne({ userName: req.body.userName });
		if (!user) return res.status(401).json({ message: "No user found" });

		if (!user.comparePassword(req.body.password, user.hashPassword))
			return res.status(401).json({ message: "Wrong password" });

		return res.json({
			token: jwt.sign({ username: user.userName, _id: user.id }, "RESTFULAPIs"),
		});
	} catch (err) {
		return res.status(401).json({ message: err.message });
	}
};
