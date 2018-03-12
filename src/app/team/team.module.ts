import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamRoutingModule} from '@app/team/team.routing';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatTableModule, MatDialogModule // , MatFormFieldModule, MatInputModule,
  // ErrorStateMatcher, ShowOnDirtyErrorStateMatcher
} from '@angular/material';
// import { GroupEditComponent } from './popup/group.component';
// import { ComponentAddComponent } from './popup/component.component';
// import { EmployeeAddComponent } from './popup/employee.component';
// import { FormsModule } from '@angular/forms';
// import { ReactiveFormsModule} from '@angular/forms';
import { TeamComponent } from '@app/team/team.component';
import { ComponentAddComponent } from '@app/team/popup/component.component';
import { ResourceService } from '@service/resource.service';
import { TeamService} from '@service/team.service';

@NgModule({
  declarations: [
    TeamComponent, ComponentAddComponent // , GroupEditComponent, , EmployeeAddComponent
  ],
  exports: [ // ToDo: check if smth can be removed
    TeamComponent, /* , GroupEditComponent, */ ComponentAddComponent // , EmployeeAddComponent, FormsModule, ReactiveFormsModule
  ],
  imports: [
    CommonModule,
    TeamRoutingModule,
    MatTableModule,
    FlexLayoutModule,
    MatDialogModule
    /*,
    FormsModule, ReactiveFormsModule */
  ],
  providers: [ TeamService, ResourceService ],
  entryComponents: [ ComponentAddComponent /*GroupEditComponent, EmployeeAddComponent*/ ],
  bootstrap: [ TeamComponent ]
})
export class TeamModule {}