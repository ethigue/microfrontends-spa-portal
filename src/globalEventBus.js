import EventBus from 'eventing-bus/lib/window_event_stream';
import eventsConstants from "../mock/events.json";
import routes from "../mock/routes.json";
import { navigateToUrl } from "single-spa";
import { Strings } from "./utils";

export default class GlobalBus {
    constructor() {
        this.routes = {};
        EventBus.on(eventsConstants.CHANGE_PATH, obj => this.changePath(obj));
        EventBus.on(eventsConstants.REGISTER_ROUTES, routes => this.registerRoutes(routes));
    }

    changePath(obj) {
        const { action, app, args, query } = obj;
        const uri = Strings.substitute(this.routes[app][action], args);
        const queryString = Strings.queryfy(query);
        navigateToUrl(`${this.routes[app].baseUrl}${uri}${queryString}`);
        
    }

    registerRoutes(routes) {
        this.routes = { ...this.routes, ... routes};
    }

}