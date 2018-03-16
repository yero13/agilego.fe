import { NgModule } from '@angular/core';
import {
  ErrorStateMatcher, ShowOnDirtyErrorStateMatcher
} from '@angular/material';

@NgModule({
  declarations: [],
  exports: [],
  imports: [],
  providers: [ {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher} ],
  entryComponents: [],
  bootstrap: []
})
export class UtilModule {}
