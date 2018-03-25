import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DiscrepencyComponent } from '@app/discrepency/discrepency.component';

const discrepencyRoutes: Routes = [
  { path: 'plan-vs-actual',  component: DiscrepencyComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(discrepencyRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class DiscrepencyRoutingModule {}
