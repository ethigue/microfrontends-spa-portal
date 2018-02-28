import { TodoComponent } from './todo/todo.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { APP_BASE_HREF, LocationStrategy, HashLocationStrategy } from '@angular/common';

const routes: Routes = [
  { path: ':status', component: TodoComponent },
  { path: '', redirectTo: 'all', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        { provide: APP_BASE_HREF, useValue: '/app2' }
    ],
    exports: [RouterModule]
})
export class Routing { }
