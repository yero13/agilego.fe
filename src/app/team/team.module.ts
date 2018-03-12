
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamComponent } from '@app/team/team.component';
import { TeamRoutingModule} from '@app/team/team.routing';
import { TeamService} from '@service/team.service';
// import { FlexLayoutModule } from '@angular/flex-layout';
// import { GroupEditComponent } from './popup/group.component';
// import { ComponentAddComponent } from './popup/component.component';
// import { EmployeeAddComponent } from './popup/employee.component';
// import { FormsModule } from '@angular/forms';
// import { ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    TeamComponent // , GroupEditComponent, ComponentAddComponent, EmployeeAddComponent
  ],
  exports: [ // ToDo: check if smth can be removed
    TeamComponent // , GroupEditComponent, ComponentAddComponent, EmployeeAddComponent, FormsModule, ReactiveFormsModule
  ],
  imports: [
    CommonModule,
    TeamRoutingModule /*,
    FlexLayoutModule,
    FormsModule, ReactiveFormsModule */
  ],
  providers: [ TeamService ],
  entryComponents: [ /*GroupEditComponent, ComponentAddComponent, EmployeeAddComponent*/ ],
  bootstrap: [ TeamComponent ]
})
export class TeamModule {}
