import mongoose from "mongoose";
import { GroupSchema } from "../models/groupModel";

const Group = mongoose.model("Group", GroupSchema);

export const addNewGroup = async (req, res) => {
	try {
		req.body.adminId = req.user._id;
		const newGroup = new Group(req.body);
		const savedGroup = await newGroup.save();
		res.json(savedGroup);
	} catch (err) {
		res.send(err);
	}
};
export const getGroups = async (req, res) => {
	try {
		const groups = await Group.find({ adminId: req.user._id });
		res.json(groups);
	} catch (err) {
		res.send(err);
	}
};
export const getGroupById = async (req, res) => {
	try {
		if (!req.params.groupId) throw new Error("Invalid request");
		const group = await Group.findOne({
			_id: req.params.groupId,
		});
		res.json(group);
	} catch (err) {
		res.send(err);
	}
};
export const updateGroup = async (req, res) => {
	try {
		if (!req.params.groupId) throw new Error("Invalid request");
		const group = await Group.findByIdAndUpdate(req.params.eventId, req.body, {
			new: true,
			useFindAndModify: true,
		});
		res.json(group);
	} catch (err) {
		res.send(err);
	}
};

export const deleteGroup = async (req, res) => {
	try {
		const deletedGroup = await Group.findByIdAndDelete(req.params.groupId);
		res.json(deletedGroup);
	} catch (err) {
		res.json(err);
	}
};
