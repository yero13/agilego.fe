import { Component, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/filter';
import { MatDialog } from '@angular/material';
import { MSG_ACTION_UPSERT_ALLOCATION, MSG_ACTION_REMOVE_ALLOCATION,
  MSG_ACTION_REFRESH, MSG_ACTION_SELECT_ALLOCATION, MSG_PARAM_ALLOCATION, MSG_PARAM_EMPLOYEE,
  MessageService, Message } from '@service/message.service';
import { Employee } from '@app/model/staff';
import { DragulaService } from 'ng2-dragula';
import { Allocation } from '@app/model/scrum';
import { AllocService } from '@service/alloc.service';
import { AllocEditComponent } from '@app/resalloc/allocedit.component';

@Component({
  selector: 'app-resalloc',
  templateUrl: './resalloc.component.html'
})
export class ResAllocComponent implements OnDestroy {
  subscription: Subscription;
  private destroy$ = new Subject();

  constructor(private messageService: MessageService,
              private allocService: AllocService,
              public dialog: MatDialog,
              private dragService: DragulaService) {
    // ToDo: subscribe to SELECT_BACKLOG_ITEM/SUBTASK - highlight corresponding assignments
    this.subscription = this.messageService.getMessage()
      .filter(message => (message.action === MSG_ACTION_UPSERT_ALLOCATION ||
        message.action === MSG_ACTION_REMOVE_ALLOCATION ||
        message.action === MSG_ACTION_SELECT_ALLOCATION))
      .subscribe(message => {
        switch (message.action) {
          case MSG_ACTION_UPSERT_ALLOCATION:
            //this.upsertAssignment(message.params);
            this.messageService.sendMessage(new Message(MSG_ACTION_REFRESH, {}));
            break;
          case MSG_ACTION_REMOVE_ALLOCATION:
            //this.removeAssignment(message.params);
            this.messageService.sendMessage(new Message(MSG_ACTION_REFRESH, {}));
            break;
          case MSG_ACTION_SELECT_ALLOCATION:
            this.showAllocation(message.params.MSG_PARAM_ALLOCATION, message.params.MSG_PARAM_EMPLOYEE);
            break;
        }
      });

    dragService.drop.asObservable().takeUntil(this.destroy$).subscribe((value) => {
      // subscribe((value) => {
      // console.log(`drop: ${value[0]}` + JSON.stringify(value));
      this.onDrop(value.slice(1));
    });

    dragService.setOptions(
      'bag-work', {
        // ToDo: moves - allow to move selected item only
        copy: true,
        removeOnSpill: true,
        moves: function(el, source, handle, sibling) {
          switch (source.id) {
            case 'work-dest': // ToDo: rescheduling of task
              return false;
            case 'backlog':
            case 'subtasks':
              // ToDo: only selected-issue is assignable - implement more reliable solution
              return (el.className.indexOf('selected-item') !== -1);
          }
        },
        accepts: function(el, target, source, sibling) {
          // console.log("accept: " + el.id + ";" + target.id + ";" + source.id)
          switch (target.id) {
            case 'backlog':
            case 'subtasks':
              return false;
            case 'work-dest':
              if (source.id === 'work-dest') {
                return false; // rescheduling of task
              }
              return true;
            default:
              return false;
          }
        }
      });
  }

  onDrop(args) {
    let [el, container, source] = args;
    if (source && container && el) { // workaround - Dragula issue
      const alloc_key = el.getAttribute('key');
      const alloc_parent = (source.id === 'subtasks') ? el.getAttribute('parent') : null;
      const alloc_date = container.getAttribute('date');
      const alloc_group = container.getAttribute('group');
      let employee = new Employee();
      employee.name = container.getAttribute('employee_name');
      employee.displayName = container.getAttribute('employee_displayName');
      // as an option - get assignments via @ViewChild
      this.allocService.getAllocation(alloc_key, alloc_date, alloc_group, employee.name)
        .subscribe(data =>
        { let alloc = this.createAllocation(data, alloc_key, alloc_parent, alloc_date, alloc_group, employee.name);
        this.showAllocation(alloc, employee); } , error => console.error(`Error: ${error}`));
    }
    this.dragService.find('bag-work').drake.cancel(true);
  }

  private createAllocation(allocation: Allocation, alloc_key: string,
                           alloc_parent: string, alloc_date: Date,
                           alloc_group: string, alloc_employee: string): Allocation {
    if ((allocation == null) ||
      (allocation == undefined) ||
      (allocation && (Object.keys(allocation).length === 0))) {
      let res_alloc = new Allocation();
      res_alloc.key = alloc_key;
      res_alloc.parent = alloc_parent;
      res_alloc.date = alloc_date;
      res_alloc.group = alloc_group;
      res_alloc.employee = alloc_employee;
      // console.log(JSON.stringify(res_assignment));
      return res_alloc;
    } else {
      return allocation;
    }
  }

  showAllocation(alloc: Allocation, employee: Employee): void {
     this.dialog.open(AllocEditComponent, {height: '550px', width: '450px', data: { 'allocation': alloc, 'employee': employee }});
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.dragService.destroy('bag-work');
    this.subscription.unsubscribe();
  }


}
