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
  employee: FormControl;
  capacity: FormControl;
  employees: Employee[];

  constructor(public dialogRef: MatDialogRef<EmployeeEditComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private teamService: TeamService,
              private messageService: MessageService,
              private resourceService: ResourceService) { }

  ngOnInit() {
    this.group = this.data['group'];
    this.resourceService.getEmployees().subscribe(employees => {
      this.employees = employees; this.filterEmployees(); });
    this.employee = new FormControl('', [Validators.required]);
    this.capacity = new FormControl('', [Validators.required,
      Validators.maxLength(2),
      Validators.pattern('^\\d{1,2}$')]);
    this.employeeForm = new FormGroup({
      'employee': this.employee,
      'capacity': this.capacity
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
    // this.dialogRef.close();
  }

}
