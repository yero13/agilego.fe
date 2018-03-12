import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeamComponent } from '@app/team/team.component';

const teamRoutes: Routes = [
  { path: 'team',  component: TeamComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(teamRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class TeamRoutingModule {}
