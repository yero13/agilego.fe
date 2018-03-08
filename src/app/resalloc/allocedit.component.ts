import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Allocation } from '@app/model/scrum';
import { Employee } from '@app/model/staff';
import { ValidationResult } from '@app/model/validation';
import { AllocService } from '@service/alloc.service';

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
export class AllocEditComponent implements OnInit, OnDestroy {
  allocation: Allocation;
  employee: Employee;
  validations: ValidationResult[];
  is_new_allocation: boolean;
  allocForm: FormGroup;
  whrs: FormControl;
  comment: FormControl;
  matcher: AllocErrorStateMatcher;
  subscription: Subscription;

  constructor(public dialogRef: MatDialogRef<AllocEditComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private allocService: AllocService) { }

  ngOnInit() {
    this.allocation = this.data['allocation'];
    this.employee = this.data['employee'];
    this.is_new_allocation = this.allocation.whrs == null;
    this.whrs = new FormControl(this.allocation.whrs,
      [Validators.required,  Validators.maxLength(4), Validators.pattern('^(?!0*(\\.0+)?$)(\\d{1}|\\d{1}\\.\\d{1,2})$')]);
    this.comment = new FormControl(this.allocation.comment, [Validators.maxLength(150)]);

    this.allocForm = new FormGroup({
      'comment': this.comment,
      'whrs': this.whrs
    });

    this.matcher = new AllocErrorStateMatcher();
    this.subscription = this.allocForm.valueChanges.subscribe(data => this.validate());
    this.validate();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  validate() {
    let allocation = Object.assign({}, this.allocation);
    allocation.whrs = Number(this.allocForm.value.whrs);
    if (!allocation.whrs) {
      allocation.whrs = 0
    }
    this.allocService.validateAllocation(allocation).subscribe(res => this.validations = res);
  }


  onDelete() {
    // this.messageService.sendMessage(new Message(MSG_ACTION_REMOVE_ASSIGNMENT, this.assignment));
    // this.bsModalRef.hide();
  }

  onUpdate(form) {
    this.dialogRef.close();
    // this.assignment.comment = form.value.comment;
    // this.assignment.whrs = form.value.whrs;
    // this.messageService.sendMessage(new Message(MSG_ACTION_UPSERT_ASSIGNMENT, this.assignment));
    // this.bsModalRef.hide();
  }

}
