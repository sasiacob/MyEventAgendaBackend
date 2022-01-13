import mongoose from "mongoose";

const { Schema } = mongoose;

export const EventSchema = new Schema({
	eventType: { type: String, required: true },
	clientName: String,
	phoneNumber: String,
	menu: [String],
	menuPrice: { type: Number, min: 0 },
	createdAt: { type: Date, default: Date.now() },
	createdBy: { type: Schema.Types.ObjectId, required: true },
	eventDate: Date,
	reservationFee: Number,
	totalPrice: Number,
	restToPay: Number,
	takeout: Boolean,
	otherDetails: String,
	groupId: Schema.Types.ObjectId,
});
