import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormControl, FormGroup } from '@angular/forms';
import { Group } from '@app/model/team';
import { MessageService, Message, MSG_ACTION_REFRESH } from '@service/message.service';
import { ResourceService } from '@service/resource.service';
import { TeamService } from '@service/team.service';

@Component({
  selector: 'app-componentedit',
  templateUrl: './component.component.html',
})
export class ComponentAddComponent implements OnInit {
  componentForm: FormGroup;
  group: Group;
  component: FormControl;
  components: string[];

  constructor(public dialogRef: MatDialogRef<ComponentAddComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private teamService: TeamService,
              private messageService: MessageService,
              private resourceService: ResourceService) { }

  ngOnInit() {
    this.group = this.data['group'];
    this.resourceService.getComponents().subscribe(components => { this.components = components; this.filterComponents(); });
    this.component = new FormControl('');
    this.componentForm = new FormGroup({
      'component': this.component
    });
  }

  private filterComponents(): void {
    this.components = this.components.filter(component => !new Set(this.group.components).has(component));
  }

  onUpdate(form) {
    this.group.components.push(this.componentForm.value.component);
    this.teamService.updateGroup(this.group, this.group.group).subscribe(
      data => {},
      error => console.error(`Error: ${error}`),
      () => this.messageService.sendMessage(new Message(MSG_ACTION_REFRESH, {})));
    this.dialogRef.close();
  }

}
