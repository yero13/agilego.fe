import { Component, OnInit, OnDestroy } from '@angular/core';
import { TeamService} from '@service/team.service';
import { MessageService, MSG_ACTION_REFRESH } from '@service/message.service';
import { Group, Employee } from '@app/model/team';
// import { GroupEditComponent } from './popup/group.component';
// import { ComponentAddComponent } from './popup/component.component';
// import { EmployeeAddComponent } from './popup/employee.component';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html'
})
export class TeamComponent implements OnInit, OnDestroy {
  groups: Group[];
  subscription: Subscription;

  constructor(private messageService: MessageService,
              private teamService: TeamService) {

    this.subscription = this.messageService.getMessage()
      .filter(message => (message.action === MSG_ACTION_REFRESH))
      .subscribe(message => { this.getGroups(); });

  }

  getGroups(): void {
    this.teamService.getGroups().subscribe(groups => this.groups = groups);
  }

  ngOnInit(): void {
    this.getGroups();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  /*
  createGroup(): void {
    this.modalDataService.setData(this.groups);
    this.bsModalRef = this.modalService.show(GroupEditComponent);
  }

  removeGroup(group): void {
    // ToDo: move to removeGroup on BE
    let assignment = new Assignment();
    assignment.group = group.group;
    // this.planningService.removeAssignment(assignment).then(result => res = result);
    this.planningService.removeGroup(group).then(result => this.getGroups());
    //  this.groups.splice(this.groups.indexOf(group), 1); //ToDo: move to refresh
    //  this.getGroups();
  }

  addComponent(group): void {
    this.modalDataService.setData(group);
    this.bsModalRef = this.modalService.show(ComponentAddComponent);
  }

  addEmployee(group): void {
    this.modalDataService.setData(group);
    this.bsModalRef = this.modalService.show(EmployeeAddComponent);
  }

  removeComponent(group: Group, component: string): number {
    let res;
    group.components.splice(group.components.indexOf(component), 1);
    this.planningService.updateGroup(group).then(result => res = result);
    return res;
  }

  removeEmployee(group: Group, employee: Employee): number {
    let res;
    group.employees.splice(group.employees.indexOf(employee), 1);
    // ToDo: move to updateGroup on BE
    let assignment = new Assignment();
    assignment.group = group.group;
    assignment.employee = employee.name;
    // this.planningService.removeAssignment(assignment).then(result => res = result);
    this.planningService.updateGroup(group).then(result => res = result);
    return res;
  }
  */
}
