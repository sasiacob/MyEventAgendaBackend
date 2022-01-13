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
} from "../controllers";

const routes = (app) => {
	app
		.route("/event")
		.get(loginRequired, getEvents)
		.post(loginRequired, addNewEvent);

	app
		.route("/event/:eventId")
		.put(loginRequired, updateEvent)
		.delete(loginRequired, deleteEvent);

	app.route("/auth/login").post(login);

	app.route("/auth/register").post(registerGroupAdmin);

	app
		.route("/groups")
		.get(loginRequired, getGroups)
		.post(loginRequired, addNewGroup);
};

export default routes;
