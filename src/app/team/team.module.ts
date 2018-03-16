import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamRoutingModule} from '@app/team/team.routing';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatTableModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatIconModule
} from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { UtilModule } from '@app/util/util.module';
import { GroupEditComponent } from './popup/group.component';
// import { ComponentAddComponent } from './popup/component.component';
// import { EmployeeAddComponent } from './popup/employee.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule} from '@angular/forms';
import { TeamComponent } from '@app/team/team.component';
import { ComponentAddComponent } from '@app/team/popup/component.component';
import { ResourceService } from '@service/resource.service';
import { TeamService} from '@service/team.service';

@NgModule({
  declarations: [
    TeamComponent, ComponentAddComponent, GroupEditComponent //, , EmployeeAddComponent
  ],
  exports: [ // ToDo: check if smth can be removed
    TeamComponent // , EmployeeAddComponent, FormsModule, ReactiveFormsModule
  ],
  imports: [
    CommonModule, TeamRoutingModule, MatTableModule, FlexLayoutModule, MatDialogModule, MatFormFieldModule,
    MatInputModule, MatButtonModule, MatIconModule, FormsModule, ReactiveFormsModule, UtilModule
  ],
  providers: [ TeamService, ResourceService ],
  entryComponents: [ ComponentAddComponent, GroupEditComponent /*, EmployeeAddComponent*/ ],
  bootstrap: [ TeamComponent ]
})
export class TeamModule {}
