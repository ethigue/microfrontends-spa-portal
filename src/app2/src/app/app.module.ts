import { BrowserModule } from '@angular/platform-browser';
import { forwardRef, Inject, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { TodoService } from './todo/todo.service';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoListFooterComponent } from './todo-list-footer/todo-list-footer.component';
import { TodoListHeaderComponent } from './todo-list-header/todo-list-header.component';
import { TodoListItemComponent } from './todo-list-item/todo-list-item.component';

// used to create fake backend
import { fakeBackendProvider } from '../shared/fake-backend/index';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions } from '@angular/http';
import { TodoComponent } from './todo/todo.component';

import { Routing } from './app.routing';
import { Globals } from "../globals.service";

  @NgModule({
    declarations: [
      AppComponent,
      TodoListComponent,
      TodoListFooterComponent,
      TodoListHeaderComponent,
      TodoListItemComponent,
      TodoComponent,
    ],
    imports: [
      Routing.forRoot("/app2"),
      BrowserModule,
      FormsModule,
      HttpModule
    ],
    providers: [
      TodoService,
      // providers used to create fake backend
      fakeBackendProvider,
      MockBackend,
      BaseRequestOptions,
      Globals
    ],
    bootstrap: [AppComponent]
  })

export  class AppModule {
    constructor(@Inject(forwardRef(() => Globals)) private globals:Globals) {}
    
    setEventsConstants(eventsConstants) {
      this.globals.eventsConstants = eventsConstants;
    }
  }



