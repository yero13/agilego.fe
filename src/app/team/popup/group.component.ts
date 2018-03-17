import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Group } from '@app/model/team';
import { TeamService } from '@service/team.service';
import { MessageService, Message, MSG_ACTION_REFRESH } from '@service/message.service';

@Component({
  selector: 'app-groupedit',
  templateUrl: './group.component.html',
})
export class GroupEditComponent implements OnInit, OnDestroy {
  group: Group;
  is_new_group: boolean;
  is_group_exists: boolean;
  groupForm: FormGroup;
  group_name: FormControl;
  subscription: Subscription;

  constructor(public dialogRef: MatDialogRef<GroupEditComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private messageService: MessageService,
              private teamService: TeamService) { }

  ngOnInit() {
    this.group = this.data['group'];
    this.is_new_group = this.group.group == null;
    this.group_name = new FormControl(this.group.group, [
      Validators.required,
      Validators.maxLength(20)
    ]);

    this.groupForm = new FormGroup({
      'group_name': this.group_name
    });
    this.subscription = this.groupForm.valueChanges.subscribe(data => this.validate(),
      error => console.error(`Error: ${error}`));
  }

  validate() {
    const cur_group_name = this.group_name.value.trim().toUpperCase();
    const prev_group_name = this.group.group;
    if (cur_group_name === prev_group_name) {
      this.is_group_exists = false;
      return;
    }
    this.teamService.getGroups().subscribe(groups => {
      for (const group of groups) {
        if (cur_group_name === group.group && group.group !== prev_group_name) {
          this.is_group_exists = true;
          return;
        }
      }
    }, error => console.error(`Error: ${error}`));
    this.is_group_exists = false;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onUpdate(form) {
    if (this.is_new_group) {
      this.group.group = form.value.group_name.trim();
      this.group.components = new Array();
      this.group.employees = new Array();
      this.group.capacity = 0;
      this.teamService.insertGroup(this.group).subscribe(
        data => {
        },
        error => console.error(`Error: ${error}`),
        () => this.messageService.sendMessage(new Message(MSG_ACTION_REFRESH, {})));
    } else {
      const group_name = this.group.group;
      this.group.group = form.value.group_name.trim();
      this.teamService.updateGroup(this.group, group_name).subscribe(
        data => {
        },
        error => console.error(`Error: ${error}`),
        () => this.messageService.sendMessage(new Message(MSG_ACTION_REFRESH, {})));
    }
    this.dialogRef.close();
  }
}
