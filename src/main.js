import { registerApplication, start } from 'single-spa';
import { singleSpaAngularCliRouter } from 'single-spa-angular-cli/lib/utils';
import { eachSeries } from 'async';
import GlobalStoreEventDistributor from './GlobalStoreEventDistributor';
import GlobalEventBus from './GlobalEventBus'
import appStructure from '../mock/appStructure.json';
import eventsConstants from "../mock/events.json";
import 'babel-polyfill';
import 'zone.js';

SystemJS.config({
    map: { 'json': '../node_modules/systemjs-plugin-json/json.js' },
    meta: { '*.json': { loader: 'json' } }
  });

function init() {
    const globalStoreEventDistributor = new GlobalStoreEventDistributor();
    const globalEventBus = new GlobalEventBus();
    let store = {};
    //load the apps
    appStructure.items.forEach(async element => {
        const { appName, appUrl, baseUrl, storeUrl, isDefaultPage, routesConfig } = element;
        let store;
        
        if (storeUrl) {
           store = await loadStore(storeUrl, globalStoreEventDistributor);
        }

        if (routesConfig) {
            const routes = await SystemJS.import(`${routesConfig}!json`);
            //setting the baseUrl of the app
            routes[appName].baseUrl = baseUrl;
            globalEventBus.registerRoutes(routes);
        }

        registerApplication(appName, () => SystemJS.import(appUrl), singleSpaAngularCliRouter.hashPrefix(baseUrl, isDefaultPage), { baseUrl, eventsConstants, ...store } );
    });

    start();
}

const loadStore = async (storeURL, globalStoreEventDistributor) => {
    // import the store module
    const storeModule = storeURL ? await SystemJS.import(storeURL) : {storeInstance: null};

    // register the store with the globalStoreEventDistributor
    if (storeModule.storeInstance && globalStoreEventDistributor)
    globalStoreEventDistributor.registerStore(storeModule.storeInstance);
    // register the app with singleSPA and pass a reference to the store of the app as well as a reference to the globalStoreEventDistributor
    return { store: storeModule.storeInstance, globalStoreEventDistributor: globalStoreEventDistributor };
}

init();