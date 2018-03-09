import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GanttComponent } from '@app/gantt/gantt.component';

const ganttRoutes: Routes = [
  { path: 'gantt',  component: GanttComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(ganttRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class GanttRoutingModule {}
