import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ErrorStateMatcher } from '@angular/material/core';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { Allocation } from '@app/model/scrum';
import { Employee } from '@app/model/staff';
import { ValidationResult } from '@app/model/validation';

export class AllocErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-allocedit',
  templateUrl: './allocedit.component.html',
})
export class AllocEditComponent implements OnInit {
  allocation: Allocation;
  employee: Employee;
  validations: ValidationResult[];
  is_new_assignment: boolean;
  allocForm: FormGroup;
  whrs: FormControl;
  comment: FormControl;
  matcher: AllocErrorStateMatcher;

  constructor(public dialogRef: MatDialogRef<AllocEditComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.allocation = this.data['allocation'];
    console.log('>>>' + this.allocation);
    this.employee = this.data['employee'];
    this.is_new_assignment = this.allocation.whrs == null;
    this.whrs = new FormControl(/*this.allocation.whrs*/ '',
      [Validators.required,  Validators.maxLength(4), Validators.pattern('^(?!0*(\\.0+)?$)(\\d{1}|\\d{1}\\.\\d{1,2})$')]);
    this.comment = new FormControl(/*this.allocation.comment*/ '', [Validators.maxLength(150)]);

    this.allocForm = new FormGroup({
      'comment': this.comment,
      'whrs': this.whrs
    });

    this.matcher = new AllocErrorStateMatcher();
  }


}
