import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { platformSingleSpa } from 'single-spa-angular-cli';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import EventBus from 'eventing-bus/lib/window_event_stream';

if (environment.production) {
  enableProdMode();
}

platformSingleSpa.mount('app2').subscribe( ({ props, attachUnmount }) => {
  const { customProps = { baseUrl: "/app2" } } = props;

  platformBrowserDynamic().bootstrapModule(AppModule).then( module => {
    const { customProps = { eventsConstants: {} } } = props;

    attachUnmount(module);
    module.instance.setEventsConstants(customProps.eventsConstants);
  });
});