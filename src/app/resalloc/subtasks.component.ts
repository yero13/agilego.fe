import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/filter';
import { Subtask } from '@app/model/scrum';
import { MSG_ACTION_SELECT_BACKLOG_ITEM, Message, MessageService} from '@service/message.service';

@Component({
  selector: 'app-subtasks',
  templateUrl: './subtasks.component.html'
})
export class SubtasksComponent implements OnDestroy {
  subtasks: Subtask[];
  selectedSubtask: Subtask;
  subscription: Subscription;

  constructor(private messageService: MessageService) {
    this.subscription = this.messageService.getMessage()
      .filter(message => (message.action === MSG_ACTION_SELECT_BACKLOG_ITEM))
      .subscribe(message => { this.subtasks = message.params.subtasks; });

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  selectSubtask(key: string): void {
    this.selectedSubtask = this.subtasks.find(item => item.key === key);
  }
}
