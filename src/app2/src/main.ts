import { enableProdMode } from '@angular/core';
import { Router } from '@angular/router';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { singleSpaAngularCliPlatform } from 'single-spa-angular-cli/lib/single-spa-angular-cli-platform';

import { createAppModule } from './app/app.module';
import { environment } from './environments/environment';

import EventBus from 'eventing-bus/lib/window_event_stream';

if (environment.production) {
  enableProdMode();
}

singleSpaAngularCliPlatform.mount('app2', Router).subscribe( ({ props, attachUnmount }) => {
  const { customProps = { baseUrl: "/app2" } } = props;

  platformBrowserDynamic().bootstrapModule(createAppModule(customProps.baseUrl)).then( module => {
    const { customProps = { eventsConstants: {} } } = props;

    attachUnmount(module);
    module.instance.setEventsConstants(customProps.eventsConstants);
  });
});