import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamRoutingModule} from '@app/team/team.routing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatTableModule, MatDialogModule, MatFormFieldModule, MatInputModule,
  MatIconModule, MatSelectModule } from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { GroupEditComponent } from './popup/group.component';
import { EmployeeEditComponent } from '@app/team/popup/employee.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule} from '@angular/forms';
import { TeamComponent } from '@app/team/team.component';
import { ComponentAddComponent } from '@app/team/popup/component.component';
import { ResourceService } from '@service/resource.service';
import { TeamService} from '@service/team.service';

@NgModule({
  declarations: [
    TeamComponent, ComponentAddComponent, GroupEditComponent, EmployeeEditComponent
  ],
  exports: [
    TeamComponent
  ],
  imports: [
    CommonModule, TeamRoutingModule, MatTableModule, FlexLayoutModule, MatDialogModule, MatFormFieldModule,
    MatInputModule, MatButtonModule, MatIconModule, MatSelectModule, FormsModule, ReactiveFormsModule
  ],
  providers: [ TeamService, ResourceService ],
  entryComponents: [ ComponentAddComponent, GroupEditComponent, EmployeeEditComponent ],
  bootstrap: [ TeamComponent ]
})
export class TeamModule {}
