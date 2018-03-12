import {loader} from 'single-spa-angular-cli';

const lifecycles = loader({
    name: 'home',
    selector: 'home-root',
    baseHref: "http://localhost:4201"
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