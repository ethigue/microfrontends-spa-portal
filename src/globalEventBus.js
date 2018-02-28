import EventBus from 'eventing-bus/lib/window_event_stream';
import eventsConstants from "../mock/events.json";
import routes from "../mock/routes.json";
import { navigateToUrl } from "single-spa";

export default class GlobalBus {

    constructor() {
        EventBus.on(eventsConstants.CHANGEPATH, path => this.changePath(path));
    }

    changePath(path) {
        navigateToUrl(path);
    }
}