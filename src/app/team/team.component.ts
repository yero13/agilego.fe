import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { TeamService} from '@service/team.service';
import { Message, MessageService, MSG_ACTION_REFRESH } from '@service/message.service';
import { Group, Employee } from '@app/model/team';
import { Subscription } from 'rxjs/Subscription';
import { GroupEditComponent } from '@app/team/popup/group.component';
import { EmployeeEditComponent } from '@app/team/popup/employee.component';
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
      .subscribe(message => { this.getGroups(); });
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

  addComponent(group: Group): void {
    this.dialog.open(ComponentAddComponent, {height: '250px', width: '250px', data: { 'group': group }});
  }

  addEmployee(group: Group): void {
    this.dialog.open(EmployeeEditComponent, {height: '300px', width: '300px', data: { 'group': group }});
  }

  editEmployee(group: Group, employee: Employee): void {
    this.dialog.open(EmployeeEditComponent, {height: '300px', width: '300px', data: { 'group': group, 'employee': employee }});
  }

  editGroup(group: Group): void {
    this.dialog.open(GroupEditComponent, {height: '250px', width: '250px', data: { 'group': group }});
  }

  addGroup(): void {
    this.dialog.open(GroupEditComponent, {height: '250px', width: '250px', data: { 'group': new Group() }});
  }

  removeEmployee(group: Group, employee: Employee): number {
    let res;
    group.employees.splice(group.employees.indexOf(employee), 1);
    this.teamService.updateGroup(group, group.group).subscribe(result => { res = result; },
      error => console.error(`Error: ${error}`),
      () => this.messageService.sendMessage(new Message(MSG_ACTION_REFRESH, {})));
    return res;
  }

  removeComponent(group: Group, component: string): number {
    let res;
    group.components.splice(group.components.indexOf(component), 1);
    this.teamService.updateGroup(group, group.group).subscribe(result => { res = result },
      error => console.error(`Error: ${error}`),
      () => this.messageService.sendMessage(new Message(MSG_ACTION_REFRESH, {})));
    return res;
  }

  removeGroup(group: Group): number {
    let res;
    this.teamService.removeGroup(group).subscribe(
      result => { res = result; },
      error => console.error(`Error: ${error}`),
      () => this.messageService.sendMessage(new Message(MSG_ACTION_REFRESH, {}))
    );
    return res;
  }
}
