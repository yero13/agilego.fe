import { Observable } from 'rxjs/Observable';
import { sprintf } from 'sprintf-js';
import { BacklogItem, Subtask } from '@app/model/scrum';
import { RestClient } from '@service/rest.client';

const SERVICE_BACKLOG = '/backlog';
const SERVICE_BACKLOG_TASK = '/task/%s';
const SERVICE_SUBTASKS = SERVICE_BACKLOG_TASK + '/subtasks';

export class BacklogService extends RestClient {
  public getBacklog(): Observable<BacklogItem[]> {
    return this.http.get<BacklogItem[]>(RestClient.getApiUrl(SERVICE_BACKLOG));
  }

  public getSubtasks(parent: string): Observable<Subtask[]> {
    return this.http.get<Subtask[]>(RestClient.getApiUrl(sprintf(SERVICE_SUBTASKS, parent)));
  }
}
