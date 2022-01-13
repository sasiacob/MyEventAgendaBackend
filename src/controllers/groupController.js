import mongoose from "mongoose";
import { GroupSchema } from "../models/groupModel";

const Group = mongoose.model("Group", GroupSchema);
export const addNewGroup = async (req, res) => {
	try {
		const newGroup = new Group(req.body);
		const savedGroup = await newGroup.save();
		res.json(savedGroup);
	} catch (err) {
		res.send(err);
	}
};
export const getGroups = async (req, res) => {
	try {
		const groups = await Group.find({});
		res.json(groups);
	} catch (err) {
		res.send(err);
	}
};
