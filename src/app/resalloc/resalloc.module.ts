import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatTableModule, MatDialogModule, MatFormFieldModule, MatInputModule,
  ErrorStateMatcher, ShowOnDirtyErrorStateMatcher
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DragulaModule } from 'ng2-dragula/ng2-dragula';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SprintService } from '@service/sprint.service';
import { AllocService } from '@service/alloc.service';
import { MessageService } from '@service/message.service';
import { BacklogService } from '@service/backlog.service';
import { AllocSheetComponent } from '@app/resalloc/allocsheet.component';
import { ResAllocComponent } from '@app/resalloc/resalloc.component';
import { BacklogComponent } from '@app/resalloc/backlog.component';
import { AllocEditComponent } from '@app/resalloc/allocedit.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AllocSheetComponent, ResAllocComponent, BacklogComponent, AllocEditComponent
  ],
  exports: [ ResAllocComponent ],
  imports: [
    MatTableModule, CommonModule, FlexLayoutModule, DragulaModule, MatDialogModule, MatFormFieldModule,
    MatInputModule, BrowserAnimationsModule, ReactiveFormsModule
  ],
  providers: [ SprintService, AllocService, BacklogService, MessageService,
    {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher} ],
  entryComponents: [ AllocEditComponent ],
  bootstrap: [ ResAllocComponent ]
})
export class ResAllocModule {}
