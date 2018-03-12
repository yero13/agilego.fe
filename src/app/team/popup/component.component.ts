import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Group } from '@app/model/team';
import { MessageService } from '@service/message.service';
import { ResourceService } from '@service/resource.service';

@Component({
  selector: 'app-componentedit',
  templateUrl: './component.component.html',
})
export class ComponentAddComponent implements OnInit {
  // componentForm: FormGroup;
  group: Group;
  components: string[];


  constructor(public dialogRef: MatDialogRef<ComponentAddComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private messageService: MessageService,
              private resourceService: ResourceService) { }

  ngOnInit() {
    this.group = this.data['group'];
    this.resourceService.getComponents().subscribe(components => { this.components = components; this.filterComponents(); });

    /*
    this.componentForm = new FormGroup({
      'component': new FormControl('',
        [Validators.required])
    });
  */
  }

  private filterComponents(): void {
    this.components = this.components.filter(component => !new Set(this.group.components).has(component));
  }



}
