import mongoose from "mongoose";

const { Schema } = mongoose;

export const GroupSchema = new Schema({
	adminId: Schema.Types.ObjectId,
	users: [Schema.Types.ObjectId],
	events: [Schema.Types.ObjectId],
	screenName: String,
	groupType: String,
	name: String,
});
