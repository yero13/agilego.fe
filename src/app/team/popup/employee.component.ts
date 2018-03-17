import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Employee, Group} from '@app/model/team';
import { MessageService, Message, MSG_ACTION_REFRESH } from '@service/message.service';
import { ResourceService } from '@service/resource.service';
import { TeamService } from '@service/team.service';

@Component({
  selector: 'app-employeeedit',
  templateUrl: './employee.component.html',
})
export class EmployeeEditComponent implements OnInit {
  employeeForm: FormGroup;
  group: Group;
  employee: Employee;
  is_new_employee: boolean;
  employeeName: FormControl;
  employeeCapacity: FormControl;
  employees: Employee[];

  constructor(public dialogRef: MatDialogRef<EmployeeEditComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private teamService: TeamService,
              private messageService: MessageService,
              private resourceService: ResourceService) { }

  ngOnInit() {
    this.group = this.data['group'];
    if (this.data['employee']) {
      this.employee = this.data['employee'];
      this.is_new_employee = false;
    } else {
      this.employee = new Employee();
      this.is_new_employee = true;
    }
    this.resourceService.getEmployees().subscribe(employees => {
      this.employees = employees; if (this.is_new_employee) {this.filterEmployees();}});
    this.employeeCapacity = new FormControl('' ? this.is_new_employee : this.employee.capacity,
      [Validators.required, Validators.maxLength(2), Validators.pattern('^\\d{1,2}$')]);
    this.employeeName = new FormControl({value: this.employee.name, disabled: !this.is_new_employee}, Validators.required);
    this.employeeForm = new FormGroup({
      'employeeCapacity': this.employeeCapacity,
      'employeeName': this.employeeName
    });
  }

  private filterEmployees(): void {
    let group_employees:String[] = [];
    for (let employee of this.group.employees) {
      group_employees.push(employee.name);
    }
    this.employees = this.employees.filter(employee => !new Set(group_employees).has(employee.name));
  }

  onUpdate(form) {
    if (this.is_new_employee) {
      for (let employee of this.employees) {
        if (employee.name === this.employeeForm.value.employeeName) {
          employee.capacity = this.employeeForm.value.employeeCapacity;
          this.group.employees.push(employee);
          break;
        }
      }
    } else {
      for (let employee of this.group.employees) {
        if (employee.name === this.employee.name) {
          employee.capacity = this.employeeForm.value.employeeCapacity;
          break;
        }
      }
    }
    this.teamService.updateGroup(this.group, this.group.group).subscribe(
      data => {},
      error => console.error(`Error: ${error}`),
      () => this.messageService.sendMessage(new Message(MSG_ACTION_REFRESH, {})));
    this.dialogRef.close();
  }

}
