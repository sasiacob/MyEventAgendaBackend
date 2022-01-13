import mongoose from "mongoose";
import bcryptjs from "bcryptjs";

const { Schema } = mongoose;

export const UserSchema = new Schema({
	userName: {
		type: String,
		required: true,
		minlength: 5,
	},
	screenName: {
		type: String,
		required: false,
	},
	hashPassword: {
		type: String,
		required: true,
	},
	createDate: {
		type: Date,
		default: Date.now(),
	},
	groupId: {
		type: String,
		required: false,
	},
	role: {
		type: String,
		enum: ["dbAdmin", "groupAdmin", "guest", "moderator"],
		default: "guest",
	},
});

UserSchema.methods.comparePassword = (password, hashPassword) =>
	bcryptjs.compareSync(password, hashPassword);
