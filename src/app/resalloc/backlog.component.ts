import { Component, OnInit } from '@angular/core';
import { BacklogItem } from '@app/model/scrum';
import { BacklogService} from '@service/backlog.service';
import { MSG_ACTION_SELECT_BACKLOG_ITEM, Message, MessageService} from '@service/message.service';

@Component({
  selector: 'app-backlog',
  templateUrl: './backlog.component.html'
})
export class BacklogComponent implements OnInit {
  backlog: BacklogItem[];
  selectedItem: BacklogItem;

  constructor(private backlogService: BacklogService,
              private messageService: MessageService) { }

  getBacklog(): void {
    this.backlogService.getBacklog().subscribe(data => this.backlog = data, error => console.error(`Error: ${error}`));
  }

  ngOnInit(): void {
    this.getBacklog();
  }

  selectBacklogItem(key: string): void {
    this.selectedItem = this.backlog.find(item => item.key === key);
    this.messageService.sendMessage(new Message(MSG_ACTION_SELECT_BACKLOG_ITEM, this.selectedItem));
  }
}
