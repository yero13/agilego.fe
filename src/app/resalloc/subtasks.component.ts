import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/filter';
import { Subtask } from '@app/model/scrum';
import { BacklogService} from '@service/backlog.service';
import { MSG_ACTION_SELECT_BACKLOG_ITEM, Message, MessageService} from '@service/message.service';

@Component({
  selector: 'app-subtasks',
  templateUrl: './subtasks.component.html'
})
export class SubtasksComponent implements OnDestroy {
  subtasks: Subtask[];
  selectedSubtask: Subtask;
  subscription: Subscription;

  constructor(private backlogService: BacklogService,
              private messageService: MessageService) {
    this.subscription = this.messageService.getMessage()
      .filter(message => (message.action === MSG_ACTION_SELECT_BACKLOG_ITEM))
      .subscribe(message => { this.getSubtasks(message.params.key) });

  }

  getSubtasks(key: string): void {
    this.backlogService.getSubtasks(key).subscribe(
      data => this.subtasks = data,
      error => console.error(`Error: ${error}`));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  selectSubtask(key: string): void {
    this.selectedSubtask = this.subtasks.find(item => item.key === key);
    //this.messageService.sendMessage(new Message(MSG_ACTION_SELECT_SUBTASK, this.selectedSubtask));
  }
}
