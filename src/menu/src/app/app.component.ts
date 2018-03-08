import { Component, NgZone } from '@angular/core';

declare const location: any;
declare const history: any;

@Component({
  selector: 'menu-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private ngZone: NgZone) {

  }

  navigate(path: string, event: Event): void {
    this.ngZone.runOutsideAngular(() => {
      history.pushState(null, null, path);
      event.stopPropagation();
      event.preventDefault();
    });
  }
}