import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { Employee, Group } from '@app/model/staff';
import { Allocation } from '@app/model/scrum';
import { SprintService } from '@service/sprint.service';
import { StaffService } from '@service/staff.service';
import { AllocService } from '@service/alloc.service';
import { MessageService, MSG_ACTION_SELECT_ALLOCATION, Message,
  MSG_PARAM_ALLOCATION, MSG_PARAM_EMPLOYEE } from '@service/message.service';

@Component({
  selector: 'app-allocsheet',
  templateUrl: './allocsheet.component.html'
})
export class AllocSheetComponent implements OnInit {
  private timeline: Date[];
  private groups: Group[];
  private allocations: Allocation[];
  private allocSheet: any[];
  private displayColumns: string[];

  constructor(private sprintService: SprintService,
              private staffService: StaffService,
              private messageService: MessageService,
              private allocService: AllocService) { }

  ngOnInit(): void {
    forkJoin(this.staffService.getGroups(),
      this.sprintService.getSprintTimeline(),
      this.allocService.getAllocations())
      .subscribe(([groups, timeline, allocations]) => {
        this.groups = groups;
        this.timeline = timeline;
        this.allocations = allocations;
        this.fillAllocations(); this.defineColumns(); },
          error => console.error(`Error: ${error}`));
  }

  private defineColumns(): void {
    this.displayColumns = ['group', 'components', 'employee'];
    for (const sp_date of this.timeline) {
      this.displayColumns.push(sp_date.toString());
    }
  }

  private fillAllocations(): void {
    this.allocSheet = new Array<any>();
    for (const group of this.groups) {
      for (const employee of group.employees) {
        const employeeAllocs = new Object();
        employeeAllocs['group'] = group;
        employeeAllocs['employee'] = employee;
        for (const sp_date of this.timeline) {
          employeeAllocs[sp_date.toString()] = this.getAllocsByParams(group.group, employee.name, sp_date);
        }
        this.allocSheet.push(employeeAllocs);
      }
    }
  }

  private getAllocsByParams(group: string, employee: string, date: Date): Allocation[] {
    let result: Allocation[] = [];
    for (const alloc of this.allocations) {
      if (alloc.group === group &&
        alloc.employee === employee &&
        alloc.date === date) {
        result.push(alloc);
      }
    }
    return result;
  }

  onClick(allocation: Allocation, employee: Employee) {
    this.messageService.sendMessage(new Message(MSG_ACTION_SELECT_ALLOCATION,
      {MSG_PARAM_ALLOCATION: allocation, MSG_PARAM_EMPLOYEE: employee}));
  }
}
