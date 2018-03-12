import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatTableModule, MatDialogModule, MatFormFieldModule, MatInputModule,
  ErrorStateMatcher, ShowOnDirtyErrorStateMatcher
} from '@angular/material';
import { MatButtonModule } from '@angular/material/button'
import { FlexLayoutModule } from '@angular/flex-layout';
import { DragulaModule } from 'ng2-dragula/ng2-dragula';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { SprintService } from '@service/sprint.service';
import { AllocService } from '@service/alloc.service';
import { MessageService } from '@service/message.service';
import { BacklogService } from '@service/backlog.service';
import { AllocSheetComponent } from '@app/resalloc/allocsheet.component';
import { ResAllocComponent } from '@app/resalloc/resalloc.component';
import { BacklogComponent } from '@app/resalloc/backlog.component';
import { SubtasksComponent } from '@app/resalloc/subtasks.component';
import { AllocEditComponent } from '@app/resalloc/popup/allocedit.component';
import { SprintComponent } from '@app/resalloc/sprint.component';
import { ResAllocRoutingModule } from '@app/resalloc/resalloc.routing';

@NgModule({
  declarations: [
    AllocSheetComponent, ResAllocComponent, BacklogComponent, AllocEditComponent, SubtasksComponent, SprintComponent
  ],
  exports: [ ResAllocComponent ],
  imports: [
    MatTableModule, CommonModule, FlexLayoutModule, DragulaModule, MatDialogModule, MatFormFieldModule,
    MatInputModule, BrowserAnimationsModule, ReactiveFormsModule, MatButtonModule, ResAllocRoutingModule
  ],
  providers: [ SprintService, AllocService, BacklogService, MessageService,
    {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher} ],
  entryComponents: [ AllocEditComponent ],
  bootstrap: [ ResAllocComponent ]
})
export class ResAllocModule {}
