import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GanttComponent } from '@app/gantt/gantt.component';
import { GanttService } from '@service/gantt.service';
import { GanttRoutingModule } from '@app/gantt/gantt.routing';

@NgModule({
  declarations: [
    GanttComponent
  ],
  exports: [
    GanttComponent
  ],
  imports: [
    CommonModule, GanttRoutingModule
  ],
  providers: [ GanttService ],
  entryComponents: [],
  bootstrap: []
})
export class GanttModule {}
