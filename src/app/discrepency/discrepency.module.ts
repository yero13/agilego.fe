import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiscrepencyComponent } from '@app/discrepency/discrepency.component';
import { StatusService } from '@service/status.service';
import { ResourceService } from '@service/resource.service';
import { DiscrepencyRoutingModule } from '@app/discrepency/discrepency.routing';
import { MatTableModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    DiscrepencyComponent
  ],
  exports: [
    DiscrepencyComponent
  ],
  imports: [
    CommonModule, DiscrepencyRoutingModule, MatTableModule, FlexLayoutModule
  ],
  providers: [ StatusService, ResourceService ],
  entryComponents: [],
  bootstrap: []
})
export class DiscrepencyModule {}
