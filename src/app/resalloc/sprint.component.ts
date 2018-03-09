import { Component, OnInit } from '@angular/core';
import { Sprint } from '@app/model/scrum';
import { SprintService} from '@service/sprint.service';

@Component({
  selector: 'app-sprint',
  templateUrl: './sprint.component.html'
})
export class SprintComponent implements OnInit {
  sprint: Sprint;

  constructor(private sprintService: SprintService) { }

  getSprint(): void {
    this.sprintService.getSprint().subscribe(sprint => this.sprint = sprint,
        error => console.error(`Error: ${error}`));
  }

  ngOnInit(): void {
    this.getSprint();
  }
}
