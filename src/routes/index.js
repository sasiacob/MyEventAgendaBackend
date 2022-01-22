import {
	addNewEvent,
	getEvents,
	updateEvent,
	deleteEvent,
	addNewGroup,
	getGroups,
	registerGroupAdmin,
	loginRequired,
	login,
	groupIdRequired,
	getEventById,
	getGroupById,
	updateGroup,
	deleteGroup,
} from "../controllers";

const routes = (app) => {
	app
		.route("/event")
		.get(loginRequired, groupIdRequired, getEvents)
		.post(loginRequired, groupIdRequired, addNewEvent);

	app
		.route("/event/:eventId")
		.get(loginRequired, groupIdRequired, getEventById)
		.put(loginRequired, groupIdRequired, updateEvent)
		.delete(loginRequired, groupIdRequired, deleteEvent);

	app.route("/auth/login").post(login);

	app.route("/auth/register").post(registerGroupAdmin);

	app
		.route("/group")
		.get(loginRequired, getGroups)
		.post(loginRequired, addNewGroup);

	app
		.route("/group/:groupId")
		.get(loginRequired, getGroupById)
		.put(loginRequired, updateGroup)
		.delete(loginRequired, deleteGroup);
};

export default routes;
