import singleSpaAngularCli from 'single-spa-angular-cli';

const prod = NODE_ENV;

let list = require("./bundle_list.json");;

if (prod) {
    try {
        list = require("./lib/bundle_list.json");
    }
    catch (e) {
        list = {}
    }
}

const lifecycles = singleSpaAngularCli({
    name: 'menu',
    selector: 'menu-root',
    baseScriptUrl: '/menu',
    ... list
});

export const bootstrap = [
    lifecycles.bootstrap
];

export const mount = [
    lifecycles.mount
];

export const unmount = [
    lifecycles.unmount
];

export const unload = [
    lifecycles.unload
];