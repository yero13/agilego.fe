import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'agilego';

  routeLinks: any[];
  activeLinkIndex = 0;
  constructor(private router: Router) {
    this.routeLinks = [
      {label: 'Gantt', link: 'gantt'},
      {label: 'Resource allocation', link: 'resalloc'},
      {label: 'Plan vs Actual', link: 'plan-vs-actual'},
      {label: 'Team', link: 'team'}
    ];
  }
}
