import singleSpaAngularCli from 'single-spa-angular-cli';

const prod = NODE_ENV;

let scripts = require("./bundle_list.json");;

if (prod) {
    try {
        scripts = require("./lib/bundle_list.json");
    }
    catch (e) {
        scripts = []
    }
}
const lifecycles = singleSpaAngularCli({
    selector: 'menu-root',
    baseScriptUrl: '/menu',
    scripts
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