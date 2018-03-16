import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { TeamService} from '@service/team.service';
import { MessageService, MSG_ACTION_REFRESH } from '@service/message.service';
import { Group, Employee } from '@app/model/team';
import { GroupEditComponent } from './popup/group.component';
// import { EmployeeAddComponent } from './popup/employee.component';
import { Subscription } from 'rxjs/Subscription';
import { ComponentAddComponent } from '@app/team/popup/component.component';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html'
})
export class TeamComponent implements OnInit, OnDestroy {
  groups: Group[];
  subscription: Subscription;

  constructor(private messageService: MessageService,
              public dialog: MatDialog,
              private teamService: TeamService) {

    this.subscription = this.messageService.getMessage()
      .filter(message => (message.action === MSG_ACTION_REFRESH))
      .subscribe(message => { this.groups.pop(); });
  }

  getGroups(): void {
    this.teamService.getGroups().subscribe(groups => this.groups = groups,
        error => console.error(`Error: ${error}`));
  }

  ngOnInit(): void {
    this.getGroups();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  addComponent(group): void {
    this.dialog.open(ComponentAddComponent, {height: '250px', width: '250px', data: { 'group': group }});
  }

  editGroup(group): void {
    this.dialog.open(GroupEditComponent, {height: '250px', width: '450px', data: { 'group': group }});
  }

  addGroup(): void {
    this.dialog.open(GroupEditComponent, {height: '250px', width: '450px', data: { 'group': new Group() }});
  }

  removeEmployee(group: Group, employee: Employee): number {
    let res;
    group.employees.splice(group.employees.indexOf(employee), 1);
    this.teamService.updateGroup(group, group.group).subscribe(result => {res = result});
    return res;
  }

  removeComponent(group: Group, component: string): number {
    let res;
    group.components.splice(group.components.indexOf(component), 1);
    this.teamService.updateGroup(group, group.group).subscribe(result => {res = result});
    return res;
  }
}
