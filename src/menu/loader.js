import {loader} from 'single-spa-angular-cli';

const lifecycles = loader({
    name: 'menu',
    selector: 'menu-root',
    baseHref: "http://localhost:4200"
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