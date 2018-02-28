# microfrontends-spa-portal

This is POC on how to use [single-spa](https://github.com/joeldenning/single-spa) and its adapters to load different SPA in the same page.


## InterApps comunication

__globalStoreEventDistributor:__

- Each app is a self contained system. No app knows the internal state of another app or their data model.
- Each app must be able to have a complex state.
- When navigating between apps, the state is not lost (because of mount/unmount).
- Two type of event dispatched, global and local.Each app can process these events ,the only requirement is that all apps agree on one event format to send and receive the events.

__globaEventBus:__

Used to send received events that are not related to redux (i.e. routes changes). the app that need to listen/send global events needs to import EventBus from 'eventing-bus/lib/window_event_stream' 

## How to get the examples running locally
run the following commands in the root folder and in all the apps folders:
```
npm install
npm start
```

open http://localhost:8080
