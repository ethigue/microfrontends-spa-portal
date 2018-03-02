import { registerApplication, start } from 'single-spa';
import { singleSpaAngularCliRouter } from 'single-spa-angular-cli/lib/utils';
import { eachSeries } from 'async';
import GlobalStoreEventDistributor from './GlobalStoreEventDistributor';
import GlobalEventBus from './GlobalEventBus'
import appStructure from '../mock/appStructure.json';
import 'babel-polyfill';
import 'zone.js';

function init() {
    const globalStoreEventDistributor = new GlobalStoreEventDistributor();
    const globalEventBus = new GlobalEventBus();
    let store = {};
    //load the apps
    eachSeries(appStructure.items, async (element, callback) => {
        const { appName, appUrl, route, storeUrl } = element;
        let store;
        
        if (storeUrl) {
           store = await loadStore(storeUrl, globalStoreEventDistributor);
        }

        loadNotMain(appName, () => SystemJS.import(appUrl), singleSpaAngularCliRouter.hashPrefix(route, true), store).then(() => {
            callback();
        });
    }, err => {
        if (err) console.log('Is not possible to mount the apps', err);
    });

    start();
}

const loadNotMain = (appName, importFunc, routeFunc, store) => {
    registerApplication(appName, importFunc, routeFunc, store)
    return Promise.resolve();
};

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