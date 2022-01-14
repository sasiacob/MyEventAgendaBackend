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
		.route("/groups")
		.get(loginRequired, getGroups)
		.post(loginRequired, addNewGroup);
};

export default routes;
