import { TodoComponent } from './todo/todo.component';

import { NgModule, ModuleWithProviders } from '@angular/core';

import {Globals} from "../globals.service";
import { RouterModule, Routes } from '@angular/router';

import { APP_BASE_HREF, LocationStrategy, HashLocationStrategy } from '@angular/common';

const routes: Routes = [
  { path: ':status', component: TodoComponent },
  { path: ':status/:extraTitle', component: TodoComponent },
  { path: '', redirectTo: 'all', pathMatch: 'full' }
];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class Routing { 
    public static forRoot(baseUrl): ModuleWithProviders {
        return {
            ngModule: Routing,
            providers: [
                { provide: APP_BASE_HREF, useValue: '/app2' }
            ],
        }
    }
}
