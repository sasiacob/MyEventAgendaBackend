import mongoose from "mongoose";
import { EventSchema } from "../models/eventModel";

const Event = mongoose.model("Event", EventSchema);

export const addNewEvent = async (req, res) => {
	try {
		const newEvent = new Event(req.body);
		const savedEvent = await newEvent.save();
		res.json(savedEvent);
	} catch (err) {
		res.send(err);
	}
};
export const getEvents = async (req, res) => {
	try {
		const events = await Event.find({});
		res.json(events);
	} catch (err) {
		res.send(err);
	}
};
export const updateEvent = async (req, res) => {
	try {
		const event = Event.findByIdAndUpdate(req.params.eventId, req.body, {
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
