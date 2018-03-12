import {loader} from 'single-spa-angular-cli';

const lifecycles = loader({
    name: 'app2',
    selector: 'app2-root',
    baseHref: "http://localhost:4203"
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