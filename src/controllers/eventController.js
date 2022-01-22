import mongoose from "mongoose";
import { EventSchema } from "../models/eventModel";

const Event = mongoose.model("Event", EventSchema);

export const groupIdRequired = (req, res, next) => {
	if (req.query.groupId && req.query.groupId.length > 5) return next();
	return res.status(401).json({ message: "Invalid group id" });
};

export const addNewEvent = async (req, res) => {
	try {
		req.body.createdBy = req.user._id;
		req.body.groupId = req.query.groupId;
		const newEvent = new Event(req.body);
		const savedEvent = await newEvent.save();
		res.json(savedEvent);
	} catch (err) {
		res.send(err);
	}
};
export const getEvents = async (req, res) => {
	try {
		const events = await Event.find({ groupId: req.query.groupId });
		res.json(events);
	} catch (err) {
		res.send(err);
	}
};
export const getEventById = async (req, res) => {
	try {
		if (!req.params.eventId || !req.query.groupId)
			throw new Error("Invalid request");
		const event = await Event.findOne({
			_id: req.params.eventId,
			groupId: req.query.groupId,
		});
		//  optional Todo: send no permission (403) in case group id does not correspond

		res.json(event);
	} catch (err) {
		res.send(err);
	}
};
export const updateEvent = async (req, res) => {
	try {

		const event = await Event.findByIdAndUpdate(req.params.eventId, req.body, {
			new: true,
			useFindAndModify: false,
		});
		res.json(event);
	} catch (err) {
		res.send(err);
	}
};
export const deleteEvent = async (req, res) => {
	try {
		const deletedEvent = await Event.findByIdAndDelete(req.params.eventId);
		res.json(deletedEvent);
	} catch (err) {
		res.json(err);
	}
};
