import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ErrStateMatcher } from '@app/util/errstate';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Allocation } from '@app/model/scrum';
import { Employee } from '@app/model/team';
import { ValidationResult } from '@app/model/validation';
import { AllocService } from '@service/alloc.service';
import { MessageService, Message, MSG_ACTION_REFRESH } from '@service/message.service';

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
  matcher: ErrStateMatcher;
  subscription: Subscription;

  constructor(public dialogRef: MatDialogRef<AllocEditComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private messageService: MessageService,
              private allocService: AllocService) { }

  ngOnInit() {
    this.allocation = this.data['allocation'];
    this.employee = this.data['employee'];
    this.is_new_allocation = this.allocation.whrs == null;
    this.whrs = new FormControl(this.allocation.whrs, [
      Validators.required,
      Validators.maxLength(4),
      Validators.pattern('^(?!0*(\\.0+)?$)(\\d{1}|\\d{1}\\.\\d{1,2})$')]);
    this.comment = new FormControl(this.allocation.comment, [Validators.maxLength(150)]);

    this.allocForm = new FormGroup({
      'comment': this.comment,
      'whrs': this.whrs
    });

    this.matcher = new ErrStateMatcher();
    this.subscription = this.allocForm.valueChanges.subscribe(data => this.validate(),
        error => console.error(`Error: ${error}`));
    this.validate();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  validate() {
    let allocation = Object.assign({}, this.allocation);
    allocation.whrs = Number(this.allocForm.value.whrs);
    if (!allocation.whrs) {
      allocation.whrs = 0;
    }
    this.allocService.validateAllocation(allocation).subscribe(res => this.validations = res,
      error => console.error(`Error: ${error}`));
  }

  onCompleted(): void {
    this.messageService.sendMessage(new Message(MSG_ACTION_REFRESH, {}));
  }

  onDelete() {
    this.allocService.removeAllocation(this.allocation).subscribe(
      data => {},
      error => console.error(`Error: ${error}`),
      () => this.onCompleted()
      );
    this.dialogRef.close();
  }

  onUpdate(form) {
    this.allocation.comment = form.value.comment;
    this.allocation.whrs = form.value.whrs;
    this.allocService.upsertAllocation(this.allocation).subscribe(
        data => {},
        error => console.error(`Error: ${error}`),
        () => this.onCompleted());
    this.dialogRef.close();
  }
}
